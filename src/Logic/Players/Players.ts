import { INITIAL_MONEY } from "../../Data/money";
import { tColors } from "../../Data/types";
import { iDiceTestModeDecorator } from "../Dice/types";
import { Player } from "../Player/Player";
import { iPlayerMemento } from "../Player/types";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { iStateHandler } from "../types";
import { iAllPlayers, iAllPlayersArgs,  iPlayer, iPlayerDescriptor, iPlayersMemento, iPlayersSnapshot, iPlayerState, tSwitchPlayer } from "./types";

export class Players extends SubscribtionsHandler<tSwitchPlayer, iPlayer> implements iAllPlayers, iStateHandler<iPlayersSnapshot, iPlayersMemento> {
    private static _instance: Players;
    private _diceClassInstance!: iDiceTestModeDecorator;
    private _players: iPlayer[] = [];
    private _currentPlayerIndex: number = 0;
    private _createPlayer({color, name, strategy}: iPlayerDescriptor) {
        const player = new Player({ name, color, strategy, money: INITIAL_MONEY, DiceClassInstance: this._diceClassInstance })
        return player;
    }
    constructor({DiceClass, players}: iAllPlayersArgs){
        super();
        if (Players._instance) {
            return Players._instance
        } else {
            this._diceClassInstance = new DiceClass!();
            players!.forEach((player) => {
                const nextPlayer = this._createPlayer(player);
                this._players.push(nextPlayer);
            Players._instance = this
        })
        }
    }

    getMemento(): iPlayersSnapshot {
        const snapshots = this._players.reduce((acc: any, player: iPlayer) => {
            const color = player.color;
            acc[color] = player.getMemento();
            return acc;
        },{})
        return snapshots;
    };
    private _getPlayerByColor(color: tColors) {
        const result = this._players.find((player) => player.color === color);
        if (!result) throw new Error(`No player with color ${color}`)
        return result;
    }
    restoreState(memento: iPlayersMemento) {
        const colors = Object.keys(memento);
        colors.forEach((color) => {
            const player = this._getPlayerByColor(color as tColors);
            player.restoreState(memento[color as tColors] as iPlayerMemento)
        })
    }

    getPlayerFieldIndex(color: tColors) {
        const player = this._players.find((player) => player.color === color)
        if (player === undefined) { throw new Error(`Players/getPlayerFieldIndex: color ${color} not found`)}
        const index = player?.fieldNr;
        return index;
    }

    get allPlayersStates() {
        const result = this._players.map((player) => player.state)
        return result;
    }

    async makeMove(): Promise<boolean> {
        const result = await this.currentPlayer.move();
        return result;
    }

    get currentPlayer(): iPlayer { return this._players[this._currentPlayerIndex] }

    get currentPlayerState(): iPlayerState { return this.currentPlayer.state }
}
