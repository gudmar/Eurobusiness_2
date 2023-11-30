import { RefObject } from "react";

export type tSelectFromStateHandler = (val: string) => void

export interface iItemProps {
    value: string,
    selectedValue: string,
    select: tSelectItem,
}

export type tSelectItem = (value: string) => void;

export interface iSelectFromListProps {
    items: string[],
    defaultValue?: string,
    label: string,
    id?: string,
    onClick: tSelectFromStateHandler,
}

export interface iSelectFromLogicArgs {
    textBoxReference: RefObject<HTMLInputElement>,
    items: string[],
    defaultSelection: string,
    onClick: tSelectFromStateHandler,
}

export interface iSearchFromState {
    isSearchExpanded: boolean,
    selected: string,
    displayed: '',
    items: [],
    visibleItems: []
}

export type tSearchFromPayload = string;

export type tPayloadTypes1 = tSearchFromPayload | boolean | string | undefined
export type tSearchPayloadType = {visibleItems: string[], selected: string}

export enum SelectFromLogicTypes {
    open = 'open',
    select = 'select',
    close = 'close',
    search = 'search',
    clear = 'clear',
    clearSearchResult = 'clearSearchResult'
}

export type tSelect = {
    type: SelectFromLogicTypes.select,
    payload: string
}
export type tOpen = {
    type: SelectFromLogicTypes.open,
}
export type tSearch = {
    type: SelectFromLogicTypes.search,
    payload: string
}
export type tClose = {
    type: SelectFromLogicTypes.close
}
export type tClear = {
    type: SelectFromLogicTypes.clear
}

export type tClearSearchResult = {
    type: SelectFromLogicTypes.clearSearchResult
}

export type tGetSelectFromLogicActions = (dispatch: (arg: tActions) => {}) => {
    open: () => {},
    close: () => {},
    select: (payload: string) => {},
    search: (payload: string) => {},
}

export type tActions = {
    type: SelectFromLogicTypes.select,
    payload: string
} | {
    type: SelectFromLogicTypes.open,
} | {
    type: SelectFromLogicTypes.search,
    payload: string
} | { 
    type: SelectFromLogicTypes.close
} | { 
    type: SelectFromLogicTypes.clear
} | {
    type: SelectFromLogicTypes.clearSearchResult
}

