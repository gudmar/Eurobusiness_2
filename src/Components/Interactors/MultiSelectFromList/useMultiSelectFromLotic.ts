import { useReducer } from "react";
import { getReducer } from "../../../Functions/reducer";
import { REDUCER } from "../../../hooks/useEditPlayer/utils";
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

export const reducer = getReducer<iSearchFromState, string, tPayloadTypes1>(REDUCER)


export const useMultiSelectFromLogic = ({focusRef, blurRef, items, defaultSelection, onClick}: iSelectFromLogicArgs) => {    
    const [{
        isSearchExpanded,
        selected,
        displayed,
        visibleItems,
    }, dispatch] = useReducer(reducer, {...initialState, visibleItems: items, items, selected: defaultSelection, displayed: defaultSelection});
    const {open, clear, close, search, select, clearSearchResult} = getSelectFromLogicActions(dispatch)
    // useOnBlur(blurRef, () => {clearSearchResult()})
    useInvoceIfEventOutsideElement({reference: blurRef, mouseEventName: 'click', callback: clearSearchResult})
    useOnFocusin(blurRef, () => {open()})
    // useEffect(()=> console.log(textBoxReference), [])
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