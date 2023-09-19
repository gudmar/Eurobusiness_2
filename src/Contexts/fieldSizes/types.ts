import { BOTTOM } from "../../Components/Board/types";
import { tBoardFieldNames } from "../../Data/types";
import { tAction } from "../../Types/types";

export type tBoardFieldPosition = {
    top: number,
    left: number,
    width: number,
    height: number,
    name?: string,
}

export type tFieldUpdater = (arg0: tFieldSizesUpdatePayload) => void

// export type tUseRefOnDiv = typeof useRef<HTMLDivElement>(null);
export type tUseRefOnDiv = {current: HTMLDivElement};

export interface iFieldSizesUpdatePayload {
    fieldNameForDebugging?: tBoardFieldNames,
    fieldIndex: number,
    reference: tUseRefOnDiv;
    // reference: typeof useRef<HTMLDivElement>
}

export interface iStateDependingOnClientRect extends iFieldSizesUpdatePayload {
    state: tBoardDimensions,
}

export enum DimanetionsOperations {
    update
}

export type tShouldStateChange = {
    fieldIndex: number,
    state: tBoardDimensions,
    newSizes: tBoardFieldPosition
}


const X = 'x';
const Y = 'y'
const WIDTH = 'width'
const HEIGHT = 'height'
const TOP = 'top'
const RIGHT = 'right'
const LEFT = 'left';

export type tBoundingClientRectKeys = typeof X | typeof Y | typeof WIDTH | typeof HEIGHT | typeof TOP | typeof RIGHT | typeof BOTTOM | typeof LEFT

export type tBoundingClientRect = {
    [X]: number,
    [Y]: number,
    [WIDTH]: number,
    [HEIGHT]: number,
    [TOP]: number,
    [RIGHT]: number,
    [BOTTOM]: number,
    [LEFT]: number,
}

export type tFieldSizesUpdatePayload = {
    fieldNameForDebugging: tBoardFieldNames,
    reference: HTMLDivElement,
    fieldIndex: number,
}

export type tDimensionAction = tAction<DimanetionsOperations>

export type tBoardDimensions = tBoardFieldPosition[];

// export type tBoardDimensions = {
//     [START]: tBoardFieldPosition,
//     [ATENY]: tBoardFieldPosition,
//     [CHANCE_BLUE_RIGHT]: tBoardFieldPosition,
//     [CHANCE_BLUE_BOTTOM]: tBoardFieldPosition,
//     [CHANCE_BLUE_LEFT]: tBoardFieldPosition,
//     [CHANCE_RED_RIGHT]: tBoardFieldPosition,
//     [CHANCE_RED_BOTTOM]: tBoardFieldPosition,
//     [CHANCE_RED_TOP]: tBoardFieldPosition,
//     [SALONIKI]: tBoardFieldPosition,
//     [GUARDED_PARKING]: tBoardFieldPosition,
//     [FREE_PARK]: tBoardFieldPosition,
//     [JAIL]: tBoardFieldPosition,
//     [GO_TO_JAIL]: tBoardFieldPosition,
//     [SOUTH_RAILWAY]: tBoardFieldPosition,
//     [NEAPOL]:    tBoardFieldPosition,
//     [MEDIOLAN]:  tBoardFieldPosition,
//     [ROME]:      tBoardFieldPosition,
//     [BARCELONA]: tBoardFieldPosition,
//     [POWER_STATION]: tBoardFieldPosition,
//     [SEWILLA]: tBoardFieldPosition,
//     [MADRIT]:  tBoardFieldPosition,
//     [WEST_RAILWAYS]: tBoardFieldPosition,
//     [LIVERPOOL]: tBoardFieldPosition,
//     [GLASGOW]:   tBoardFieldPosition,
//     [LONDON]:    tBoardFieldPosition,
//     [ROTTERDAM]: tBoardFieldPosition,
//     [BRUKSELA]:  tBoardFieldPosition,
//     [AMSTERDAM]: tBoardFieldPosition,
//     [NORTH_RAILWAYS]: tBoardFieldPosition,
//     [MALMO]: tBoardFieldPosition,
//     [GOTEBORG]: tBoardFieldPosition,
//     [WATER_PLANT]: tBoardFieldPosition,
//     [SZTOKHOLM]: tBoardFieldPosition,
//     [FRANKFURT]: tBoardFieldPosition,
//     [KOLONIA]:   tBoardFieldPosition,
//     [BONN]:      tBoardFieldPosition,
//     [EAST_RAILWAYS]: tBoardFieldPosition,
//     [INSBRUK]: tBoardFieldPosition,
//     [TAX]: tBoardFieldPosition,
//     [WIEDEN]: tBoardFieldPosition,
// }
