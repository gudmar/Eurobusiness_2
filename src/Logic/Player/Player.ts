import { tColors } from "../../Data/types";
import { tToBeImplemented } from "../../Types/types";
import { iDiceTestModeDecorator, tDiceTestModeDecorator } from "../Dice/types";
import { iPlayerArgs, iPlayerState } from "../Players/types";

class Player {
    private _diceInstance: iDiceTestModeDecorator;
    private _name: string;
    private _money: number;
    private _specialCards: tToBeImplemented;
    private _color: tColors;
    private _fieldNr: number; // indexed from 1
    private _isInPrison: boolean;
    private _nrTurnsToWait: number;
    private _isGameLost: boolean;
    private _strategy: tToBeImplemented;

    private _initialState: iPlayerState;
    constructor({
        name, money, color, strategy, DiceClassInstance
    }: iPlayerArgs){
        this._diceInstance = DiceClassInstance;
        this._name = name;
        this._money = money;
        this._specialCards = [];
        this._color = color;
        this._fieldNr = 0;
        this._isInPrison = false;
        this._nrTurnsToWait = 0;
        this._isGameLost = false;
        this._strategy = null;

        this._initialState = this.getSnapshot()
    }

    private getSnapshot() {
        return ({
            name: this._name,
            money: this._money,
            specialCards: this._specialCards,
            color: this._color,
            fieldNr: this._fieldNr,
            isInPrison: this._isInPrison,
            nrTurnsToWait: this._nrTurnsToWait,
            isGameLost: this._isGameLost,
            strategy: this._strategy,
        })
    }
}