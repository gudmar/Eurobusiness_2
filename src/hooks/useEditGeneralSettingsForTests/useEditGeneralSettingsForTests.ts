import { useEffect, useReducer } from "react"
import { getReducer } from "../../Functions/reducer"
import { DiceTestModeDecorator, tTestDiceChanged } from "../../Logic/Dice/Dice"
import { TestModes } from "../../Logic/Dice/types"
import { ANY_CHANGE, CHANGE_FIELDS_TO_VISIT, CHANGE_NR_THAT_DICE_WILL_THROW, CHANGE_TEST_MODE } from "../../Logic/Messages/constants"
import { SubscribtionsHandler } from "../../Logic/SubscrbtionsHandler"
import { iSubscription, tSubscription } from "../../Types/types"
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
    setTestMode: (payload: TestModes) => dispatch(setTestModeAction(payload)),
    addFieldToVisit: (palylad: string) => dispatch(addFieldToVisitAction(palylad)),
    removeFieldToVisit: (palyoad: string) => dispatch(removeFieldToVisitAction(palyoad)),
    changeFieldsToVisit: (payload: string[]) => dispatch(changeFieldsToVisitAction(payload)),
})

const REDUCER = {
    [EditGeneralSettingsForTestsTypes.setDiceNumber]:setNrToBeSelectedForDicesThrow,
    [EditGeneralSettingsForTestsTypes.setTestMode]:setTestMode,
    [EditGeneralSettingsForTestsTypes.removeOneOfNumbers]: removeField,
    [EditGeneralSettingsForTestsTypes.setOneOfNumbers]: addField,
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
    const subscribe = () => {instance.subscribe(subscribtion)}
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

const useSubscribtions = (diceInstane: DiceTestModeDecorator) => {
    const id = 'dice-test-link';
    useSubscribtion({
        id,
        messageType: CHANGE_FIELDS_TO_VISIT,
        callback: subscribtionsStructure['fieldsToVisit'],
        instance: diceInstane,
    });
    useSubscribtion({
        id,
        messageType: CHANGE_FIELDS_TO_VISIT,
        callback: subscribtionsStructure['testMode'],
        instance: diceInstane,
    });
    useSubscribtion({
        id,
        messageType: CHANGE_FIELDS_TO_VISIT,
        callback: subscribtionsStructure['nrOnDice'],
        instance: diceInstane,
    });

}

// const getSubscribtions = ({ propName, callback, diceInstance } : iSubscribeArgs) => {
//     const id = 'dice-test-link';
//     const messageType_fieldsToVisit = CHANGE_FIELDS_TO_VISIT;
//     const messageType_testMode = CHANGE_TEST_MODE;
//     const messageType_nrOnDice = CHANGE_NR_THAT_DICE_WILL_THROW;
//     const subscribtion_fieldsToVisit: iSubscription<tTestDiceChanged> = { callback, id, messageType: messageType_fieldsToVisit }
//     const subscribtion_testMode: iSubscription<tTestDiceChanged> = { callback, id, messageType: messageType_testMode }
//     const subscribtion_nrOnDice: iSubscription<tTestDiceChanged> = { callback, id, messageType: messageType_nrOnDice }
//     const subscribe_fieldsToVisit = () => {diceInstance.subscribe(subscribtion_fieldsToVisit)}
//     const subscribe_testMode = () => {diceInstance.subscribe(subscribtion_testMode)}
//     const subscribe_nrOnDice = () => {diceInstance.subscribe(subscribtion_nrOnDice)}
//     const unsubscribe_fieldsToVisit = () => {diceInstance.unsubscribe(messageType_fieldsToVisit, id)};
//     const unsubscribe_testMode = () => {diceInstance.unsubscribe(messageType_testMode, id)};
//     const unsubscribe_nrOnDice = () => {diceInstance.unsubscribe(messageType_nrOnDice, id)};
//     return {subscribe_fieldsToVisit, subscribe_nrOnDice, subscribe_testMode, unsubscribe_fieldsToVisit, unsubscribe_nrOnDice, unsubscribe_testMode}
// }
const subscribtionsStructure: any = [
    { propName: 'fieldsToVisit', callback: (dispatch: tDispach) => getSelectFromLogicActions(dispatch)['changeFieldsToVisit']},
    { propName: 'testingMode', callback: (dispatch: tDispach) => getSelectFromLogicActions(dispatch)['setTestMode']},
    { propName: 'nrThatDiceWillSelectInTestMode', callback: (dispatch: tDispach) => getSelectFromLogicActions(dispatch)['setNrToBeSelectedForDicesThrow']},
]

export const useGeneralSettingsForTests = (): tUseGeneralSettingsForTests => {
    const testDice = new DiceTestModeDecorator();
    const [state, dispatch] = useReducer(reducer, initState);
    const {nrToBeSelectedForDicesThrow, testMode, selectedFields} = state;
    useSubscribtions(testDice);
    const {
        setNrToBeSelectedForDicesThrow,
        setTestMode,
        addFieldToVisit,
        removeFieldToVisit
    } = getSelectFromLogicActions(dispatch);
    return {
        nrToBeSelectedForDicesThrow,
        testMode,
        setNrToBeSelectedForDicesThrow,
        setTestMode,
        addFieldToVisit,
        removeFieldToVisit,
        selectedFields,
        possibleTestModes: Object.values(TestModes),
        log: () => {console.log(state)},
    }
}