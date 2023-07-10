import { AMSTERDAM, ATENY, BARCELONA, BONN, BRUKSELA, CHANCE_BLUE, CHANCE_RED, EAST_RAILWAYS, FRANKFURT, FREE_PARK, GLASGOW, GOTEBORG, GO_TO_JAIL, GUARDED_PARKING, INSBRUK, JAIL, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, NORTH_RAILWAYS, POWER_STATION, ROME, ROTTERDAM, SALONIKI, SEWILLA, SOUTH_RAILWAY, START, SZTOKHOLM, TAX, WATER_PLANT, WEST_RAILWAYS, WIEDEN } from "./const"

export type tEstateTypes =
    'City' |
    'Railway' |
    'Power Station' |
    'Water Plant'

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

export type tCountries = 'Greece' | 'Italy' | 'Spain' | 'UK' | 'Benelux' | 'Sweeden' | 'RFN' | 'Austria'
export type tNonCountryFieldTypes = 'Railwaus' | 'Plant'

export type tCityField = {
    type: tEstateTypes,
    country: tCountries,
    price: number,
    mortage: number,
    housePrice: number,
    hotelPrice: number,
    visit: tVisitPayment,
    owner: string,
    nrOfHouses: number,
    // nrOfCitiesInCountry: number,
    // nrOfHousesToPurchase?: number,
    // nrOfHousesToSell?: number,
    // nrOfHotelsToSell?: number, 
    // nrOfHotelsToBuy?: number,
    // boardFieldNumber: number,
    isPlegded: boolean,
}

export type tChance = {
    type: 'Chance blue' | 'Chance red',
    info: string,
    icon: any, // PRECISE this type,
}

export type tOtherFieldTypes = {
    type: tOtherTypes,
    visit?: tVisitPayment,
    info: string,
    wait?: number,
    icon: any,
    // boardFieldNumber: number,
}

export type tNonCityEstates = {
    country: 'Railways' | 'Plant',
    type: 'Railway' | 'Power Station' | 'Water Plant',
    price: number,
    mortage: number,
    visit: tVisitPayment,
    owner: string,
    isPlegded: boolean,
    icon: any,
}

export interface tBoard {
    [START]: tOtherFieldTypes,
    [ATENY]: tCityField,
    [CHANCE_BLUE]: tChance,
    [CHANCE_RED]: tChance,
    [SALONIKI]: tCityField,
    [GUARDED_PARKING]: tOtherFieldTypes,
    [FREE_PARK]: tOtherFieldTypes,
    [JAIL]: tOtherFieldTypes,
    [GO_TO_JAIL]: tOtherFieldTypes,
    [SOUTH_RAILWAY]: tNonCityEstates,
    [NEAPOL]: tCityField,
    [MEDIOLAN]: tCityField,
    [ROME]: tCityField,
    [BARCELONA]: tCityField,
    [POWER_STATION]: tNonCityEstates,
    [SEWILLA]: tCityField,
    [MADRIT]: tCityField,
    [WEST_RAILWAYS]: tNonCityEstates,
    [LIVERPOOL]: tCityField,
    [GLASGOW]: tCityField,
    [LONDON]: tCityField,
    [ROTTERDAM]: tCityField,
    [BRUKSELA]: tCityField,
    [AMSTERDAM]: tCityField,
    [NORTH_RAILWAYS]: tNonCityEstates,
    [MALMO]: tCityField,
    [GOTEBORG]: tCityField,
    [WATER_PLANT]: tNonCityEstates,
    [SZTOKHOLM]: tCityField,
    [FRANKFURT]: tCityField,
    [KOLONIA]: tCityField,
    [BONN]: tCityField,
    [EAST_RAILWAYS]: tNonCityEstates,
    [INSBRUK]: tCityField,
    [TAX]: tOtherFieldTypes,
    [WIEDEN]: tCityField,
}

console.warn('Precise type of icon');


