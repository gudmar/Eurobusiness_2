import { useEffect, useReducer } from "react";
import { getReducer } from "../../../Functions/reducer";
import { useOnEventLocationWithExceptions } from "../../../hooks/useOnOutsideInsideElement";
import { iMultiSelectFromLogicArgs, iMultiSelectFromState, MultiSelectFromLogicTypes, tActions, tClear, tClearSearchResult, tClose, tOpen, tPayloadTypes } from "./types";

const getInitialState = (): iMultiSelectFromState => ({
    isSearchExpanded: false,
    displayed: '',
    items: [],
    visibleItems: []
})

const openAction: () => tOpen = () => ({type: MultiSelectFromLogicTypes.open})
const closeAction: () => tClose = () => ({type: MultiSelectFromLogicTypes.close})
const clearAction: () => tClear = () => ({type: MultiSelectFromLogicTypes.clear})
const clearSearchResultAction: () => tClearSearchResult = () => ({type: MultiSelectFromLogicTypes.clearSearchResult});
const toggleSelectionAction = function( payload: string ):tActions { return {type: MultiSelectFromLogicTypes.toggleSelection, payload} };
const searchAction = ( payload: string ):tActions => ({type: MultiSelectFromLogicTypes.search, payload});
const changeItemsAction = (payload: string[]):tActions => ({type: MultiSelectFromLogicTypes.changeItems, payload})

export const getSelectFromLogicActions = (dispatch: (arg: tActions) => void) => ({
    open:  () => dispatch(openAction()),
    close: () => dispatch(closeAction()),
    clear: () => dispatch(clearAction()),
    toggleSelection: (payload: string) => dispatch(toggleSelectionAction(payload)),
    search: (payload: string) => {dispatch(searchAction(payload))},
    clearSearchResult: () => {dispatch(clearSearchResultAction())},
    changeItems: (payload: string[]) => {dispatch(changeItemsAction(payload))}
})

type tPayloadType = MultiSelectFromLogicTypes;
type tPayload = any;
type tAction = {payload: tPayload, type: tPayloadType };

const clearSearchResult = (state: iMultiSelectFromState) => {
    const newState = {...state, visibleItems: state.items, displayed: ''}
    return newState;
}

const toString = (item: any) => {
    if (typeof item === 'string') {
        return item;
    } else {
        return item.toString();
    }
}

const search = (state: iMultiSelectFromState, payload: tAction) => {
    const filteredItems = state.items.filter((item:any) => {
        const asString = toString(item);
        const isFound = asString.toLowerCase().includes((payload as unknown as string).toLowerCase());
        return isFound;
    })
    const newState = { ...state, visibleItems: filteredItems, displayed: payload }
    return newState;
}

const close = (state: iMultiSelectFromState) => {
    const newState = { ...state, isSearchExpanded: false }
    return newState;
}

const open = (state: iMultiSelectFromState) => {
    const newState = { ...state, isSearchExpanded: true }
    return newState;
}

const changeItems = (state: iMultiSelectFromLogicArgs, payload: string[]) => {
    const newState = {...state, items: payload, visibleItems: payload};
    return newState;
}


const REDUCER = {
    // [MultiSelectFromLogicTypes.toggleSelection]: toggleSelection,
    [MultiSelectFromLogicTypes.open]: open,
    [MultiSelectFromLogicTypes.close]: close,
    [MultiSelectFromLogicTypes.search]: search,
    [MultiSelectFromLogicTypes.clearSearchResult]: clearSearchResult,
    [MultiSelectFromLogicTypes.changeItems]: changeItems,
}

export const reducer = getReducer<iMultiSelectFromState, string, tPayloadTypes>(REDUCER)

export const useMultiSelectFromLogic = ({keepFocusRef, isEnabled, dontLoseFocusRefs, items, defaultSelection=[], onSelected, onUnselected}: iMultiSelectFromLogicArgs) => {
    const initialState = {...getInitialState(), visibleItems: items, items, selected: defaultSelection}
    const [{
        isSearchExpanded,
        displayed,
        visibleItems,
    }, dispatch] = useReducer(reducer, initialState);
    const {open, close, search, clearSearchResult} = getSelectFromLogicActions(dispatch)
    const openIfEnabled = () => {if (isEnabled) open()}
    useEffect(() => {if (!isEnabled) close()}, [isEnabled])
    useOnEventLocationWithExceptions({targetReference: keepFocusRef, exceptionReferences: dontLoseFocusRefs, mouseEventName: 'mousedown', callback: () => {clearSearchResult(); close()} })
    const toggleSelection = (val: string) => {
            const isSelected = defaultSelection.includes(val)
            if (isSelected && onUnselected) { onUnselected(val);}
            else if (!isSelected && onSelected) { onSelected(val);}
    }
    return {
        isSearchListExpanded: isSearchExpanded,
        valueInTextBox: displayed,
        toggleSelection,
        clearSearchResult,
        search,
        close,
        open: openIfEnabled,
        selected: defaultSelection,
        visibleItems,
    }
}