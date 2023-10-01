import { iDiceTestModeDecorator, tDiceTestModeDecorator } from "../Dice/types";
import { iAllPlayersArgs } from "./types";

class Players {
    private _diceClassInstance: iDiceTestModeDecorator;
    private _players: any;
    constructor({DiceClass, playes}: iAllPlayersArgs){
        this._diceClassInstance = new DiceClass();
    }
}