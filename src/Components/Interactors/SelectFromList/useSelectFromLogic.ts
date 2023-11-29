import { useReducer } from "react";
import { getReducer } from "../../../Functions/reducer";
import { useOnBlur, useOnFocus } from "../../../hooks/useOnFocusChangers";
import { iSearchFromState, iSelectFromLogicArgs, SelectFromLogicTypes, tActions, tClear, tClearSearchResult, tClose, tGetSelectFromLogicActions, tOpen, tPayloadTypes1 } from "./types";

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
const clearSearchResultAction: () => tClearSearchResult = () => ({type: SelectFromLogicTypes.clearSearchResult});
const selectAction = function( payload: string ) { return {type: SelectFromLogicTypes.select, payload} };
const searchAction = ( payload: string ) => ({type: SelectFromLogicTypes.search, payload})

export const getSelectFromLogicActions = (dispatch: (arg: tActions) => void) => ({
    open:  () => dispatch(openAction()),
    close: () => dispatch(closeAction()),
    clear: () => dispatch(clearAction()),
    select: (payload: string) => {dispatch(selectAction(payload))},
    search: (payload: string) => {dispatch(searchAction(payload))},
    clearSearchResult: () => {dispatch(clearSearchResultAction())},
})

const openSearchMode = (state:iSearchFromState) => {
    const newState = {...state, isSearchExpanded: true};
    console.log(newState)
    return newState
}
const selectOption = (state:iSearchFromState, payload: tPayloadTypes1) => ({...state, isSearchListExpanded: false, selected: payload, displayed: payload, isSearchExpanded: false});
const closeSearchMode = (state: iSearchFromState) => ({...state, isSearchListExpanded: false, displayed: state.selected, isSearchExpanded: false});
const clearSelection = (state: iSearchFromState) => ({...state, displayed: '', selected: '', visibleItems: state.items});
const clearSearchResult = (state: iSearchFromState) => ({...state, visibleItems: state.items, displayed: state.selected, isSearchExpanded: false})
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
    clearSearchResult: clearSearchResult,
    clearSelection: clearSelection,
    open: openSearchMode,
}

export const reducer = getReducer<iSearchFromState, string, tPayloadTypes1>(REDUCER)

export const useSelectFromLogic = ({textBoxReference, items, defaultSelection, onClick}: iSelectFromLogicArgs) => {
    const [{
        isSearchExpanded,
        selected,
        displayed,
        visibleItems,
    }, dispatch] = useReducer(reducer, {...initialState, visibleItems: items, items, selected: defaultSelection, displayed: defaultSelection});
    const {open, clear, close, search, select, clearSearchResult} = getSelectFromLogicActions(dispatch)
    useOnBlur(textBoxReference, () => {clearSearchResult()})
    useOnFocus(textBoxReference, () => {open()})
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
