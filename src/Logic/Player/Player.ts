import { tColors } from "../../Data/types";
import { iAny, tToBeImplemented } from "../../Types/types";
import { iDiceTestModeDecorator } from "../Dice/types";
import { iPlayerArgs, iPlayerState, iPlayer, iMoveMessage, tPlayerChanged, iAnyChange } from "../Players/types";
import { INITIAL_MONEY } from "../../Data/money";
import { iStrategy, StrategyNames } from "../Strategies/types";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { ANY_CHANGE, MOVE } from "../Messages/constants";
import { getStrategyProvider } from "../Strategies/getStrategyProvider";
import { iPlayerMemento, iPlayerSnapshot } from "./types";
import { YELLOW } from "../../Data/const";

export class Player extends SubscribtionsHandler<tPlayerChanged, iMoveMessage | iAnyChange> implements iPlayer {//, iStateHandler<iPlayerSnapshot, iPlayerMemento> {
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
    private _strategyName: StrategyNames;
    private _nrOfHousesPurchasedInTurn: number;
    private _nrOfHotelsPurchasedInRound: number;

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
        this._strategyName = strategy;
        this._strategy = getStrategyProvider(strategy);
        this._nrOfHousesPurchasedInTurn = 0;
        this._nrOfHotelsPurchasedInRound = 0;

        this._initialState = this.getSnapshot()
        // this.runAllSubscriptions(ANY_CHANGE, {...this.getSnapshot()})
        this._informAnyChange();
    }

    private _informAnyChange() { 
        this.runAllSubscriptions(ANY_CHANGE, {...this.getSnapshot()}) 
    }

    set name(val: string) { this._name = val; this._informAnyChange(); }
    set money(val: number) { this._money = val; this._informAnyChange(); }
    // set specialCards(val: []) { this._specialCards = val; this._informAnyChange(); }
    // instead: addSpecialCard, deleteSpecialCard
    set fieldNr(val: number) { this._fieldNr = val; this._informAnyChange(); }
    set isInPrison(val: boolean) { this._isInPrison = val; this._informAnyChange(); }
    // this is a part of more complicated transaction
    set nrTurnsToWait(val: number) { this._nrTurnsToWait = val; this._informAnyChange(); }
    set isGameLost(val: boolean) { this._isGameLost = val; this._informAnyChange(); }
    set strategy(val: StrategyNames) {this._strategyName = val; this._strategy = getStrategyProvider(val)}
    get strategy() {return this._strategyName}
    
    // set strategy(val: string) { this._name = val; this._informAnyChange(); }

    borrowSpecialCard(description: string) {
        try {
            this._specialCards.push(description);
            this._informAnyChange();    
            return true;
        } catch (e) {
            return false;
        }
    }
    
    returnSpecialCard(description: string) {
        try {
            const cardIndex = this._specialCards.findIndex((cardDescription:string) => description === cardDescription);
            if (cardIndex < 0) throw new Error(`I don't have a card with description [${description}]`);
            this._specialCards.splice(cardIndex, 1);
            this._informAnyChange();    
            return true;
        } catch (e) {
            console.error('Unable to return a card: ', this._specialCards, description)
            return false;
        }
    }

    static get initialState() {
        return {
            name: 'John Doe',
            money: 0,
            specialCards: [],
            color: YELLOW,
            fieldNr: 0,
            isInPrison: false,
            nrTurnsToWait: 0,
            isGameLost: false,
            strategy: StrategyNames.manual
        }
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
            strategy: this._strategyName,
            nrOfHotelsPurchasedInRound: this._nrOfHotelsPurchasedInRound,
        })
    }

    // getMemento() {
    //     return {...this.getSnapshot()};
    // }

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
            nrOfHotelsPurchasedInRound: (val: number) => this._nrOfHotelsPurchasedInRound = val ?? 0,
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
            strategy: this._strategyName,
            nrOfHousesPurchasedInTurn: this._nrOfHousesPurchasedInTurn,
            nrOfHotelsPurchasedInRound: this._nrOfHotelsPurchasedInRound,
        }
    }
    set state(val) {
        this._name = val.name;
        this._money = val.money;
        this._specialCards = val.specialCards;
        this._color = val.color;
        this._fieldNr = val.fieldNr;
        this._isInPrison = val.isInPrison;
        this._nrTurnsToWait = val.nrTurnsToWait;
        this._isGameLost = val.isGameLost;
        this._strategyName = val.strategy;
        this._informAnyChange();
        this._nrOfHousesPurchasedInTurn = val.nrOfHousesPurchasedInTurn || 0,
        this._nrOfHotelsPurchasedInRound = val.nrOfHotelsPurchasedInRound || 0;
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
    // async move():Promise<boolean> {
    //     const {sum: nrOfFields, doublets} = this._diceInstance.throwToMove(this._fieldNr);
    //     if (doublets > 1) {
    //         console.error('Implement go to jail here')
    //     }
    //     const result = await this.movePawn(nrOfFields);
    //     return result;
    // }

    // private async movePawn(nrOfFields: number) {
    //     const {resolve, promise} = this.getDoneFunction();
    //     this.runAllSubscriptions(MOVE, {nrOfFields, done: resolve!});
    //     await promise;
    //     return Promise.resolve(true);
    // }

}