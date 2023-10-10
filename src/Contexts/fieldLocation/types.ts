import { tColors } from "../../Data/types";

export interface iSizeData {
    width: number,
    height: number
}

export interface iLocationData extends iSizeData {
    top: number,
    left: number,
}
// export interface iCalculatePawnLocationArge {
//     index: number,
//     pawnDiameter: number,
//     color: tColors,
// }

export type tCalculatePawnLocation = (index: number, pawnDiameter: number, color: tColors) => iPoint;

export interface iPoint {x: number,y: number}

export type tNode = HTMLDivElement | HTMLElement

export type tLocationGetter = () => iLocationData;

export type tOptionalLocationGetter = undefined | tLocationGetter;

export type tLocationStorage = tOptionalLocationGetter[]

export type tGetLocationGetter = (index:number) => tLocationGetter;

export type tRegisterLocationGetter = (index: number, locationGetter: tLocationGetter) => void;

export type tRegisterCurrentReference = (node: tNode, index: number) => void;

export interface iFieldLocationGettersStorageAPI {
    getLocationGetter: tGetLocationGetter,
    registerCurrentReference: tRegisterCurrentReference,
    calculatePawnLocation: tCalculatePawnLocation,
}

export type tUseFieldLocationGettersStorage = () => iFieldLocationGettersStorageAPI

