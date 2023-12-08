import { useReducer } from "react";
import { getReducer } from "../../../Functions/reducer";
import { useOnEventLocationWithExceptions } from "../../../hooks/useOnOutsideInsideElement";
import { iMultiSelectFromLogicArgs, iMultiSelectFromState, MultiSelectFromLogicTypes, tActions, tClear, tClearSearchResult, tClose, tOpen, tPayloadTypes } from "./types";

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

const toggleSelection = (state: iMultiSelectFromState, payload: tAction) => {
    throw new Error('Unselect does not work')
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
            state.selected.splice(targetIndexInSelected, 1);
            console.log(targetIndexInSelected, state)
            return state.selected;
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
    console.log(payload, state)
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

// const clearSelection = (state: iMultiSelectFromState ) => {
//     const newState = {...state, selected: [], dispalyed: '', visibleItems: state.items, }
//     return newState;
// }

const clear = (state: iMultiSelectFromState ) => {
    const newState = {...state, dispalyed: '', visibleItems: state.items, }
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


export const useMultiSelectFromLogic = ({keepFocusRef, dontLoseFocusRefs, items, defaultSelection=[], onClick}: iMultiSelectFromLogicArgs) => {
    const [{
        isSearchExpanded,
        selected,
        displayed,

        visibleItems,
    }, dispatch] = useReducer(reducer, {...initialState, visibleItems: items, items, selected: defaultSelection});
    const {open, clear, close, search, toggleSelection, clearSearchResult} = getSelectFromLogicActions(dispatch)
    useOnEventLocationWithExceptions({targetReference: keepFocusRef, exceptionReferences: dontLoseFocusRefs, mouseEventName: 'mousedown', callback: () => {clearSearchResult(); close()} })
    return {
        isSearchListExpanded: isSearchExpanded,
        valueInTextBox: displayed,
        selectItem: toggleSelection,
        clearSelection: clear,
        clearSearchResult,
        search,
        close,
        open,
        selected,
        visibleItems,
    }
}