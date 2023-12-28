import { RefObject } from "react";

export type tSelectFromStateHandler = (val: string) => void

export interface iItemProps {
    value: string,
    selectedValues: any[],
    toggleSelection: tSelectItem,
}

export type tSelectItem = (value: string) => void;

export interface iSelectFromListProps {
    items: string[],
    defaultValues?: string[],
    label: string,
    id?: string,
    onClick: tSelectFromStateHandler,
    onSelected?: tSelectItem,
    onUnselected?: tSelectItem,
}

export interface iMultiSelectFromLogicArgs {
    keepFocusRef: RefObject<HTMLInputElement>,
    dontLoseFocusRefs:  RefObject<HTMLInputElement>[],
    items: string[],
    defaultSelection: string[],
    onSelected?: tSelectFromStateHandler,
    onUnselected?: tSelectFromStateHandler,
}

export interface iMultiSelectFromState {
    isSearchExpanded: boolean,
    selected: [],
    displayed: string,
    items: [],
    visibleItems: []
}

export type tSearchFromPayload = string;

export type tPayloadTypes = tSearchFromPayload | boolean | string | undefined | string[]
export type tSearchPayloadType = {visibleItems: string[], selected: string}

export enum MultiSelectFromLogicTypes {
    open = 'open',
    toggleSelection = 'toggle selection',
    close = 'close',
    search = 'search',
    clear = 'clear',
    clearSearchResult = 'clearSearchResult',
    changeItems = 'change items'
}

export type tToggleSelection = {
    type: MultiSelectFromLogicTypes.toggleSelection,
    payload: string
}
export type tChangeItems = {
    type: MultiSelectFromLogicTypes.toggleSelection,
    payload: string
}

export type tOpen = {
    type: MultiSelectFromLogicTypes.open,
}
export type tSearch = {
    type: MultiSelectFromLogicTypes.search,
    payload: string
}
export type tClose = {
    type: MultiSelectFromLogicTypes.close
}
export type tClear = {
    type: MultiSelectFromLogicTypes.clear
}

export type tClearSearchResult = {
    type: MultiSelectFromLogicTypes.clearSearchResult
}

export type tGetMultiSelectFromLogicActions = (dispatch: (arg: tActions) => {}) => {
    open: () => {},
    close: () => {},
    toggleSelection: (payload: string) => {},
    search: (payload: string) => {},
    clear: () => {},
    clearSearchResult: () => {},
    changeItems: (payload: string[]) => {}
}

export type tActions = {
    type: MultiSelectFromLogicTypes.toggleSelection,
    payload: string
} | {
    type: MultiSelectFromLogicTypes.open,
} | {
    type: MultiSelectFromLogicTypes.search,
    payload: string
} | { 
    type: MultiSelectFromLogicTypes.close
} | { 
    type: MultiSelectFromLogicTypes.clear
} | {
    type: MultiSelectFromLogicTypes.clearSearchResult
} | {
    type: MultiSelectFromLogicTypes.changeItems,
    payload: string[]
}

export interface iTagProps {
    value: string, toggleSelection: (value: string) => void 
}

