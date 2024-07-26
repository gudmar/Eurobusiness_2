import { useEffect, useReducer } from "react"
import { NR_OF_HOTELS, NR_OF_HOUSES } from "../../Constants/constants"
import { getReducer } from "../../Functions/reducer"
import { Bank } from "../../Logic/Bank/Bank"
import { Commander } from "../../Logic/Commander/Commander"
import { DiceTestModeDecorator } from "../../Logic/Dice/Dice"
import { TestModes } from "../../Logic/Dice/types"
import { CHANGE_FIELDS_TO_VISIT, CHANGE_NR_HOTELS, CHANGE_NR_HOUSES, CHANGE_NR_THAT_DICE_WILL_THROW, CHANGE_TEST_MODE } from "../../Logic/Messages/constants"
import { Players } from "../../Logic/Players/Players"
import { tSubscription } from "../../Types/types"
import { EditGeneralSettingsForTestsTypes, iEditGeneralSettingsState, tEditGeneralSettingPayload, tUseGeneralSettingsForTests } from "./types"


const initState: iEditGeneralSettingsState = {
    nrToBeSelectedForDicesThrow: 1,
    testMode: TestModes.none,
    setNrToBeSelectedForDicesThrow: (val: number) => {},
    setTestMode: (val: TestModes) => {},
    possibleTestModes: TestModes,
    selectedFields: [],
    nrOfHousesInBank: 0,
}

const setNrToBeSelectedForDicesThrow = (state: iEditGeneralSettingsState, payload: tEditGeneralSettingPayload)  => {
    const newState = {...state, nrToBeSelectedForDicesThrow: payload};
    return newState;
}

const setTestMode = (state: iEditGeneralSettingsState, payload: tEditGeneralSettingPayload) => {
    const newState = {...state, testMode: payload};
    return newState;
}
const addField = (state: iEditGeneralSettingsState, payload: string) => {
    const newState = {...state, selectedFields: [...state.selectedFields, payload]};
    return newState;
}
const removeField = (state: iEditGeneralSettingsState, payload: string) => {
    const fieldToRemoveIndex = state.selectedFields.findIndex((i)=>i===payload);
    if (fieldToRemoveIndex === -1) throw new Error(`Asked to remove field nr ${payload}, but cannot find such a field`)
    const fieldsCp = [...state.selectedFields];
    fieldsCp.splice(fieldToRemoveIndex, 1);
    const newState = {...state, selectedFields: fieldsCp};
    return newState;
}
const setFieldsToVisit = (state: iEditGeneralSettingsState, payload: string[]) => {
    const newState = {...state, selectedFields: payload}
    return newState;
}

const setNrOfHousesInBank = (state: iEditGeneralSettingsState, payload: number) => {
    console.log('Payload', payload)
    const newState = {...state, nrOfHousesInBank: payload};
    return newState;
}

const setNrOfHotelsInBank = (state: iEditGeneralSettingsState, payload: number) => {
    const newState = {...state, nrOfHotelsInBank: payload};
    return newState;
}

export type tActions = {
    type: EditGeneralSettingsForTestsTypes.setDiceNumber
    payload: number
} | {
    type: EditGeneralSettingsForTestsTypes.setTestMode
    payload: TestModes,
} | {
    type: EditGeneralSettingsForTestsTypes.setOneOfNumbers,
    payload: string | number
} | {
    type: EditGeneralSettingsForTestsTypes.removeOneOfNumbers,
    payload: string | number
} | {
    type: EditGeneralSettingsForTestsTypes.setFieldsToVisit,
    payload: string[] | number[]
} | {
    type: EditGeneralSettingsForTestsTypes.setHousesInBank,
    payload: number,
} | {
    type: EditGeneralSettingsForTestsTypes.setHotelsInBank,
    payload: number,
}

