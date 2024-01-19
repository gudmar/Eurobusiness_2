import { BOARD_SIZE, GO_TO_JAIL } from "../../Data/const";
import { ANY_CHANGE, CHANGE_FIELDS_TO_VISIT, CHANGE_NR_THAT_DICE_WILL_THROW, CHANGE_TEST_MODE } from "../Messages/constants";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { CHANCE_FIELDS, CITY_FIELDS, NONE, PLANTS, RAILWAYS, TAX_FIELD } from "./const";
import { iDice, iDiceTestModeDecorator, iJailTestOutcome, iThrowResult, iThrowResultRecursive, TestModes } from "./types";

// DICE USES BOARD INDEX, NOT FROM 0 BuT FROM 1

const FIELD_INDEXES_FOR_TESTING = {
    [NONE]: [],
    [CHANCE_FIELDS]: [3, 8, 18, 23, 34, 37],
    [CITY_FIELDS]: [2,4, 7 , 8, 9,  10, 12, 14, 15, 17, 19, 20, 22, 24, 25, 27, 28, 30, 32, 33, 35, 36, 38, 40],
    [RAILWAYS]: [6, 16 ,26, 36],
    [PLANTS]: [13, 29],
    [GO_TO_JAIL]: [31],
    [TAX_FIELD]: [39],
}


export const getRandomGenerator = (min:number, max:number) => ():number => {
    const result = Math.floor(Math.random() * (max- min)) + min
    return result
}

export class Dice implements iDice {
    private _generate = getRandomGenerator(1, 6);
    private _throw(){
        return this._generate();
    }
    private _getTwoThrows() {
        return [ this._throw(), this._throw()]
    }

    getThrowForGetOutOfPrisonResult(): iJailTestOutcome {
        const throws = this._getTwoThrows();
        const isDoublet  = throws[0] === throws[1];
        const result = { throws, result: isDoublet };
        return result;
    }

    private _getSingleThrowResultForMove(args: iThrowResultRecursive): iThrowResultRecursive {
        const {throws, doublets, sum, iteration} = args;
        if (iteration >= 2) return args;
        const throwings = this._getTwoThrows();
        const isDublet = throwings[0] === throwings[1];
        const outcome = {
            throws: [...throws, throwings],
            doublets: isDublet ? doublets + 1 : doublets,
            sum: sum + throwings[0] + throwings[1],
            iteration: iteration + 1,
        }
        return outcome;
    }

    private _getThrowToMove(): iThrowResult {
        const {throws, doublets, sum} = this._getSingleThrowResultForMove({ throws: [], doublets: 0, sum: 0, iteration: 0 })
        return {throws, doublets, sum}
    }

    throwToMove(): iThrowResult{
        const result = this._getThrowToMove()
        return result;
    }

    throwToPay():number{
        const [result] = this._getTwoThrows();
        return result;
    }
}

type tDiceTestModeDecoratorInstance = DiceTestModeDecorator | null;

const DICE_RESULT = 'diceResult';
const FIELDS_TO_VISIT = 'fieldsToVisit';
export type tTestDiceChanged = typeof DICE_RESULT | typeof FIELDS_TO_VISIT | typeof ANY_CHANGE | typeof CHANGE_FIELDS_TO_VISIT | typeof CHANGE_TEST_MODE | typeof CHANGE_NR_THAT_DICE_WILL_THROW;
type tTestiDiceMessage = number | string[] | string;

export class DiceTestModeDecorator extends SubscribtionsHandler<tTestDiceChanged, tTestiDiceMessage> implements iDiceTestModeDecorator {
    private _testingMode: TestModes = TestModes.none;
    private _dice = new Dice();
    private static _instance: tDiceTestModeDecoratorInstance = null;
    private _fieldsToVisit: number[] = [];

    set fieldsToVisit(fields: string[]) {
        const result: number[] = fields.map((val:string) => {
            const nr = parseInt(val);
            if (isNaN(nr)) throw new Error(`Not able to covert ${val} to number`);
            return nr;            
        })
        this._fieldsToVisit = result
        this.runAllSubscriptions(CHANGE_FIELDS_TO_VISIT, this._fieldsToVisit.map(i=>`${i}`))
    }
    get fieldsToVisit() {
        const result = this._fieldsToVisit.map(val=>`${val}`)
        return result
    }

