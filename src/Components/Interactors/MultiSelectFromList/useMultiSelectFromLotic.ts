import { useReducer } from "react";
import { getReducer } from "../../../Functions/reducer";
import { useInvoceIfEventOutsideElement } from "../../../hooks/useOnOutsideInsideElement";
import { iMultiSelectFromState, iSelectFromLogicArgs, MultiSelectFromLogicTypes, tActions, tClear, tClearSearchResult, tClose, tOpen, tPayloadTypes } from "./types";

export const initialState: iMultiSelectFromState = {
    isSearchExpanded: false,
    selected: [],
    displayed: '',
    items: [],
    visibleItems: []
}

const openAction: () => tOpen = () => ({type: MultiSelectFromLogicTypes.open})
const closeAction: () => tClose = () => ({type: MultiSelectFromLogicTypes.close})
const clearAction: () => tClear = () => ({type: MultiSelectFromLogicTypes.clear})
const clearSearchResultAction: () => tClearSearchResult = () => ({type: MultiSelectFromLogicTypes.clearSearchResult});
const toggleSelectionAction = function( payload: string ) { return {type: MultiSelectFromLogicTypes.toggleSelection, payload} };
const searchAction = ( payload: string ) => ({type: MultiSelectFromLogicTypes.search, payload})

export const getSelectFromLogicActions = (dispatch: (arg: tActions) => void) => ({
    open:  () => dispatch(openAction()),
    close: () => dispatch(closeAction()),
    clear: () => dispatch(clearAction()),
    toggleSelection: (payload: string) => {dispatch(toggleSelectionAction(payload))},
    search: (payload: string) => {dispatch(searchAction(payload))},
    clearSearchResult: () => {dispatch(clearSearchResultAction())},
})

type tPayloadType = MultiSelectFromLogicTypes;
type tPayload = any;
type tAction = {payload: tPayload, type: tPayloadType };

const clearSearchResult = (state: iMultiSelectFromState) => {
    const newState = {...state, visbleItems: state.items}
    return newState;
}

const toString = (item: any) => {
    if (typeof item === 'string') {
        return item;
    } else {
        return item.toString();
    }
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
    const targetIndexInSelected = findInArray(state.visibleItems);
    const targetIndexInItems = findInArray(state.items);
    const getNewSelection = () => {
        if (targetIndexInSelected === -1) {
            return [...state.selected, state.items[targetIndexInItems]]
        } else {
            state.selected.splice(targetIndexInSelected, 1);
            return state.selected;
        }
    }
    const newSelectoin = getNewSelection();
    return {...state, selection: newSelectoin}
}

const search = (state: iMultiSelectFromState, payload: tAction) => {
    const filteredItems = state.items.filter((item:any) => {
        const asString = toString(item);
        const isFound = asString.toLowerCase().includes((payload as unknown as string).toLowerCase());
        console.log(asString, payload, asString === payload)
        return isFound;
    })
    console.log(payload)
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

const clear = (state: iMultiSelectFromState ) => {
    const newState = {...state, selected: [], dispalyed: [], visibleItems: state.items, }
    return newState;
}

const REDUCER = {
    [MultiSelectFromLogicTypes.toggleSelection]: toggleSelection,
    [MultiSelectFromLogicTypes.clear]: clear,
    [MultiSelectFromLogicTypes.open]: open,
    [MultiSelectFromLogicTypes.close]: close,
    [MultiSelectFromLogicTypes.search]: search,
    [MultiSelectFromLogicTypes.clearSearchResult]: clearSearchResult,
}

export const reducer = getReducer<iMultiSelectFromState, string, tPayloadTypes>(REDUCER)


export const useMultiSelectFromLogic = ({blurRef, items, defaultSelection=[], onClick}: iSelectFromLogicArgs) => {
    const [{
        isSearchExpanded,
        selected,
        displayed,
        visibleItems,
    }, dispatch] = useReducer(reducer, {...initialState, visibleItems: items, items, selected: defaultSelection});
    const {open, clear, close, search, toggleSelection, clearSearchResult} = getSelectFromLogicActions(dispatch)
    useInvoceIfEventOutsideElement({reference: blurRef, mouseEventName: 'mousedown', callback: (() => {clearSearchResult(); close()}) });
    return {
        isSearchListExpanded: isSearchExpanded,
        valueInTextBox: displayed,
        selectItem: toggleSelection,
        clearSelection: clear,
        search,
        close,
        open,
        selected,
        visibleItems,
    }
}