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
}

export interface iSelectFromLogicArgs {
    focusRef: RefObject<HTMLInputElement>,
    blurRef:  RefObject<HTMLInputElement>,
    items: string[],
    defaultSelection: string[],
    onClick: tSelectFromStateHandler,
}

export interface iMultiSelectFromState {
    isSearchExpanded: boolean,
    selected: [],
    displayed: string,
    items: [],
    visibleItems: []
}

export type tSearchFromPayload = string;

export type tPayloadTypes = tSearchFromPayload | boolean | string | undefined
export type tSearchPayloadType = {visibleItems: string[], selected: string}

export enum MultiSelectFromLogicTypes {
    open = 'open',
    toggleSelection = 'toggle selection',
    close = 'close',
    search = 'search',
    clear = 'clear',
    clearSearchResult = 'clearSearchResult'
}

export type tToggleSelection = {
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
    clearSearchResult: () => {}
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
}

