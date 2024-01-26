import { BANK } from "../../../Data/const";
import { tColors, tEstateTypes } from "../../../Data/types";
import { tEstateField } from "../../../Logic/boardTypes";

export type tEditEstate = {selectedEstate: tSelectedEstate}

export type tSelectedEstate = tEstateField | null;
export type tSetSelectEstateFunction = (estate: tSelectedEstate) => void


export type tEstateArgs = {
    estate: tEstateField,
    selectedEstateName: string,
    setSelectEstate: tSetSelectEstateFunction,
}

export type tGetEstateClassesArgs = {
    type: tEstateTypes, isSelected: boolean, classes: {[key:string]: string}
}

export interface iEditEstateArgs {
    estates: tEstateField[],
    selectedEstate: tSelectedEstate,
    setSelectEstate: tSetSelectEstateFunction,
}
