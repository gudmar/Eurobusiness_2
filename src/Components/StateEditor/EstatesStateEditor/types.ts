import { BANK } from "../../../Data/const";
import { tColors, tEstateTypes, tOwner } from "../../../Data/types";
import { tEstateField } from "../../../Logic/boardTypes";
import { tSelectedEstate } from "../../../Types/types";

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

type tEstateFieldType = any;

export type tEstatesTestFieldEditArgs = {
    title: string,
    value: tEstateFieldType, 
    handler?: (val: tEstateFieldType) => void,
    nrOfHouses: number,
    nrOfHotels: number,
    owner: tOwner,
    isPlegeded: boolean,
}

