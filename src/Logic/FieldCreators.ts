import {
    BANK,
    CITY
} from '../Data/const'
import { iCityField, iNamedChance, iNamedCityField, iNamedNonCityEstates, iNamedOtherField, tAnyState, tBoardField, tChanceType, tCity, tCountries, tEstateTypes, tFlattenedFieldTypes, tIcon, tNonCityEstates, tOtherTypes, tVisitPayment } from '../Data/types';
import { iChanceField, iChanceFieldState, iCityFieldClass, iCityFieldState, iNonCityEstatesField, iNonCityEstatesFieldState, iOtherFieldTypesField, iOtherFieldTypesFieldState } from './boardTypes';
import { SubscribtionsHandler } from './SubscrbtionsHandler';
import { iCityMemento, iNonCityEstatesMemento } from './types';

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

export class CityField extends SubscribtionsHandler<tFlattenedFieldTypes, tAnyState> implements iCityFieldClass {
    private _name!: string;
    private _type: tEstateTypes = CITY;
    private _country!: tCountries;
    private _price: number = 0;
    private _mortgage: number = 0;
    private _housePrice: number = 0;
    private _hotelPrice: number = 0;
    private _visit: tVisitPayment = [0];
    private _owner: string = BANK;
    private _nrOfHouses: number = 0;
    private _isPlegded: boolean = false;
    private _nrOfHotels: number = 0;
    private _color: string = '#fff';
    private _index!: number;
    static instances: {[key:string]: CityField} = {};

    constructor({
        name,
        type,
        country,
        price,
        mortgage,
        housePrice,
        hotelPrice,
        visit,
        owner,
        nrOfHouses,
        nrOfHotels,
        isPlegded,
        color,

    }: iNamedCityField, index: number) {
        super();
        if (CityField.instances[name] !== undefined) {
            return CityField.instances[name]
        }
        this._name = name;
        this._type = type;
        this._country = country;
        this._price = price;
        this._mortgage = mortgage;
        this._housePrice = housePrice;
        this._hotelPrice = hotelPrice;
        this._visit = visit;
        this._owner = owner;
        this._nrOfHouses = nrOfHouses;
        this._nrOfHotels = nrOfHotels;
        this._isPlegded = isPlegded;
        this._color = color;
        this._index = index;
        CityField.instances[name] = this;
        return this;
    }
    get name() { return this._name}
    get type() { return this._type }
    get country() { return this._country }
    get price() { return this._price }
    get mortgage() { return this._mortgage }
    get housePrice() {return this._housePrice }
    get hotelPrice() {return this._hotelPrice} 
    get visit() {return this._visit}
    get owner() {return this._owner}
    get nrOfHouses() {return this._nrOfHouses}
    get nrOfHotels() {return this._nrOfHotels}
    get isPlegded() { return this._isPlegded }
    get color() { return this._color}
    get index() { return this._index }
    set nrOfHouses(val: number) {
        if (val > 5 || val < 0) throw new Error('Nr of houses has to be > 0 and < 6')
        this._nrOfHouses = val
    }
    getMemento(): iCityMemento {
        return ({
            owner: this._owner,
            name: this._name,
            nrOfHouses: this._nrOfHouses,
            isPlegded: this._isPlegded,
        })
    }
    get state(): iCityFieldState {
        return ({
            name: this._name,
            type: this._type,
            country: this._country,
            price: this._price,
            mortgage: this._mortgage,
            housePrice: this._housePrice,
            hotelPrice: this._hotelPrice,
            visit: this._visit,
            owner: this._owner,
            nrOfHouses: this._nrOfHouses,
            isPlegded: this._isPlegded,
            color: this._color,
            index: this._index,
        })
    }
    set owner(val: string) { this._owner = val}
    set isPlegded(val: boolean) { this._isPlegded = val}
}

export class NonCityEstatesField extends SubscribtionsHandler<tFlattenedFieldTypes, tAnyState> implements iNonCityEstatesField{
    private _type!: tEstateTypes;
    private _country!: tCountries;
    private _price!: number;
    private _mortgage!: number;
    private _visit!: tVisitPayment;
    private _owner: string = BANK;
    private _isPlegded: boolean = false;
    private _icon!: tIcon;
    private _name!: string;
    private _index!: number;
    static instances: { [key:string] : NonCityEstatesField } = {};