    private _getMappingInTestMode(testModeType: TestModes) {
        switch(testModeType){
            case TestModes.chanceFields: return FIELD_INDEXES_FOR_TESTING[CHANCE_FIELDS];
            case TestModes.cityFields:   return FIELD_INDEXES_FOR_TESTING[CITY_FIELDS];
            case TestModes.plants:       return FIELD_INDEXES_FOR_TESTING[PLANTS];
            case TestModes.railways:     return FIELD_INDEXES_FOR_TESTING[RAILWAYS];
            case TestModes.goToJailField: return FIELD_INDEXES_FOR_TESTING[GO_TO_JAIL];
            case TestModes.taxField:     return FIELD_INDEXES_FOR_TESTING[TAX_FIELD];
            default: throw new Error(`${testModeType} test mode type is not defined`)
        }
    }

    private _nrThatDiceWillSelectInTestMode: number = 4;

    set nrThatDiceWillSelectInTestMode(nr: number) {
        if (nr < 1) this._nrThatDiceWillSelectInTestMode = 1;
        else if (nr > 6) this._nrThatDiceWillSelectInTestMode = 6;
        else this._nrThatDiceWillSelectInTestMode = nr;
        this.runAllSubscriptions(CHANGE_NR_THAT_DICE_WILL_THROW, this._nrThatDiceWillSelectInTestMode)
    }

    get nrThatDiceWillSelectInTestMode() {return this._nrThatDiceWillSelectInTestMode}

    logState() {
        const toLog = {
            testMode: this._testingMode,
            fieldsToVisit: this._fieldsToVisit,
            nrToAppearOnDice: this._nrThatDiceWillSelectInTestMode,
        }
        console.log(toLog);
    }

    constructor() {
        super();
        if (!DiceTestModeDecorator._instance) {
            DiceTestModeDecorator._instance = this;
        }
        return DiceTestModeDecorator._instance;
    }

    // getThrowForGetOutOfPrisonResult(): iJailTestOutcome {
    //     if (this._testingMode === TestModes.getGetAwayFromJailPass) {
    //         return iJailTestOutcome.pass
    //     } else if (this._testingMode === TestModes.getGetAwayFromJailFail) {
    //         return iJailTestOutcome.fail
    //     }
    //     return this._dice.getThrowForGetOutOfPrisonResult();
    // }
    set testingMode (nextValue: TestModes) { 
        this._testingMode = nextValue
        this.runAllSubscriptions(CHANGE_TEST_MODE, nextValue)
    }
    get testingMode () { return this._testingMode}

    private _findNextFieldNumberToVisitInTestMode(currentPlayerPosition: number, listOfFieldNumbers: number[]){
        const orderedIndexes = listOfFieldNumbers.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });
        const indexOfNextFieldNumber = orderedIndexes.findIndex((boardFieldNumber) => boardFieldNumber > currentPlayerPosition)
        const result = indexOfNextFieldNumber === -1 ? listOfFieldNumbers[0] : listOfFieldNumbers[indexOfNextFieldNumber];
        return result;
    }

    private _getDeltaMove(currentPlayerPosition: number, plannedPlayerPosition: number) {
        if (plannedPlayerPosition > currentPlayerPosition) {
            return plannedPlayerPosition - currentPlayerPosition;
        } else {
            const distanceFromBoardEnd = BOARD_SIZE - currentPlayerPosition;
            return distanceFromBoardEnd + plannedPlayerPosition;
        }
    }

    private _calculateThrowResultInTestMode(currentPlayerPosition: number, listOfFieldNumbers: number[]){
        const plannedPosition = this._findNextFieldNumberToVisitInTestMode(currentPlayerPosition, listOfFieldNumbers);
        const throwResult = this._getDeltaMove(currentPlayerPosition, plannedPosition);
        return throwResult;
    }

    throwToMove(currentPlayerPosition: number): iThrowResult{
        // Calculate exact nr of fields player should move to reach desired destiny
        if (this._testingMode === TestModes.none) {
            return this._dice.throwToMove();
        } else {
            const throwResult = this._calculateThrowResultInTestMode(
                currentPlayerPosition,
                this._getMappingInTestMode(this._testingMode)
            )
            return {
                // result: throwResult,
                throws: [[3, 3]],
                doublets: 0,
                sum: throwResult // CORRECT THIS FUNCTION
            }
        }
    }

    throwToPay(){
        return this._dice.throwToPay()
    }
    
    // shouldPlayerLeaveJail(): iJailTestOutcome {
    //     switch(this._testingMode){
    //         case TestModes.getGetAwayFromJailPass: return (iJailTestOutcome.pass);
    //         case TestModes.getGetAwayFromJailFail: return (iJailTestOutcome.fail);
    //         default: return this._dice.getThrowForGetOutOfPrisonResult();
    //     }
    // }
    shouldPlayerLeaveJail(): iJailTestOutcome {
        return {
            throws: [1,1], result: true
        }
    }
}
