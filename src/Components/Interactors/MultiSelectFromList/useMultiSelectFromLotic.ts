import { useEffect, useReducer } from "react";
import { getReducer } from "../../../Functions/reducer";
import { useOnEventLocationWithExceptions } from "../../../hooks/useOnOutsideInsideElement";
import { iMultiSelectFromLogicArgs, iMultiSelectFromState, MultiSelectFromLogicTypes, tActions, tClear, tClearSearchResult, tClose, tOpen, tPayloadTypes } from "./types";

const getInitialState = (): iMultiSelectFromState => ({
    isSearchExpanded: false,
    selected: [],
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

const getArrayWithRemovedIndex = (arr: unknown[], index: number) => {
    const newArr = arr.reduce((acc: unknown[], item: unknown, i: number) => {
        if (index !== i) acc.push(item);
        return acc;
    }, [])
    return newArr;
}

const toggleSelection = (state: iMultiSelectFromState, payload: tAction) => {
    const findInArray = (arr: any[]) => {
        const result = arr.findIndex((item: any) => {
            const asString = toString(item);
            const result = asString === payload;
            return result;
        })
        return result;
    }
    const targetIndexInSelected = findInArray(state.selected);
    const targetIndexInItems = findInArray(state.items);
    const getNewSelection = () => {
        if (targetIndexInSelected === -1) {
            return [...state.selected, state.items[targetIndexInItems]]
        } else {
            const newSelected = getArrayWithRemovedIndex(state.selected, targetIndexInSelected)
            return newSelected;
        }
    }
    const newSelectoin = getNewSelection();
    const newState = {...state, selected: newSelectoin};
    return newState
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
    [MultiSelectFromLogicTypes.toggleSelection]: toggleSelection,
    [MultiSelectFromLogicTypes.open]: open,
    [MultiSelectFromLogicTypes.close]: close,
    [MultiSelectFromLogicTypes.search]: search,
    [MultiSelectFromLogicTypes.clearSearchResult]: clearSearchResult,
    [MultiSelectFromLogicTypes.changeItems]: changeItems,
}

export const reducer = getReducer<iMultiSelectFromState, string, tPayloadTypes>(REDUCER)

export const useMultiSelectFromLogic = ({keepFocusRef, dontLoseFocusRefs, items, defaultSelection=[], onSelected, onUnselected}: iMultiSelectFromLogicArgs) => {
    console.log('default selection in hook', defaultSelection)
    const initialState = {...getInitialState(), visibleItems: items, items, selected: defaultSelection}
    console.log(initialState)
    const [{
        isSearchExpanded,
        selected,
        displayed,
        visibleItems,
    }, dispatch] = useReducer(reducer, initialState);
    console.log('selection in hook after using useReducer', selected)
    const {open, close, search, clearSearchResult} = getSelectFromLogicActions(dispatch)
    useOnEventLocationWithExceptions({targetReference: keepFocusRef, exceptionReferences: dontLoseFocusRefs, mouseEventName: 'mousedown', callback: () => {clearSearchResult(); close()} })
    const toggleSelection = (val: string) => {
            const isSelected = selected.includes(val);
            if (isSelected && onUnselected) { onUnselected(val);}
            else if (!isSelected && onSelected) { onSelected(val);}
    }
    console.log('Selected after toggle', selected)
    return {
        isSearchListExpanded: isSearchExpanded,
        valueInTextBox: displayed,
        toggleSelection,
        clearSearchResult,
        search,
        close,
        open,
        selected: defaultSelection,
        visibleItems,
    }
}