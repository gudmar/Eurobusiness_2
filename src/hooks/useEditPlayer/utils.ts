import { iPlayerState } from "../../Logic/Players/types";
import { iAction } from "../../Logic/types";

type tPayload = string | number | [] | iPlayerReducerState
type iPlayerReducerState = any;

enum EditPlayerTypes {
    changeName = 'changeName',
    changeMoney = 'changeMoney',
    changeSpecialCards = 'changeSpecialCards',
    changeFieldNr = 'changeFieldNr',
    changeIsInPrison = 'changeIsInPrison',
    changeTurnsToWait = 'changeTurnsToWait',
    changeGameLost = 'changeGameLost',
    changeState = 'changeState',
    // changeColor = 'changeColor'
}

// type tPlayerReducerTypes = Record<EditPlayerTypes, string>

const getNewState = (state: iPlayerReducerState, payload: tPayload) => {
    console.log('Payload', payload)
    const newState = {...payload}
    return newState;
}

const changeName = (state:iPlayerReducerState, payload:tPayload) => {
    const newState = {...payload}
    return newState;
}

const changeMoney = (state:iPlayerReducerState, payload: tPayload) => {
    const newState = {...state, money: payload};
    return newState
}

const changeSpecialCards = (state: iPlayerReducerState, payload: tPayload) => {
    const newState = {...state, specialCards: payload}
    return newState;
}

const changeFieldNr = (state: iPlayerReducerState, payload: tPayload) => {
    const newState = { ...state, fieldNr: payload}
    return newState
}

const changeInPrison = (state: iPlayerReducerState, payload: tPayload) => {
    const newState = { ...state,inPrison: payload}
    return newState
}

const changeTrurnsToWait = (state: iPlayerReducerState, payload: tPayload) => {
    const newState = { ...state, turnsToWait: payload}
    return newState
}

const changeGameLost = (state: iPlayerReducerState, payload: tPayload) => {
    const newState = { ...state, gameLost: payload}
    return newState
}

const changeState = (state: iPlayerReducerState, payload: tPayload) => {
    const newState = { payload}
    return newState
}

export const REDUCER = {
    [EditPlayerTypes.changeName]:          getNewState,//changeName,
    [EditPlayerTypes.changeMoney]:         getNewState,//changeMoney,
    [EditPlayerTypes.changeSpecialCards]:  getNewState,//changeSpecialCards,
    [EditPlayerTypes.changeFieldNr]:       getNewState,//changeFieldNr,
    [EditPlayerTypes.changeIsInPrison]:    getNewState,//changeInPrison,
    [EditPlayerTypes.changeTurnsToWait]:   getNewState,//changeTrurnsToWait,
    [EditPlayerTypes.changeGameLost]:      getNewState,//changeGameLost,
    [EditPlayerTypes.changeState]:         getNewState,//changeState,
}

type tPlayerReducerTypes = keyof typeof EditPlayerTypes
type iPlayerEditorAction = iAction<tPlayerReducerTypes, tPayload>

export const reducer = (state: iPlayerReducerState, {type, payload}: iPlayerEditorAction) => {
    const newStateGetter = REDUCER[type];
    const newState = newStateGetter(state, payload);
    return newState;
}

export const changeNameAction = (state: iPlayerState) => ({type: EditPlayerTypes.changeName, payload: state});
export const changeMoneyAction = (money: number) => ({type: EditPlayerTypes.changeMoney, payload: money});
export const changeSpecialCardsAction = (specialCards: []) => ({type: EditPlayerTypes.changeSpecialCards, payload: specialCards});
export const changeFieldNrAction = (fieldNr: number) => ({type: EditPlayerTypes.changeFieldNr, payload: fieldNr});
export const changeIsInPrisonAction = (isInPrison: string) => ({type: EditPlayerTypes.changeIsInPrison, payload: isInPrison});
export const changeTurnsToWaitAction = (turnsToWait: number) => ({type: EditPlayerTypes.changeTurnsToWait, payload: turnsToWait});
export const changeGameLostAction = (isGameLost: string) => ({type: EditPlayerTypes.changeGameLost, payload: isGameLost});
export const changeStateAction = (state: iPlayerReducerState) => ({type: EditPlayerTypes.changeName, payload: state});

export const getUpdateName = (dispatch: any) => ({name}: any) => { console.log(name); dispatch(changeNameAction(name))};
export const getUpdateMoney = (dispatch: any) => ({money}: any) => { dispatch(changeMoneyAction(money))};
export const getUpdateSpecialCards = (dispatch: any) => ({specialCards}: any) => { dispatch(changeSpecialCardsAction(specialCards))};
export const getUpdateFieldNr = (dispatch: any) => ({fieldNr}: any) => { dispatch(changeFieldNrAction(fieldNr))};
export const getUpdateIsInPrison = (dispatch: any) => ({isInPrison}: any) => { dispatch(changeIsInPrisonAction(isInPrison))};
export const getUpdateTurnsToWait = (dispatch: any) => ({turnsToWait}: any) => { dispatch(changeTurnsToWaitAction(turnsToWait))};
export const getUpdateGameLost = (dispatch: any) => ({gameLost}: any) => { dispatch(changeGameLostAction(gameLost))};
export const getUpdateState = (dispatch: any) => (state: any) => { dispatch(changeStateAction(state))};
