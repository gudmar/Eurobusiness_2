import { TestModes } from "../../Logic/Dice/types";

export interface iEditGeneralSettingsState {
    nrToBeSelectedForDicesThrow: number,
    testMode: TestModes.none,
    setNrToBeSelectedForDicesThrow: (val: number) => void,
    setTestMode: (val: TestModes) => void,
    possibleTestModes: typeof TestModes,
    selectedFields: string[],
}

export type tEditGeneralSettingPayload = number | string | boolean | TestModes;

export type tUseGeneralSettingsForTests = {
    nrToBeSelectedForDicesThrow: number,
    testMode: TestModes,
    setNrToBeSelectedForDicesThrow: (val: number) => void,
    setTestMode: (val: TestModes) => void,
    addFieldToVisit: (field: string) => void,
    removeFieldToVisit: (field: string) => void,
    possibleTestModes: TestModes[],
    selectedFields: string[],
    log: ()=>void,
}

export enum EditGeneralSettingsForTestsTypes {
    setDiceNumber = 'set dice number',
    setOneOfNumbers = 'set new number to numbers to visit',
    setFieldsToVisit = 'set fields to visit',
    setTestMode = 'set test mode',
    removeOneOfNumbers = 'remove one of numbers from numbers to visit'
}
