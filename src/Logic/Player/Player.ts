import { tColors } from "../../Data/types";
import { iAny, tToBeImplemented } from "../../Types/types";
import { iDiceTestModeDecorator } from "../Dice/types";
import { iPlayerArgs, iPlayerState, iPlayer, iMoveMessage, tMove, iEditableState } from "../Players/types";
import { INITIAL_MONEY } from "../../Data/money";
import { iStrategy } from "../Strategies/types";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { MOVE } from "../Messages/constants";
import { getStrategyProvider } from "../Strategies/getStrategyProvider";
import { iStateHandler } from "../types";
import { iPlayerMemento, iPlayerSnapshot } from "./types";

export class Player extends SubscribtionsHandler<tMove, iMoveMessage> implements iPlayer, iStateHandler<iPlayerSnapshot, iPlayerMemento> {
    private _diceInstance: iDiceTestModeDecorator;
    private _name: string;
    private _money: number;
    private _specialCards: tToBeImplemented;
    private _color: tColors;
    private _fieldNr: number; // indexed from 1
    private _isInPrison: boolean;
    private _nrTurnsToWait: number;
    private _isGameLost: boolean;
    private _strategy: iStrategy;

    private _initialState: iPlayerState;
    constructor({
        name, money = INITIAL_MONEY, color, strategy, DiceClassInstance
    }: iPlayerArgs){
        super();
        this._diceInstance = DiceClassInstance;
        this._name = name;
        this._money = money;
        this._specialCards = [];
        this._color = color;
        this._fieldNr = 0;
        this._isInPrison = false;
        this._nrTurnsToWait = 0;
        this._isGameLost = false;
        this._strategy = getStrategyProvider(strategy);

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

    getMemento() {
        return {...this.getSnapshot()};
    }

    restoreState(newState: iPlayerMemento) {
        const setters: iAny = {
            name: (val: string) => this._name = val,
            money: (val: number) => this._money = val,
            specialCards: (val: []) => this._specialCards = val,
            color: (val: tColors) => { /*throw new Error ('PlayerVisitor: color may not be set');*/ },
            fieldNr: (val: number) => {
                if (val < 1 || val > 40) throw new Error('Field number shoud be 1..40')
                this._fieldNr = val;
            },
            isInPrison: (val: boolean) => this._isInPrison = val,
            nrTurnsToWait: (val: number) => {
                if (val < 0 || val > 2) throw new Error('Player cannot wait longer then 2 tunrs and shorter then 0')
                this._nrTurnsToWait = val;
            },
            isGameLost: (val: boolean) => this._isGameLost = true,
            strategy: (val: iStrategy) => this._strategy = val,
        }
        const stateEntries = Object.entries(newState);
        stateEntries.forEach(([key, value]) => { setters[key](value) })
    }

    get name() { return this._name}
    get money() {return this._money}
    get specialCards() {return this._specialCards}
    get color() {return this._color}
    get fieldNr() {return this._fieldNr}
    get isInPrison() {return this._isInPrison}
    get nrTurnsToWait() {return this._nrTurnsToWait}
    get isGameLost() {return this._isGameLost}
    get state() {
        return {
            name: this._name,
            money: this._money,
            specialCards: this._specialCards,
            color: this._color,
            fieldNr: this._fieldNr,
            isInPrison: this._isInPrison,
            nrTurnsToWait: this._nrTurnsToWait,
            isGameLost: this._isGameLost,
        }
    }
    getDoneFunction() {
        let outsideResolve;
        let outsideReject;
        const promiseToAwait = new Promise((res, rej) => {
            outsideResolve = () => res(true);
            outsideReject = () => rej(false);
        })
        return {
            resolve: outsideResolve,
            reject: outsideReject,
            promise: promiseToAwait,
        }
    }
    async move():Promise<boolean> {
        const {result: nrOfFields, doublets} = this._diceInstance.throwToMove(this._fieldNr);
        if (doublets > 1) {
            console.error('Implement go to jail here')
        }
        const result = await this.movePawn(nrOfFields);
        return result;
    }

    private async movePawn(nrOfFields: number) {
        const {resolve, promise} = this.getDoneFunction();
        this.runAllSubscriptions(MOVE, {nrOfFields, done: resolve!});
        await promise;
        return Promise.resolve(true);
    }

}