import { useReducer } from "react";
import { getReducer } from "../../../Functions/reducer";
import { useOnFocusin } from "../../../hooks/useOnFocusChangers";
import { useInvoceIfEventOutsideElement } from "../../../hooks/useOnOutsideInsideElement";
import { iSearchFromState, iSelectFromLogicArgs, SelectFromLogicTypes, tActions, tClear, tClearSearchResult, tClose, tOpen, tPayloadTypes1 } from "./types";

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
    return newState
}
const selectOption = (state:iSearchFromState, payload: tPayloadTypes1) => ({...state, isSearchListExpanded: false, selected: payload, displayed: payload, isSearchExpanded: false});
const closeSearchMode = (state: iSearchFromState) => ({
    ...state, isSearchListExpanded: false, 
    displayed: state.selected, 
    isSearchExpanded: false
});
const clearSelection = (state: iSearchFromState) => ({...state, displayed: '', selected: '', visibleItems: state.items});
const clearSearchResult = (state: iSearchFromState) => ({
    ...state, visibleItems: state.items, 
    displayed: state.selected, 
    isSearchExpanded: false
})
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
    clear: clearSelection,
    open: openSearchMode,
    close: closeSearchMode,
}

export const reducer = getReducer<iSearchFromState, string, tPayloadTypes1>(REDUCER)

export const useSelectFromLogic = ({ blurRef, items, defaultSelection, onSelect }: iSelectFromLogicArgs) => {
    const [{
        isSearchExpanded,
        selected,
        displayed,
        visibleItems,
    }, dispatch] = useReducer(reducer, {
        ...initialState, visibleItems: items, items,
        // selected: defaultSelection,
        displayed: defaultSelection
    });
    const {open, clear, close, search, 
        select, 
        clearSearchResult
    } = getSelectFromLogicActions(dispatch)
    useInvoceIfEventOutsideElement({reference: blurRef, mouseEventName: 'click', callback: clearSearchResult})
    useOnFocusin(blurRef, () => {open()})
    const selectWithExternalEffect = (newSelecion: string) => {
        onSelect(newSelecion);
        select(newSelecion)
    }
    return {
        isSearchListExpanded: isSearchExpanded,
        valueInTextBox: displayed,
        // selectItem: select,
        selectItem: selectWithExternalEffect,
        clearSelection: clear,
        search,
        close,
        open,
        selected: defaultSelection,
        visibleItems,
    }
}