const setNrOnDiceAction = (payload: number):tActions => ({ type: EditGeneralSettingsForTestsTypes.setDiceNumber, payload });
const setTestModeAction = (payload: TestModes):tActions => ({type: EditGeneralSettingsForTestsTypes.setTestMode, payload })
const addFieldToVisitAction = (payload: string):tActions => ({type:EditGeneralSettingsForTestsTypes.setOneOfNumbers, payload})
const removeFieldToVisitAction = (payload: string):tActions => ({type:EditGeneralSettingsForTestsTypes.removeOneOfNumbers, payload})
const changeFieldsToVisitAction = (payload: string[]): tActions => ({type: EditGeneralSettingsForTestsTypes.setFieldsToVisit, payload });
const changeHousesInBankAction = (payload: number): tActions => ({type: EditGeneralSettingsForTestsTypes.setHousesInBank, payload})
const changeHotelsInBankAction = (payload: number): tActions => ({type: EditGeneralSettingsForTestsTypes.setHotelsInBank, payload});

type tDispach = (arg: tActions) => void;

export const getSelectFromLogicActions = (dispatch: tDispach) => ({
    setNrToBeSelectedForDicesThrow: (payload: number) => dispatch(setNrOnDiceAction(payload)),
    setTestMode: (payload: TestModes) => {
        dispatch(setTestModeAction(payload))
    },
    addFieldToVisit: (palylad: string) => dispatch(addFieldToVisitAction(palylad)),
    removeFieldToVisit: (palyoad: string) => dispatch(removeFieldToVisitAction(palyoad)),
    changeFieldsToVisit: (payload: string[]) => dispatch(changeFieldsToVisitAction(payload)),
    changeHousesInBank: (payload: number) => dispatch(changeHousesInBankAction(payload)),
    changeHotelsInBank: (payload: number) => dispatch(changeHotelsInBankAction(payload)),
})

const REDUCER = {
    [EditGeneralSettingsForTestsTypes.setDiceNumber]:setNrToBeSelectedForDicesThrow,
    [EditGeneralSettingsForTestsTypes.setTestMode]:setTestMode,
    [EditGeneralSettingsForTestsTypes.removeOneOfNumbers]: removeField,
    [EditGeneralSettingsForTestsTypes.setOneOfNumbers]: addField,
    [EditGeneralSettingsForTestsTypes.setFieldsToVisit]: setFieldsToVisit,
    [EditGeneralSettingsForTestsTypes.setHousesInBank]: setNrOfHousesInBank,
    [EditGeneralSettingsForTestsTypes.setHotelsInBank]: setNrOfHotelsInBank
}

const reducer = getReducer(REDUCER);

type tSubscribeDiceArgs = {
    callback: tSubscription,
    instance: DiceTestModeDecorator, 
    messageType: typeof CHANGE_FIELDS_TO_VISIT | typeof CHANGE_NR_THAT_DICE_WILL_THROW | typeof CHANGE_TEST_MODE
    id: string,
}

type tSubscribeBankArgs = {
    callback: tSubscription,
    instance: Bank,
    messageType: typeof CHANGE_NR_HOUSES | typeof CHANGE_NR_HOTELS
    id: string,
}

type tInstance = Bank | DiceTestModeDecorator;

type tSubscribeArgs = tSubscribeBankArgs | tSubscribeDiceArgs;


const getSubscribtion = ({id, callback, instance, messageType } : tSubscribeArgs) => {
    const subscribtion = { callback, id, messageType }
    const subscribe = () => {
        instance.subscribe(subscribtion as any)
    }
    const cassedMessageType = messageType as any;
    const unsubscribe = () => {(instance as any).unsubscribe(cassedMessageType, id)};
    return {subscribe, unsubscribe}    
}

const useSubscribtion = (subscribtionProps : tSubscribeArgs) => {
    useEffect(() => {
        const {subscribe, unsubscribe} = getSubscribtion(subscribtionProps);
        subscribe();
        return () => unsubscribe();
    }, [])
}