    constructor({
        type,
        country,
        price,
        mortgage,
        visit,
        owner,
        isPlegded,
        Icon,
        name,
    }: iNamedNonCityEstates, index: number) {
        super();
        if (NonCityEstatesField.instances[name] !== undefined) {
            return NonCityEstatesField.instances[name]
        }
        this._name = name;
        this._type = type;
        this._country = country;
        this._price = price;
        this._mortgage = mortgage;
        this._visit = visit;
        this._owner = owner;
        this._isPlegded = isPlegded;
        this._icon = Icon;
        this._index = index;
        NonCityEstatesField.instances[name] = this;
        return this;
    }

    getMemento(): iNonCityEstatesMemento {
        return ({
            name: this._name,
            owner: this._owner,
            isPlegded: this._isPlegded,
        })
    }

    get name() { return this._name}
    get type() { return this._type}
    get country() {return this._country}
    get price() {return this._price}
    get mortgage() {return this._mortgage}
    get visit() {return this._visit}
    get owner() {return this._owner}
    get isPlegded() {return this._isPlegded}
    get Icon() {return this._icon}
    set isPlegded(val: boolean) { this._isPlegded = val}
    set owner(val: string) {this._owner = val}
    get index() { return this._index }
    get state(): iNonCityEstatesFieldState {
        return {
            type: this._type,
            country: this._country,
            price: this._price,
            mortgage: this._mortgage,
            visit: this._visit,
            owner: this._owner,
            isPlegded: this._isPlegded,
            Icon: this._icon,
            name: this._name,
            index: this._index,
        }
    }
}

export class  OtherFieldTypesField extends SubscribtionsHandler<tFlattenedFieldTypes, tAnyState> implements iOtherFieldTypesField {
    private _type!: tOtherTypes;
    private _visit?: tVisitPayment;
    private _info!: string;
    private _wait!: number;
    private _icon!: tIcon;
    private _name!: string;
    private _index!: number;
    static instances: {[key: string]: OtherFieldTypesField} = {}
    constructor({
        type,
        visit,
        info,
        wait = 0,
        Icon,
        name,
    }: iNamedOtherField, index: number) {
        super();
        if (OtherFieldTypesField.instances[name] !== undefined) {
            return OtherFieldTypesField.instances[name];
        }
        this._type = type;
        this._info = info;
        this._wait = wait;
        this._icon = Icon;
        this._visit = visit;
        this._name = name;
        this._index = index;
        OtherFieldTypesField.instances[name] = this;
        return this;
    }
    get state(): iOtherFieldTypesFieldState {
        return ({
            name: this._name,
            type: this._type,
            Icon: this._icon,
            visit: this._visit,
            wait: this._wait,
            index: this._index,
        })
    }
    get type() { return this._type}
    get info() { return this._info}
    get wait() { return this._wait}
    get icon() { return this._icon}
    get Icon() { return this._icon}
    get visit() {return this._visit}
    get name() {return  this._name}
    get index() {return this._index}
}

export class ChanceField extends SubscribtionsHandler<tFlattenedFieldTypes, tAnyState> implements iChanceField{
    private _type!: tChanceType;
    private _info!: string;
    private _icon!: tIcon;
    private _name!: string;
    private _index!: number;
    static instances: {[key: string]: ChanceField} = {}
    constructor({
        type, info, Icon, name
    }: iNamedChance, index: number) {
        super();
        if (ChanceField.instances[name] !== undefined) {
            return ChanceField.instances[name];
        }
        this._index = index;
        this._name = name;
        this._type = type;
        this._info = info;
        this._icon = Icon;
        ChanceField.instances[name] = this;
        return this;
    }
    get name() { return this._name}
    get type() { return this._type}
    get info() { return this._info}
    get icon() { return this._icon}
    get Icon() { return this._icon}
    get index() { return this._index}
    get state(): iChanceFieldState {
        return ({
            name: this._name,
            index: this._index,
            Icon: this._icon,
            type: this._type,
        })
    }
}
