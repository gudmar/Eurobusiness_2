import { tChanceType, tColors, tCountries, tEstateTypes, tIcon, tOtherTypes, tOwner, tVisitPayment } from "../Data/types";
import { ChanceField, CityField, NonCityEstatesField, OtherFieldTypesField } from "./FieldCreators";

export type tEstateCreateors = CityField | NonCityEstatesField;

export type tField = CityField | NonCityEstatesField | OtherFieldTypesField | ChanceField
export type tFieldState = iCityFieldState | iNonCityEstatesFieldState | iOtherFieldTypesFieldState | iChanceFieldState

export const isCityFieldState = (field: tFieldState): field is iCityFieldState => {
    return (field as iCityFieldState).housePrice !== undefined
}

export const isNonCityEstatesFieldState = (field: tFieldState): field is iNonCityEstatesFieldState => {
    const isOwner = (field as iCityFieldState | iNonCityEstatesFieldState).owner !== undefined;
    const isHousePrice = (field as iCityFieldState).housePrice !== undefined;
    if (isOwner && !isHousePrice) return true;
    return false
}

export type tEstateField = CityField | NonCityEstatesField

export interface iChanceFieldState {
    type: tChanceType;
    name: string;
    Icon: tIcon;
    index: number;
}

export interface iChanceField extends iChanceFieldState {
    info: string;
    icon: tIcon;
    index: number;
    state: iChanceFieldState
}

export interface iOtherFieldTypesFieldState {
    name: string,
    type: tOtherTypes,
    Icon: tIcon,
    visit?: tVisitPayment,
    wait: number,
    index: number,
}

export type iFieldState = iCityFieldState | iNonCityEstatesFieldState | iChanceFieldState | iOtherFieldTypesFieldState

export interface iOtherFieldTypesField extends iOtherFieldTypesFieldState{
    Icon: tIcon,
}

export interface iNonCityEstatesFieldState {
    type: tEstateTypes,
    country: tCountries,
    price: number,
    mortgage: number,
    visit: tVisitPayment,
    owner: tOwner,
    isPlegded: boolean,
    Icon: tIcon,
    name: string,
    index: number
}

export interface iNonCityEstatesField extends iNonCityEstatesFieldState {
}

export interface iCityFieldState {
    name: string,
    type: tEstateTypes,
    country: tCountries,
    price: number
    mortgage: number,
    housePrice: number,
    hotelPrice: number,
    visit: tVisitPayment,
    owner: tOwner,
    nrOfHouses: number,
    nrOfHotels: number,
    isPlegded: boolean,
    color: string,
    index: number,
}

export interface iCityFieldClass extends iCityFieldState {

}

export interface iBoardCaretaker {
    registerField(fieldInstance: any): void,
    getFieldByName(name: string): tField | undefined,
    getPlayersEstates(playerColor: tColors): tEstateField[],
    getNrPlayerHouses(playerColor: tColors): number,
    getNrPlayerHotels(playerColor: tColors): number,
}
