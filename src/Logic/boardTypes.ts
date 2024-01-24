import { tPlayerName } from "../Components/Pawns/types";
import { tChanceType, tColors, tCountries, tEstateTypes, tIcon, tOtherTypes, tVisitPayment } from "../Data/types";
import { ChanceField, CityField, NonCityEstatesField, OtherFieldTypesField } from "./FieldCreators";

export type tEstateCreateors = CityField | NonCityEstatesField;

export type tField = CityField | NonCityEstatesField | OtherFieldTypesField | ChanceField

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

export interface iOtherFieldTypesField extends iOtherFieldTypesFieldState{
    Icon: tIcon,
}

export interface iNonCityEstatesFieldState {
    type: tEstateTypes,
    country: tCountries,
    price: number,
    mortgage: number,
    visit: tVisitPayment,
    owner: string,
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
    owner: string,
    nrOfHouses: number,
    isPlegded: boolean,
    color: string,
    index: number,
}

export interface iCityFieldClass extends iCityFieldState {

}

export interface iBoardCaretaker {
    registerField(fieldInstance: any): void,
    getFieldByName(name: string): tField | undefined,
    getPlayersEstates(playerColor: tColors): tField[],
    getNrPlayerHouses(playerColor: tColors): number,
    getNrPlayerHotels(playerColor: tColors): number,
}
