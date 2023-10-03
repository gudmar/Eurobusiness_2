import { INITIAL_MONEY } from "../../Data/money";
import { iDiceTestModeDecorator, tDiceTestModeDecorator } from "../Dice/types";
import { Player } from "../Player/Player";
import { iAllPlayers, iAllPlayersArgs, iPlayer, iPlayerDescriptor } from "./types";

export class Players implements iAllPlayers {
    private _diceClassInstance: iDiceTestModeDecorator;
    private _players: iPlayer[] = [];
    private _currentPlayerIndex: number = 0;
    private _createPlayer({color, name, strategy}: iPlayerDescriptor) {
        const player = new Player({ name, color, strategy, money: INITIAL_MONEY, DiceClassInstance: this._diceClassInstance })
        return player;
    }
    constructor({DiceClass, playes}: iAllPlayersArgs){
        this._diceClassInstance = new DiceClass();
        playes.forEach((player) => {
            const nextPlayer = this._createPlayer(player);
            this._players.push(nextPlayer);
        })
    }

    get getAllPlayersStates() {
        const result = this._players.map((player) => player.state)
        return result;
    }

    async makeMove(): Promise<boolean> {
        const result = await this._players[this._currentPlayerIndex].move();
        return result;
    }
}
