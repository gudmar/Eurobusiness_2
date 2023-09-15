import { FC } from "react"
import { AMSTERDAM, ATENY, BARCELONA, BONN, BRUKSELA, CHANCE_BLUE, CHANCE_BLUE_BOTTOM, CHANCE_BLUE_LEFT, CHANCE_BLUE_RIGHT, CHANCE_RED, CHANCE_RED_BOTTOM, CHANCE_RED_RIGHT, CHANCE_RED_TOP, EAST_RAILWAYS, FRANKFURT, FREE_PARK, GLASGOW, GOTEBORG, GO_TO_JAIL, GUARDED_PARKING, INSBRUK, JAIL, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, NORTH_RAILWAYS, POWER_STATION, ROME, ROTTERDAM, SALONIKI, SEWILLA, SOUTH_RAILWAY, START, SZTOKHOLM, TAX, WATER_PLANT, WEST_RAILWAYS, WIEDEN } from "./const"

export type tCity = 'Amsterdam' | 'Ateny' |  'Barcelona' | 'Bonn' | 'Bruksela' | 'Frankfurt' | 'Glasgow' | 'Goteborg' | 'Insbruk' | 'Kolonia' | 'Liverpool' | 'London' | 'Madrit' | 'Malmo' | 'Mediolan' | 'Neapol' | 'Rome' | 'Rotterdam' | 'Saloniki' | 'Sewilla' | 'Sztokholm' | 'Wieden'

export type tEstateTypes =
    'City' |
    'Railway' |
    'Plant'

export type tVisitPayment = (number | '10 x thrown dice result' | '20 x thrown dice result')[]

export type tChanceTypes = {
    CHANCE_BLUE: 'chanceBlue',
    CHANCE_RED:  'chanceRed',
}

export type tOtherTypes =
    'Start' |
    'Jail' |
    'Free park' |
    'Go to jail' |
    'Tax' | 'Guarded Parking';

export type tCountries = 'Greece' | 'Italy' | 'Spain' | 'UK' | 'Benelux' | 'Sweeden' | 'RFN' | 'Austria' | 'Railways' | 'Plant'
export type tNonCountryFieldTypes = 'Railwaus' | 'Plant'

export interface iCityField {
    type: tEstateTypes,
    country: tCountries,
    price: number,
    mortage: number,
    housePrice: number,
    hotelPrice: number,
    visit: tVisitPayment,
    owner: string,
    nrOfHouses: number,
    color: string,
    // nrOfCitiesInCountry: number,
    // nrOfHousesToPurchase?: number,
    // nrOfHousesToSell?: number,
    // nrOfHotelsToSell?: number, 
    // nrOfHotelsToBuy?: number,
    // boardFieldNumber: number,
    isPlegded: boolean,
}

export interface iNamedCityField extends iCityField {
    name: string;
    index: number,
}

export type tIcon = FC;  // PRECISE this type,

export type tChanceType = 'Chance blue_bottom' | 'Chance blue_left' | 'Chance blue_right' | 'Chance_red_bottom' | 'Chance red_top' | 'Chance red_left' | 'Chance red' | 'Chance blue';

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

export type tNonCityEstates = 'Railways' | 'Plant';

export interface iNonCityEstates {
    country: tNonCityEstates,
    type: 'Railway' | 'Plant',
    price: number,
    mortage: number,
    visit: tVisitPayment,
    owner: string,
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
