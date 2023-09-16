import { useRef } from "react";
import { AMSTERDAM, ATENY, BARCELONA, BONN, BRUKSELA, CHANCE_BLUE_BOTTOM, CHANCE_BLUE_LEFT, CHANCE_BLUE_RIGHT, CHANCE_RED_BOTTOM, CHANCE_RED_RIGHT, CHANCE_RED_TOP, EAST_RAILWAYS, FRANKFURT, FREE_PARK, GLASGOW, GOTEBORG, GO_TO_JAIL, GUARDED_PARKING, INSBRUK, JAIL, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, NORTH_RAILWAYS, POWER_STATION, ROME, ROTTERDAM, SALONIKI, SEWILLA, SOUTH_RAILWAY, START, SZTOKHOLM, TAX, WATER_PLANT, WEST_RAILWAYS, WIEDEN } from "../../Data/const";
import { tAction } from "../../Types/types";

export type tBoardFieldPosition = {
    top: number,
    left: number,
    width: number,
    height: number,
}

export type tUseRefOnDiv = typeof useRef<HTMLDivElement>;

export enum DimanetionsOperations {
    update
}

export type tBoundingClientRect = {
    x: number,
    y: number,
    width: number,
    height: number,
    top: number,
    right: number,
    buttom: number,
    left: number,
}

export type tDimensionAction = tAction<DimanetionsOperations>

export type tBoardDimensions = {
    [START]: tBoardFieldPosition,
    [ATENY]: tBoardFieldPosition,
    [CHANCE_BLUE_RIGHT]: tBoardFieldPosition,
    [CHANCE_BLUE_BOTTOM]: tBoardFieldPosition,
    [CHANCE_BLUE_LEFT]: tBoardFieldPosition,
    [CHANCE_RED_RIGHT]: tBoardFieldPosition,
    [CHANCE_RED_BOTTOM]: tBoardFieldPosition,
    [CHANCE_RED_TOP]: tBoardFieldPosition,
    [SALONIKI]: tBoardFieldPosition,
    [GUARDED_PARKING]: tBoardFieldPosition,
    [FREE_PARK]: tBoardFieldPosition,
    [JAIL]: tBoardFieldPosition,
    [GO_TO_JAIL]: tBoardFieldPosition,
    [SOUTH_RAILWAY]: tBoardFieldPosition,
    [NEAPOL]:    tBoardFieldPosition,
    [MEDIOLAN]:  tBoardFieldPosition,
    [ROME]:      tBoardFieldPosition,
    [BARCELONA]: tBoardFieldPosition,
    [POWER_STATION]: tBoardFieldPosition,
    [SEWILLA]: tBoardFieldPosition,
    [MADRIT]:  tBoardFieldPosition,
    [WEST_RAILWAYS]: tBoardFieldPosition,
    [LIVERPOOL]: tBoardFieldPosition,
    [GLASGOW]:   tBoardFieldPosition,
    [LONDON]:    tBoardFieldPosition,
    [ROTTERDAM]: tBoardFieldPosition,
    [BRUKSELA]:  tBoardFieldPosition,
    [AMSTERDAM]: tBoardFieldPosition,
    [NORTH_RAILWAYS]: tBoardFieldPosition,
    [MALMO]: tBoardFieldPosition,
    [GOTEBORG]: tBoardFieldPosition,
    [WATER_PLANT]: tBoardFieldPosition,
    [SZTOKHOLM]: tBoardFieldPosition,
    [FRANKFURT]: tBoardFieldPosition,
    [KOLONIA]:   tBoardFieldPosition,
    [BONN]:      tBoardFieldPosition,
    [EAST_RAILWAYS]: tBoardFieldPosition,
    [INSBRUK]: tBoardFieldPosition,
    [TAX]: tBoardFieldPosition,
    [WIEDEN]: tBoardFieldPosition,
}
