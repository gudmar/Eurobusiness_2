import {
    BANK,
    CITY
} from '../Data/const'
import { tBoardField, tCityField, tCountries, tEstateTypes, tIcon, tNonCityEstates, tOtherFieldTypes, tOtherTypes, tVisitPayment } from '../Data/types';

export class NullishField {
    descriptor?: tBoardField;
    constructor(fieldDescriptor: tBoardField){
        this.flush(fieldDescriptor);
    }
    flush(value: tBoardField) {
        this.descriptor = value;
        this.descriptor = undefined;
    }
}

export class CityField {
    type: tEstateTypes = CITY;
    country: tCountries;
    price: number = 0;
    mortage: number = 0;
    housePrice: number = 0;
    hotelPrice: number = 0;
    visit: tVisitPayment = [0];
    owner: string = BANK;
    nrOfHouses: number = 0;
    isPlegded: boolean = false;

    constructor({
        type,
        country,
        price,
        mortage,
        housePrice,
        hotelPrice,
        visit,
        owner,
        nrOfHouses,
        isPlegded
    }: tCityField) {
        this.type = type;
        this.country = country;
        this.price = price;
        this.mortage = mortage;
        this.housePrice = housePrice;
        this.hotelPrice = hotelPrice;
        this.visit = visit;
        this.owner = owner;
        this.nrOfHouses = nrOfHouses;
        this.isPlegded = isPlegded;
    }
}

export class NonCityEstatesField {
    type: tEstateTypes;
    country: tCountries;
    price: number;
    mortage: number;
    visit: tVisitPayment;
    owner: string = BANK;
    isPlegded: boolean = false;
    icon: tIcon;
    constructor({
        type,
        country,
        price,
        mortage,
        visit,
        owner,
        isPlegded,
        icon
    }: tNonCityEstates) {
        this.type = type;
        this.country = country;
        this.price = price;
        this.mortage = mortage;
        this.visit = visit;
        this.owner = owner;
        this.isPlegded = isPlegded;
        this.icon = icon;
    }
}

export class  OtherFieldTypesCreator {
    type: tOtherTypes;
    visit?: tVisitPayment;
    info: string;
    wait?: number;
    icon: tIcon;
    constructor({
        type,
        visit,
        info,
        wait,
        icon,
    }: tOtherFieldTypes) {
        this.type = type;
        this.info = info;
        this.wait = wait;
        this.icon = icon;
        this.visit = visit;
    }
}
