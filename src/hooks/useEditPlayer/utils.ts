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

const changeName = (state:iPlayerReducerState, payload:tPayload) => {
    const newState = {...state, name: payload};
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
    [EditPlayerTypes.changeName]: changeName,
    [EditPlayerTypes.changeMoney]: changeMoney,
    [EditPlayerTypes.changeSpecialCards]: changeSpecialCards,
    [EditPlayerTypes.changeFieldNr]: changeFieldNr,
    [EditPlayerTypes.changeIsInPrison]: changeInPrison,
    [EditPlayerTypes.changeTurnsToWait]: changeTrurnsToWait,
    [EditPlayerTypes.changeGameLost]: changeGameLost,
    [EditPlayerTypes.changeState]: changeState,
}

type tPlayerReducerTypes = keyof typeof EditPlayerTypes
type iPlayerEditorAction = iAction<tPlayerReducerTypes, tPayload>

export const reducer = (state: iPlayerReducerState, {type, payload}: iPlayerEditorAction) => {
    const newStateGetter = REDUCER[type];
    const newState = newStateGetter(state, payload);
    return newState;
}

export const changeNameAction = (name: string) => ({type: EditPlayerTypes.changeName, payload: name});
export const changeMoneyAction = (money: number) => ({type: EditPlayerTypes.changeMoney, payload: money});
export const changeSpecialCardsAction = (specialCards: []) => ({type: EditPlayerTypes.changeSpecialCards, payload: specialCards});
export const changeFieldNrAction = (fieldNr: number) => ({type: EditPlayerTypes.changeFieldNr, payload: fieldNr});
export const changeIsInPrison = (isInPrison: string) => ({type: EditPlayerTypes.changeIsInPrison, payload: isInPrison});
export const changeTurnsToWaitAction = (turnsToWait: number) => ({type: EditPlayerTypes.changeTurnsToWait, payload: turnsToWait});
export const changeGameLostAction = (isGameLost: string) => ({type: EditPlayerTypes.changeGameLost, payload: isGameLost});
export const changeStateAction = (state: iPlayerReducerState) => ({type: EditPlayerTypes.changeName, payload: state});
