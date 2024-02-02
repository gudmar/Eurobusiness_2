import { FC } from "react"
import { tCombineStringUnions } from "../Types/types"
import { AMSTERDAM, ATENY, AUSTRIA, BANK, BARCELONA, BENELUX, BLUE, BONN, BRUKSELA, CHANCE_BLUE, CHANCE_BLUE_BOTTOM, CHANCE_BLUE_LEFT, CHANCE_BLUE_RIGHT, CHANCE_RED, CHANCE_RED_BOTTOM, CHANCE_RED_RIGHT, CHANCE_RED_TOP, CITY, EAST_RAILWAYS, FRANKFURT, FREE_PARK, GLASGOW, GOTEBORG, GO_TO_JAIL, GREECE, GREEN, GUARDED_PARKING, INSBRUK, ITALY, JAIL, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, NORTH_RAILWAYS, PLANT, POWER_STATION, RAILWAY, RAILWAYS, RED, RFN, ROME, ROTTERDAM, SALONIKI, SEWILLA, SOUTH_RAILWAY, SPAIN, START, SWEEDEN, SZTOKHOLM, TAX, THROW_10, THROW_20, UK, WATER_PLANT, WEST_RAILWAYS, WIEDEN, YELLOW } from "./const"

export type tColors = typeof YELLOW | typeof RED | typeof BLUE | typeof GREEN

export type tOwner = tColors | typeof BANK

export type tBoardFieldNames = tCity | tOtherTypes | tChanceFieldNameType | tRailway | typeof POWER_STATION | typeof WATER_PLANT

export type tCity = typeof AMSTERDAM | typeof ATENY |  typeof BARCELONA | typeof BONN | typeof BRUKSELA | typeof FRANKFURT | typeof GLASGOW | typeof GOTEBORG | typeof INSBRUK | typeof KOLONIA | typeof LIVERPOOL | typeof LONDON | typeof MADRIT | typeof MALMO | typeof MEDIOLAN | typeof NEAPOL | typeof ROME | typeof ROTTERDAM | typeof SALONIKI | typeof SEWILLA | typeof SZTOKHOLM | typeof WIEDEN

export type tEstateTypes =
    typeof CITY |
    typeof RAILWAY |
    typeof PLANT

export type tVisitPayment = (number[] | [typeof THROW_10 , typeof THROW_20])

export type tChanceTypes = {
    CHANCE_BLUE: 'chanceBlue',
    CHANCE_RED:  'chanceRed',
}

export type tRailway = typeof SOUTH_RAILWAY | typeof WEST_RAILWAYS | typeof EAST_RAILWAYS | typeof NORTH_RAILWAYS

export type tOtherTypes =
    typeof START |
    typeof JAIL |
    typeof FREE_PARK |
    typeof GO_TO_JAIL |
    typeof TAX | typeof GUARDED_PARKING;

export type tCountries = typeof GREECE | typeof ITALY | typeof SPAIN | typeof UK | typeof BENELUX | typeof SWEEDEN | typeof RFN | typeof AUSTRIA | typeof RAILWAYS | typeof PLANT
export type tNonCountryFieldTypes = typeof RAILWAYS | typeof PLANT

export interface iCityField {
    type: tEstateTypes,
    country: tCountries,
    price: number,
    mortgage: number,
    housePrice: number,
    hotelPrice: number,
    visit: tVisitPayment,
    owner: tOwner,
    color: string,
    nrOfHouses: number,
    nrOfHotels: number,

    isPlegded: boolean,
}

export interface iNamedCityField extends iCityField {
    name: string;
    index: number,
}

export type tIcon = FC;  // PRECISE this type,

export type tChanceType = typeof CHANCE_BLUE_BOTTOM | typeof CHANCE_BLUE_LEFT | typeof CHANCE_BLUE_RIGHT | typeof CHANCE_RED_BOTTOM | typeof CHANCE_RED_TOP | typeof CHANCE_RED_TOP | typeof CHANCE_RED | typeof CHANCE_BLUE;

export type tChanceFieldNameType = typeof CHANCE_BLUE_BOTTOM | typeof CHANCE_BLUE_LEFT | typeof CHANCE_BLUE_RIGHT | typeof CHANCE_RED_BOTTOM | typeof CHANCE_RED_TOP | typeof CHANCE_RED_TOP

export type tFieldTypes =  tCity | tNonCityEstates | tOtherTypes | tChanceType ;
export type tFlattenedFieldTypes = tCombineStringUnions<tFieldTypes> 

export type tAnyState = iNamedChance | iNamedCityField | iNamedNonCityEstates | iNamedOtherField

export interface iChance {
    type: tChanceType,
    info: string,
    Icon: tIcon,
}

export interface iNamedChance extends iChance {
    name: string;
    index: number
}

export interface iOtherFieldTypes {
    type: tOtherTypes,
    visit?: tVisitPayment,
    info: string,
    wait?: number,
    Icon: tIcon,
}

export interface iNamedOtherField extends iOtherFieldTypes {
    name:string;
    index: number
}

export type tNonCityEstates = tNonCountryFieldTypes;

export interface iNonCityEstates {
    country: tNonCityEstates,
    type: typeof RAILWAY | typeof PLANT,
    price: number,
    mortgage: number,
    visit: tVisitPayment,
    owner: tOwner,
    isPlegded: boolean,
    Icon: FC,
}

export interface iNamedNonCityEstates extends iNonCityEstates {
    name: string,
    index: number
}

export type tBoardField = iOtherFieldTypes | iCityField | iChance | iNonCityEstates

export type tNamedBoardField = iNamedOtherField | iNamedCityField | iNamedChance | iNamedNonCityEstates;



export type tBoard = {
    [START]: iOtherFieldTypes,
    [ATENY]: iCityField,
    [CHANCE_BLUE_RIGHT]: iChance,
    [CHANCE_BLUE_BOTTOM]: iChance,
    [CHANCE_BLUE_LEFT]: iChance,
    [CHANCE_RED_RIGHT]: iChance,
    [CHANCE_RED_BOTTOM]: iChance,
    [CHANCE_RED_TOP]: iChance,
    [SALONIKI]: iCityField,
    [GUARDED_PARKING]: iOtherFieldTypes,
    [FREE_PARK]: iOtherFieldTypes,
    [JAIL]: iOtherFieldTypes,
    [GO_TO_JAIL]: iOtherFieldTypes,
    [SOUTH_RAILWAY]: iNonCityEstates,
    [NEAPOL]: iCityField,
    [MEDIOLAN]: iCityField,
    [ROME]: iCityField,
    [BARCELONA]: iCityField,
    [POWER_STATION]: iNonCityEstates,
    [SEWILLA]: iCityField,
    [MADRIT]:iCityField,
    [WEST_RAILWAYS]: iNonCityEstates,
    [LIVERPOOL]: iCityField,
    [GLASGOW]: iCityField,
    [LONDON]: iCityField,
    [ROTTERDAM]: iCityField,
    [BRUKSELA]: iCityField,
    [AMSTERDAM]: iCityField,
    [NORTH_RAILWAYS]: iNonCityEstates,
    [MALMO]: iCityField,
    [GOTEBORG]: iCityField,
    [WATER_PLANT]: iNonCityEstates,
    [SZTOKHOLM]: iCityField,
    [FRANKFURT]: iCityField,
    [KOLONIA]: iCityField,
    [BONN]: iCityField,
    [EAST_RAILWAYS]: iNonCityEstates,
    [INSBRUK]: iCityField,
    [TAX]: iOtherFieldTypes,
    [WIEDEN]: iCityField,
}
