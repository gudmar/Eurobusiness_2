import { OptionTypes } from "../../Logic/Journalist/types";
import { tObject } from "../../Logic/types";

export type tActionType = {
    payload?: any,
    type: OptionTypes,
}

export type tEstate = {
    name: string,
    reason?: string,
    actions?: tActionType[]
};

export type tEstateProps = {
    estate: tEstate,
    isOpen: boolean,
}

export type tEstatesProps = {estates: tEstate[]}

export type iSingleCountryProps = {
    country: tObject<any>,
    countryName: string,
}