const useDiceSubscribtions = (instance: DiceTestModeDecorator, dispatch: tDispach) => {
    const id = 'dice-test-link';
    const bankId = 'bank-test';
    console.dir(instance)
    useSubscribtion({
        id,
        messageType: CHANGE_FIELDS_TO_VISIT,
        callback: subscribtionsStructure.fieldsToVisit(dispatch),
        instance: instance,
    });
    useSubscribtion({
        id,
        messageType: CHANGE_TEST_MODE,
        callback: subscribtionsStructure.testingMode(dispatch),
        instance: instance,
    });
    useSubscribtion({
        id,
        messageType: CHANGE_NR_THAT_DICE_WILL_THROW,
        callback: subscribtionsStructure.nrThatDiceWillSelectInTestMode(dispatch),
        instance: instance,
    });
}

const useBankSubscribtions = (instance: Bank, dispatch: tDispach) => {
    const bankId = 'bank-test';
    useSubscribtion({
        id: bankId,
        messageType: CHANGE_NR_HOUSES,
        callback: subscribtionsStructure.changeNrOfHouses(dispatch),
        instance,
    });
    useSubscribtion({
        id: bankId,
        messageType: CHANGE_NR_HOTELS,
        callback: subscribtionsStructure.changeNrOfHotels(dispatch),
        instance,
    });
}


const subscribtionsStructure: {[key:string]: (dispatch: tDispach) => (payload: any) => void} = {
    fieldsToVisit: (dispatch: tDispach) => getSelectFromLogicActions(dispatch)['changeFieldsToVisit'],
    testingMode: (dispatch: tDispach) => {
        const cb = getSelectFromLogicActions(dispatch)['setTestMode'];
        return cb
    },
    nrThatDiceWillSelectInTestMode: (dispatch: tDispach) => {
        return getSelectFromLogicActions(dispatch)['setNrToBeSelectedForDicesThrow']
    },
    changeNrOfHouses: (dispatch: tDispach) => {
        return getSelectFromLogicActions(dispatch)['changeHousesInBank']
    },
    changeNrOfHotels: (dispatch: tDispach) => {
        return getSelectFromLogicActions(dispatch)['changeHotelsInBank']
    }
}

export const useGeneralSettingsForTests = (): tUseGeneralSettingsForTests => {
    const testDice = new DiceTestModeDecorator();
    const [state, dispatch] = useReducer(reducer, {
        ...initState,
        testMode: testDice.testingMode,
        nrToBeSelectedForDicesThrow: testDice.nrThatDiceWillSelectInTestMode,
        selectedFields: testDice.fieldsToVisit,
        nrOfHousesInBank: NR_OF_HOUSES,
        nrOfHotelsInBank: NR_OF_HOTELS,
    });
    const {nrToBeSelectedForDicesThrow, testMode, selectedFields} = state;
    useDiceSubscribtions(testDice, dispatch);
    useBankSubscribtions(Bank.instance, dispatch);
    return {
        nrToBeSelectedForDicesThrow,
        testMode,
        setNrToBeSelectedForDicesThrow: Commander.changeNrToBeSelectedOnDicesThrow,
        setTestMode: (item : string) => Commander.changeTestMode(item as TestModes),
        addFieldToVisit: (item: string) => {
            // const shiftedItem = shiftBoardIndexByNeg1(parseInt(item));
            // Commander.addFieldsToVisit([`${shiftedItem}`])
            Commander.addFieldsToVisit([item])
        },
        removeFieldToVisit: (item: string) => {
            // const shiftedItem = shiftBoardIndexByNeg1(parseInt(item));
            // Commander.removeFieldsToVisit([`${shiftedItem}`])
            Commander.removeFieldsToVisit([item])
        },
        selectedFields: selectedFields,
        possibleTestModes: Object.values(TestModes),
        log: () => {
            console.error('useEtitGeneralSettingsForTests: reconsider state of the hook')
            Commander.logTestDiceState();
        },
        currentPlayerColor: Players._instance.currentPlayerColor,
        currentPlayerName: Players._instance.currentPlayerName,
        setCurrentPlayerName: (name: string) => Players._instance.currentPlayerName = name,
    }
}
