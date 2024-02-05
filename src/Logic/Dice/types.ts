import { tClassFromInterface } from "../../Types/types"

export enum TestModes {
    none = 'none',
    chanceFields = 'chanceFields',
    cityFields = 'cityFields',
    plants = 'plants',
    railways = 'railways',
    goToJailField = 'goToJailField',
    dubletTwice = 'dubletTwice',
    taxField = 'taxField',
    getGetAwayFromJailPass = 'getAwayFromJailPass',
    getGetAwayFromJailFail = 'getAwayFromJailFail',
    constantNumber = 'constantNumber',
    visitFieldsFromList = 'visitFieldsFromList'
}

export interface iThrowResult {
    throws: number[][],
    sum: number,
    doublets: number,
}

export interface iThrowResultRecursive extends iThrowResult {
    iteration: number,
}

// export enum iJailTestOutcome {
//     pass = 'pass', fail = 'fail'
// }

export interface iJailTestOutcome {
    throws: number[],
    result: boolean,
}

export interface iDice {
    getThrowForGetOutOfPrisonResult(): iJailTestOutcome
    throwToMove(): iThrowResult,
    throwToPay(): number,
}

export interface iDiceTestModeDecorator {
    testingMode: TestModes,
    throwToMove(currentPlayerPosition: number): iThrowResult,
    throwToPay(): number,
    shouldPlayerLeaveJail(): iJailTestOutcome
}

export type tDiceTestModeDecorator = tClassFromInterface<null, iDiceTestModeDecorator>
export type tDiceTestModeDecoratorInstance = iDiceTestModeDecorator;

export type tDiceState = {
    testingMode: TestModes,
    fieldsToVisit: number[],
    indexOnNextFieldToVisit: number,
    nrThatDiceWillSelectInTestMode: number,
}
