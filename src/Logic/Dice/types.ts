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

    constantNumber = 'constantNumber'
}

export interface iThrowResult {
    result: number,
    doublets: number,
}

export enum iJailTestOutcome {
    pass = 'pass', fail = 'fail'
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
