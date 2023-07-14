import {
    BANK,
    CITY
} from '../Data/const'
import { iNamedChance, iNamedCityField, iNamedNonCityEstates, iNamedOtherField, iNonCityEstates, iOtherFieldTypes, tBoardField, tChanceType, tCountries, tEstateTypes, tIcon, tNamedBoardField, tOtherTypes, tVisitPayment } from '../Data/types';

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
    private _type: tEstateTypes = CITY;
    private _country!: tCountries;
    private _price: number = 0;
    private _mortage: number = 0;
    private _housePrice: number = 0;
    private _hotelPrice: number = 0;
    private _visit: tVisitPayment = [0];
    private _owner: string = BANK;
    private _nrOfHouses: number = 0;
    private _isPlegded: boolean = false;
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
        this._type = type;
        this._country = country;
        this._price = price;
        this._mortage = mortage;
        this._housePrice = housePrice;
        this._hotelPrice = hotelPrice;
        this._visit = visit;
        this._owner = owner;
        this._nrOfHouses = nrOfHouses;
        this._isPlegded = isPlegded;
        CityField.instances[name] = this;
        return this;
    }
    get type() { return this._type }
    get country() { return this._country }
    get price() { return this._price }
    get mortage() { return this._mortage }
    get housePrice() {return this._housePrice }
    get hotelPrice() {return this._hotelPrice} 
    get visit() {return this._visit}
    get owner() {return this._owner}
    get nrOfHouses() {return this._nrOfHouses}
    get isPlegded() { return this._isPlegded }
    set nrOfHouses(val: number) {
        if (val > 5 || val < 0) throw new Error('Nr of houses has to be > 0 and < 6')
        this._nrOfHouses = val
    }
    set owner(val: string) { this._owner = val}
    set isPlegded(val: boolean) { this._isPlegded = val}
}

export class NonCityEstatesField {
    private _type!: tEstateTypes;
    private _country!: tCountries;
    private _price!: number;
    private _mortage!: number;
    private _visit!: tVisitPayment;
    private _owner: string = BANK;
    private _isPlegded: boolean = false;
    private _icon: tIcon;
    private _name!: string;
    static instances: { [key:string] : NonCityEstatesField };

    constructor({
        type,
        country,
        price,
        mortage,
        visit,
        owner,
        isPlegded,
        icon,
        name,
    }: iNamedNonCityEstates) {
        if (NonCityEstatesField.instances[name] !== undefined) {
            return NonCityEstatesField.instances[name]
        }
        this._name = name;
        this._type = type;
        this._country = country;
        this._price = price;
        this._mortage = mortage;
        this._visit = visit;
        this._owner = owner;
        this._isPlegded = isPlegded;
        this._icon = icon;
        NonCityEstatesField.instances[name] = this;
        return this;
    }
    get name() { return this._name}
    get type() { return this._type}
    get country() {return this._country}
    get price() {return this._price}
    get mortage() {return this._mortage}
    get visit() {return this._visit}
    get owner() {return this._owner}
    get isPlegded() {return this._isPlegded}
    get icon() {return this._icon}
    set isPlegded(val: boolean) { this._isPlegded = val}
    set owner(val: string) {this._owner = val}
}

export class  OtherFieldTypesField {
    private _type!: tOtherTypes;
    private _visit?: tVisitPayment;
    private _info!: string;
    private _wait?: number;
    private _icon!: tIcon;
    private _name!: string;
    static instances: {[key: string]: OtherFieldTypesField}
    constructor({
        type,
        visit,
        info,
        wait,
        icon,
        name,
    }: iNamedOtherField) {
        if (OtherFieldTypesField.instances[name] !== undefined) {
            return OtherFieldTypesField.instances[name];
        }
        this._type = type;
        this._info = info;
        this._wait = wait;
        this._icon = icon;
        this._visit = visit;
        this._name = name;
        OtherFieldTypesField.instances[name] = this;
        return this;
    }
    get type() { return this._type}
    get info() { return this._info}
    get wait() { return this._wait}
    get icon() { return this._icon}
    get visit() {return this._visit}
    get naem() {return this._name}
}

export class ChanceField {
    private _type!: tChanceType;
    private _info!: string;
    private _icon!: tIcon;
    private _name!: string;
    static instances: {[key: string]: ChanceField}
    constructor({
        type, info, icon, name
    }: iNamedChance) {
        if (ChanceField.instances[name] !== undefined) {
            return ChanceField.instances[name];
        }
        this._name = name;
        this._type = type;
        this._info = info;
        this._icon = icon;
        ChanceField.instances[name] = this;
        return this;
    }
    get name() { return this._name}
    get type() { return this._type}
    get info() { return this._info}
    get icon() { return this._icon}
}
