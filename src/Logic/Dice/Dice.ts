import { GO_TO_JAIL } from "../../Data/const";
import { CHANCE_FIELDS, CITY_FIELDS, NONE, PLANTS, RAILWAYS, TAX_FIELD } from "./const";
import { iJailTestOutcome, iThrowResult, TestModes } from "./types";

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

// NO TEST MODE IN DICE CLASS !!

const getRandomGenerator = (min:number, max:number) => ():number => {
    const result = Math.floor(Math.random() * max) + min
    return result
}

export class Dice {
    private _generate = getRandomGenerator(0, 6);
    private _throw(){
        return this._generate();
    }
    private _getTwoThrows() {
        return [ this._throw(), this._throw()]
    }

    getThrowForGetOutOfPrisonResult(): iJailTestOutcome {
        const [ firstThrowResult, secondThrowResult ] = this._getTwoThrows();
        if (firstThrowResult === 12 && secondThrowResult === 12) {
            return iJailTestOutcome.pass
        } else {
            return iJailTestOutcome.fail
        }
    }
    private _getSingleThrowResultForMove() {
        const [ firstThrowResult, secondThrowResult ] = this._getTwoThrows();
        const isDublet = firstThrowResult === secondThrowResult;
        if (!isDublet) {
            return {result: firstThrowResult, doublets: 0}
        } else {
            return {result: firstThrowResult + secondThrowResult, doublets: 1}
        }
    }
    throwToMove(){
        const firstThrowResult = this._getSingleThrowResultForMove();
        if ( firstThrowResult.doublets === 0) return firstThrowResult;
        const secondThrowResult = this._getSingleThrowResultForMove();
        return {
            result: firstThrowResult.result + secondThrowResult.result,
            doublets: firstThrowResult.doublets + secondThrowResult.doublets,
        }
    }
    throwToPay(){
        const [result, _] = this._getTwoThrows();
        return result;
    }
}


// Class below has a good function, but this logic should not be here, no class for 
// outcome interpretation,
// Test mode NOT HERE
export class DiceOutcomeProvider {
    private testingMode: TestModes = TestModes.none;
    private _dice = new Dice();
    
    shouldPlayerLeaveJail(): iJailTestOutcome {
        switch(this.testingMode){
            case TestModes.getGetAwayFromJailPass: return (iJailTestOutcome.pass);
            case TestModes.getGetAwayFromJailFail: return (iJailTestOutcome.fail);
            default: return this._dice.getThrowForGetOutOfPrisonResult();
        }
    }
}
