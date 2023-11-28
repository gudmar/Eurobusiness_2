import { useReducer } from "react";
import { getReducer } from "../../../Functions/reducer";
import { useOnBlur, useOnFocus } from "../../../hooks/useOnFocusChangers";
import { iSearchFromState, iSelectFromLogicArgs, SelectFromLogicTypes, tActions, tClear, tClose, tGetSelectFromLogicActions, tOpen, tPayloadTypes1 } from "./types";

export const initialState: iSearchFromState = {
    isSearchExpanded: false,
    selected: '',
    displayed: '',
    items: [],
    visibleItems: []
}

const openAction: () => tOpen = () => ({type: SelectFromLogicTypes.open})
const closeAction: () => tClose = () => ({type: SelectFromLogicTypes.close})
const clearAction: () => tClear = () => ({type: SelectFromLogicTypes.clear})
const selectAction = function( payload: string ) { return {type: SelectFromLogicTypes.select, payload} };
const searchAction = ( payload: string ) => ({type: SelectFromLogicTypes.search, payload})

export const getSelectFromLogicActions = (dispatch: (arg: tActions) => void) => ({
    open:  () => dispatch(openAction()),
    close: () => dispatch(closeAction()),
    clear: () => dispatch(clearAction()),
    select: (payload: string) => {dispatch(selectAction(payload))},
    search: (payload: string) => {dispatch(searchAction(payload))},
})

const openSearchMode = (state:iSearchFromState) => ({...state, isSearchListExpanded: true})
const selectOption = (state:iSearchFromState, payload: tPayloadTypes1) => ({...state, isSearchListExpanded: false, selected: payload, displayed: payload});
const closeSearchMode = (state: iSearchFromState) => ({...state, isSearchListExpanded: false, displayed: state.selected});
const clearSelection = (state: iSearchFromState) => ({...state, displayed: '', selected: ''});
const search = (state: iSearchFromState, payload: string) => {
    const displayed = payload;
    const visibleItems = state.items.filter((item: string) => {
        return item.toLowerCase().includes(payload.toLowerCase())
    })
    return { ...state, visibleItems, displayed }
}

const REDUCER = {
    openSearchMode: openSearchMode,
    select: selectOption,
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
    }, dispatch] = useReducer(reducer, {...initialState, visibleItems: items, items, selected: defaultSelection, displayed: defaultSelection});
    const {open, clear, close, search, select} = getSelectFromLogicActions(dispatch)
    return {
        isSearchListExpanded: isSearchExpanded,
        valueInTextBox: displayed,
        selectItem: select,
        clearSelection: clear,
        search,
        close,
        open,
        selected,
        visibleItems,
    }
}
