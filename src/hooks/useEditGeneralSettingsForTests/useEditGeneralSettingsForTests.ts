import { useEffect, useReducer } from "react"
import { getReducer } from "../../Functions/reducer"
import { shiftBoardIndexByNeg1 } from "../../Functions/shiftIndex"
import { Commander } from "../../Logic/Commander/Commander"
import { DiceTestModeDecorator } from "../../Logic/Dice/Dice"
import { TestModes } from "../../Logic/Dice/types"
import { CHANGE_FIELDS_TO_VISIT, CHANGE_NR_THAT_DICE_WILL_THROW, CHANGE_TEST_MODE } from "../../Logic/Messages/constants"
import { tSubscription } from "../../Types/types"
import { EditGeneralSettingsForTestsTypes, iEditGeneralSettingsState, tEditGeneralSettingPayload, tUseGeneralSettingsForTests } from "./types"


const initState: iEditGeneralSettingsState = {
    nrToBeSelectedForDicesThrow: 1,
    testMode: TestModes.none,
    setNrToBeSelectedForDicesThrow: (val: number) => {},
    setTestMode: (val: TestModes) => {},
    possibleTestModes: TestModes,
    selectedFields: [],
}

const setNrToBeSelectedForDicesThrow = (state: iEditGeneralSettingsState, payload: tEditGeneralSettingPayload)  => {
    const newState = {...state, nrToBeSelectedForDicesThrow: payload};
    return newState;
}

const setTestMode = (state: iEditGeneralSettingsState, payload: tEditGeneralSettingPayload) => {
    console.log('Setting test mode: ', payload)
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
}

const setNrOnDiceAction = (payload: number):tActions => ({ type: EditGeneralSettingsForTestsTypes.setDiceNumber, payload });
const setTestModeAction = (payload: TestModes):tActions => ({type: EditGeneralSettingsForTestsTypes.setTestMode, payload })
const addFieldToVisitAction = (payload: string):tActions => ({type:EditGeneralSettingsForTestsTypes.setOneOfNumbers, payload})
const removeFieldToVisitAction = (payload: string):tActions => ({type:EditGeneralSettingsForTestsTypes.removeOneOfNumbers, payload})
const changeFieldsToVisitAction = (payload: string[]): tActions => ({type: EditGeneralSettingsForTestsTypes.setFieldsToVisit, payload });

type tDispach = (arg: tActions) => void;

export const getSelectFromLogicActions = (dispatch: tDispach) => ({
    setNrToBeSelectedForDicesThrow: (payload: number) => dispatch(setNrOnDiceAction(payload)),
    setTestMode: (payload: TestModes) => {
        console.log(payload)
        dispatch(setTestModeAction(payload))
    },
    addFieldToVisit: (palylad: string) => dispatch(addFieldToVisitAction(palylad)),
    removeFieldToVisit: (palyoad: string) => dispatch(removeFieldToVisitAction(palyoad)),
    changeFieldsToVisit: (payload: string[]) => dispatch(changeFieldsToVisitAction(payload)),
})

const REDUCER = {
    [EditGeneralSettingsForTestsTypes.setDiceNumber]:setNrToBeSelectedForDicesThrow,
    [EditGeneralSettingsForTestsTypes.setTestMode]:setTestMode,
    [EditGeneralSettingsForTestsTypes.removeOneOfNumbers]: removeField,
    [EditGeneralSettingsForTestsTypes.setOneOfNumbers]: addField,
    [EditGeneralSettingsForTestsTypes.setFieldsToVisit]: setFieldsToVisit,
}

const reducer = getReducer(REDUCER);

interface iSubscribeArgs {
    callback: tSubscription,
    instance: DiceTestModeDecorator, 
    messageType: typeof CHANGE_FIELDS_TO_VISIT | typeof CHANGE_NR_THAT_DICE_WILL_THROW | typeof CHANGE_TEST_MODE
    id: string,
}

const getSubscribtion = ({id, callback, instance, messageType } : iSubscribeArgs) => {
    const subscribtion = { callback, id, messageType }
    const subscribe = () => {
        console.log('Subscribing', id, messageType, callback)
        instance.subscribe(subscribtion)
    }
    const unsubscribe = () => {instance.unsubscribe(messageType, id)};
    return {subscribe, unsubscribe}
}

const useSubscribtion = (subscribtionProps : iSubscribeArgs) => {
    useEffect(() => {
        const {subscribe, unsubscribe} = getSubscribtion(subscribtionProps);
        subscribe();
        return () => unsubscribe();
    }, [])
}

const useSubscribtions = (diceInstane: DiceTestModeDecorator, dispatch: tDispach) => {
    const id = 'dice-test-link';
    useSubscribtion({
        id,
        messageType: CHANGE_FIELDS_TO_VISIT,
        callback: subscribtionsStructure.fieldsToVisit(dispatch),
        instance: diceInstane,
    });
    useSubscribtion({
        id,
        messageType: CHANGE_TEST_MODE,
        callback: subscribtionsStructure.testingMode(dispatch),
        instance: diceInstane,
    });
    useSubscribtion({
        id,
        messageType: CHANGE_NR_THAT_DICE_WILL_THROW,
        callback: subscribtionsStructure.nrThatDiceWillSelectInTestMode(dispatch),
        instance: diceInstane,
    });
}

const subscribtionsStructure: {[key:string]: (dispatch: tDispach) => (payload: any) => void} = {
    fieldsToVisit: (dispatch: tDispach) => getSelectFromLogicActions(dispatch)['changeFieldsToVisit'],
    testingMode: (dispatch: tDispach) => {
        const cb = getSelectFromLogicActions(dispatch)['setTestMode'];
        console.log(cb)
        return cb
    },
    nrThatDiceWillSelectInTestMode: (dispatch: tDispach) => {
        return getSelectFromLogicActions(dispatch)['setNrToBeSelectedForDicesThrow']
    }
}

export const useGeneralSettingsForTests = (): tUseGeneralSettingsForTests => {
    const testDice = new DiceTestModeDecorator();
    const [state, dispatch] = useReducer(reducer, {
        ...initState,
        testMode: testDice.testingMode,
        nrToBeSelectedForDicesThrow: testDice.nrThatDiceWillSelectInTestMode,
        selectedFields: testDice.fieldsToVisit,
    });
    const {nrToBeSelectedForDicesThrow, testMode, selectedFields} = state;
    useSubscribtions(testDice, dispatch);
    useEffect(() => console.log(testMode), [testMode])
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
    }
}
