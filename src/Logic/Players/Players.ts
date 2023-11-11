import { INITIAL_MONEY } from "../../Data/money";
import { tColors } from "../../Data/types";
import { iDiceTestModeDecorator } from "../Dice/types";
import { Messages } from "../Messages/constants";
import { Player } from "../Player/Player";
import { iPlayerMemento } from "../Player/types";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { iStateHandler } from "../types";
import { iAllPlayers, iAllPlayersArgs,  iPlayer, iPlayerDescriptor, iPlayersMemento, iPlayersSnapshot, iPlayerState, tSwitchPlayer } from "./types";

export class Players extends SubscribtionsHandler<Messages, iPlayer> implements iAllPlayers, iStateHandler<iPlayersSnapshot, iPlayersMemento> {
    private static _instance: Players;
    private _diceClassInstance!: iDiceTestModeDecorator;
    static players: iPlayer[] = [];
    private _currentPlayerIndex: number = 0;
    private _createPlayer({color, name, strategy}: iPlayerDescriptor) {
        const player = new Player({ name, color, strategy, money: INITIAL_MONEY, DiceClassInstance: this._diceClassInstance })
        return player;
    }
    static get instance() {return Players._instance}
    constructor({DiceClass, players}: iAllPlayersArgs){
        super();
        if (Players._instance) {
            return Players._instance
        } else {
            this._diceClassInstance = new DiceClass!();
            players!.forEach((player) => {
                this._addNewPlayer(player);
            Players._instance = this
        })
        }
    }

    private _addNewPlayer({color, name, strategy}: iPlayerDescriptor) {
        const nextPlayer = this._createPlayer({color, name, strategy});
        Players.players.push(nextPlayer);
        this.runAllSubscriptions( Messages.playerAddedDeleted, Players.players )
    }

    getMemento(): iPlayersSnapshot {
        const snapshots = Players.players.reduce((acc: any, player: iPlayer) => {
            const color = player.color;
            acc[color] = player.getMemento();
            return acc;
        },{})
        return snapshots;
    };
    private _getPlayerByColor(color: tColors) {
        const result = Players.players.find((player) => player.color === color);
        if (!result) throw new Error(`No player with color ${color}`)
        return result; 
    }
    getPlayerByColor(color: tColors) {return this._getPlayerByColor(color)}

    get colors() {return Players.players.map((player) => player.color)}

    restoreState(memento: iPlayersMemento) {
        
        const colors = Object.keys(memento);
        colors.forEach((color) => {
            const player = this._getPlayerByColor(color as tColors);
            player.restoreState(memento[color as tColors] as iPlayerMemento)
        })
        throw new Error(`This needs:
            1) Removing players that are not in new memento
            2) Adding players that are not in old state
            3) Modifying states of players that already exist
            The best way is to delete players and recreate them
            THis has to be done because of loading from a file
        `)
    }

    getPlayerFieldIndex(color: tColors) {
        const player = Players.players.find((player) => player.color === color)
        if (player === undefined) { throw new Error(`Players/getPlayerFieldIndex: color ${color} not found`)}
        const index = player?.fieldNr;
        return index;
    }

    get allPlayersStates() {
        const result = Players.players.map((player) => player.state)
        return result;
    }

    async makeMove(): Promise<boolean> {
        const result = await this.currentPlayer.move();
        return result;
    }

    get currentPlayer(): iPlayer { return Players.players[this._currentPlayerIndex] }

    get currentPlayerState(): iPlayerState { return this.currentPlayer.state }
}
