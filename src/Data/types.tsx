import { AMSTERDAM, ATENY, BARCELONA, BONN, BRUKSELA, CHANCE_BLUE, CHANCE_RED, EAST_RAILWAYS, FRANKFURT, FREE_PARK, GLASGOW, GOTEBORG, GO_TO_JAIL, GUARDED_PARKING, INSBRUK, JAIL, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, NORTH_RAILWAYS, POWER_STATION, ROME, ROTTERDAM, SALONIKI, SEWILLA, SOUTH_RAILWAY, START, SZTOKHOLM, TAX, WATER_PLANT, WEST_RAILWAYS, WIEDEN } from "./const"

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
}

export type tIcon = any;  // PRECISE this type,

export type tChanceType = 'Chance blue' | 'Chance red';

export interface iChance {
    type: tChanceType,
    info: string,
    icon: tIcon,
}

export interface iNamedChance extends iChance {
    name: string;
}

export interface iOtherFieldTypes {
    type: tOtherTypes,
    visit?: tVisitPayment,
    info: string,
    wait?: number,
    icon: tIcon,
}

export interface iNamedOtherField extends iOtherFieldTypes {
    name:string;
}

export interface iNonCityEstates {
    country: 'Railways' | 'Plant',
    type: 'Railway' | 'Plant',
    price: number,
    mortage: number,
    visit: tVisitPayment,
    owner: string,
    isPlegded: boolean,
    icon: tIcon,
}

export interface iNamedNonCityEstates extends iNonCityEstates {
    name: string
}

export type tBoardField = iOtherFieldTypes | iCityField | iChance | iNonCityEstates

export type tNamedBoardField = iNamedOtherField | iNamedCityField | iNamedChance | iNamedNonCityEstates;

export type tBoard = {
    [START]: iOtherFieldTypes,
    [ATENY]: iCityField,
    [CHANCE_BLUE]: iChance,
    [CHANCE_RED]: iChance,
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

console.warn('Precise type of icon');


