import { INITIAL_MONEY } from "../../Data/money";
import { tColors } from "../../Data/types";
import { iSubscription } from "../../Types/types";
import { tChanceCardPayload } from "../Commander/types";
import { iDiceTestModeDecorator } from "../Dice/types";
import { Messages } from "../Messages/constants";
import { Player } from "../Player/Player";
import { iPlayerMemento } from "../Player/types";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { iAllPlayers, iAllPlayersArgs,  iPlayer, iPlayerDescriptor, iPlayersMemento, iPlayersSnapshot, iPlayerState, tSwitchPlayer } from "./types";

export class Players extends SubscribtionsHandler<Messages, iPlayer> implements iAllPlayers {
    static _instance: Players;
    
    private _diceClassInstance!: iDiceTestModeDecorator;
    static players: iPlayer[] = [];
    private _currentPlayerIndex: number = 0;
    private _createPlayer({color, name, strategy}: iPlayerDescriptor) {
        const player = new Player({ name, color, strategy, money: INITIAL_MONEY, DiceClassInstance: this._diceClassInstance })
        return player;
    }
    private static get nextPlayerIndex() {
        const nrOfPlayers = Players.players.length;
        const maxPlayerIndex = nrOfPlayers - 1;
        const currentPlayerIndex = Players._instance._currentPlayerIndex;
        const result = currentPlayerIndex + 1 > maxPlayerIndex ? 0 : currentPlayerIndex + 1;
        return result;
    }
    static nextTurn() {
        const nextPlayerIndex = Players.nextPlayerIndex;
        Players._instance._currentPlayerIndex = nextPlayerIndex;
        Players._instance.runAllSubscriptions(Messages.switchPlayer, Players._instance.currentPlayer)
    }
    set currentPlayerColor(playerColor: string) {
        const nextPlayersIndex = Players.players.findIndex((player) =>
            player.color === playerColor
        )
        if (nextPlayersIndex !== -1) Players._instance._currentPlayerIndex = nextPlayersIndex;
    }
    set currentPlayerName(playerName: string) {
        const nextPlayersIndex = Players.players.findIndex((player) =>
            player.name === playerName
        )
        if (nextPlayersIndex !== -1) Players._instance._currentPlayerIndex = nextPlayersIndex;
    }
    get currentPlayerName() {
        return Players.players[Players._instance._currentPlayerIndex].name
    }


    static get instance() {return Players._instance}
    constructor({DiceClass, players}: iAllPlayersArgs){
        super();
        if (Players._instance) {
            if (!Players._instance._diceClassInstance) {
                Players._instance._diceClassInstance = new DiceClass!();
            }
            if (Players.players?.length === 0) {
                players!.forEach((player) => { this._addNewPlayer(player); })
                console.log('Subscribtions fr4om Players constructor')
                Players._instance.runAllSubscriptions( Messages.loadPlayers, {});
                Players._instance.runAllSubscriptions(Messages.switchPlayer, Players._instance.currentPlayer)
            }    
            return Players._instance
        } else {
            Players._instance = this
        }
        if (!this._diceClassInstance) this._diceClassInstance = new DiceClass!();
        if (Players.players?.length === 0) {
            players!.forEach((player) => {  this._addNewPlayer(player) })
            // Players._instance.runAllSubscriptions(Messages.switchPlayer, Players._instance.currentPlayer)
        }
    }
    static deleteAllPlayers () { Players.players = [];}

    subscribeWithInformation(subscription: iSubscription<Messages>): void {
        const { id, messageType} = subscription;
        this.subscribe(subscription);
        const typeToInfoMap = {
            [Messages.switchPlayer]: this.currentPlayer,
            [Messages.playerAddedDeleted]: null,
            [Messages.movePlayer]: null,
            [Messages.loadPlayers]: null,
        }
        const message = typeToInfoMap?.[messageType];
        if (!message) return;
        this.runAllSubscriptions(messageType, message);
    }

    private _addNewPlayer({color, name, strategy}: iPlayerDescriptor) {
        const nextPlayer = this._createPlayer({color, name, strategy});
        Players.players.push(nextPlayer);
        this.runAllSubscriptions( Messages.playerAddedDeleted, Players.players )
        this.runAllSubscriptions(Messages.switchPlayer, Players._instance.currentPlayer)
        console.log('Add new player subscribtions', Players._instance)
    }

    private static _getPlayerByColor(color: tColors) {
        const result = Players.players.find((player) => player.color === color);
        if (!result) throw new Error(`No player with color ${color}`)
        return result; 
    }
    private static _getPlayerByName(name: string) {
        const result = Players.players.find((player) => player.name === name);
        if (!result) throw new Error(`No player named ${name}`)
        return result; 
    }
    static playerColorToPlayerName(color: tColors) {
        const player = Players._getPlayerByColor(color);
        return player.name;
    }
    static playerNameToPlayerColor(name: string) {
        const player = Players._getPlayerByName(name)
        return player.color;
    }

    static getPlayerByName(name: string) { return Players._getPlayerByName(name)}

    static getPlayerByColor(color: tColors) {return Players._getPlayerByColor(color)}
    
    borrowSpecialCard({playerColor, description}: tChanceCardPayload) {
        const player = Players._getPlayerByColor(playerColor);
        const result = player.borrowSpecialCard(description);
        return result;
    }

    returnSpecialCard({playerColor, description}: tChanceCardPayload) {
        const player = Players._getPlayerByColor(playerColor);
        const result = player.returnSpecialCard(description);
        return result;
    }

    get colors() {return Players.players.map((player) => player.color)}

    restoreState(memento: iPlayersMemento) {
        
        const colors = Object.keys(memento);
        colors.forEach((color) => {
            const player = Players._getPlayerByColor(color as tColors);
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

    // async makeMove(): Promise<boolean> {
    //     const result = await this.currentPlayer.move();
    //     return result;
    // }

    get currentPlayer(): iPlayer { return Players.players[this._currentPlayerIndex] }

    get currentPlayerState(): iPlayerState { return this.currentPlayer.state }
}
