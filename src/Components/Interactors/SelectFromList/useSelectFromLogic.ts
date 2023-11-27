import { useReducer } from "react";
import { getReducer } from "../../../Functions/reducer";
import { useOnBlur, useOnFocus } from "../../../hooks/useOnFocusChangers";
import { iSearchFromState, iSelectFromLogicArgs, SelectFromLogicTypes, tActions, tClose, tGetSelectFromLogicActions, tOpen, tPayloadTypes1 } from "./types";

export const initialState: iSearchFromState = {
    isSearchExpanded: false,
    selected: '',
    displayed: '',
    items: [],
    visibleItems: []
}

const openAction: () => tOpen = () => ({type: SelectFromLogicTypes.open})
const closeAction: () => tClose = () => ({type: SelectFromLogicTypes.close})
const selectAction = ( payload: string ) => ({type: SelectFromLogicTypes.select, payload})
const searchAction = ( payload: string ) => ({type: SelectFromLogicTypes.search, payload})

export const getSelectFromLogicActions = (dispatch: (arg: tActions) => void) => ({
    open: () => dispatch(openAction()),
    close: () => dispatch(closeAction()),
    select: (payload: string) => dispatch(selectAction(payload)),
    search: (payload: string) => dispatch(searchAction(payload)),
})

const openSearchMode = (state:iSearchFromState) => ({...state, isSearchListExpanded: true})
const selectOption = (state:iSearchFromState, payload: tPayloadTypes1) => ({...state, isSearchListExpanded: false, selected: payload, displayed: payload});
const closeSearchMode = (state: iSearchFromState) => ({...state, isSearchListExpanded: false, displayed: state.selected});
const search = (state: iSearchFromState, payload: string) => {
    const visibleItems = state.visibleItems.filter((item: string) => item.toLocaleLowerCase() === payload.toLocaleLowerCase())
    return { ...state, visibleItems }
}

const REDUCER = {
    openSearchMode: openSearchMode,
    selectOption: selectOption,
    closeSearchMode: closeSearchMode,
    search: search,
}

export const reducer = getReducer<iSearchFromState, string, tPayloadTypes1>(REDUCER)

export const useSelectFromLogic = ({textBoxReference, items, defaultSelection, onClick}: iSelectFromLogicArgs) => {
    useOnBlur(textBoxReference, () => {})
    useOnFocus(textBoxReference, () => {})
    const [{
        isSearchExpanded,
        selected,
        displayed,
        visibleItems,
    }, dispatch] = useReducer(reducer, initialState);
    const {open, close, search, select} = getSelectFromLogicActions(dispatch)
}
