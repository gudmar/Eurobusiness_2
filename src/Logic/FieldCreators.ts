import {
    BANK,
    CITY
} from '../Data/const'
import { iChance, iCityField, iNamedCityField, iNonCityEstates, iOtherFieldTypes, tBoardField, tChanceType, tCountries, tEstateTypes, tIcon, tOtherTypes, tVisitPayment } from '../Data/types';

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
    static instances: {[key:string]: CityField};

    constructor({
        name,
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
    }: iNamedCityField) {

        if (CityField.instances[name] !== undefined) {
            return CityField.instances[name]
        } 
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
        return this;
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
    }: iNonCityEstates) {
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

export class  OtherFieldTypesField {
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
    }: iOtherFieldTypes) {
        this.type = type;
        this.info = info;
        this.wait = wait;
        this.icon = icon;
        this.visit = visit;
    }
}

export class ChanceField {
    type: tChanceType;
    info: string;
    icon: tIcon;
    constructor({
        type, info, icon
    }: iChance) {
        this.type = type;
        this.info = info;
        this.icon = icon;
    }
}
