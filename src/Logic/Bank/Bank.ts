import { INITIAL_NR_HOTELS, INITIAL_NR_HOUSES, MAX_NR_OF_HOUSES_TO_PURCHASE_IN_ONE_ROW } from "../../Constants/constants";
import { iBank } from "./types";

export class Bank implements iBank {

    private _nrOfHotels: number = INITIAL_NR_HOTELS;
    private _nrOfHouses: number = INITIAL_NR_HOUSES;
    private static _instance?: Bank;

    constructor() {
        if (Bank._instance) return Bank._instance;
        Bank._instance = this;
    }
    static get instance(): Bank {
        if (!this._instance) throw new Error('Cannot get a not existing Bank instance')
        return this._instance
    }

    get nrOfHotels(): number {return this._nrOfHotels}
    get nrOfHouses(): number {return this._nrOfHouses}

    getHotel() {
        if (this._nrOfHotels <= 0) {return false}
        this._nrOfHotels--; return true
    }
    returnHotel(): boolean { this._nrOfHotels++; return true; }

    getHouses(nrOfHousesToGet: number): boolean {

        if (nrOfHousesToGet > MAX_NR_OF_HOUSES_TO_PURCHASE_IN_ONE_ROW) throw new Error(`Cannot get more then ${MAX_NR_OF_HOUSES_TO_PURCHASE_IN_ONE_ROW}`)
        if (this._nrOfHouses <= nrOfHousesToGet ) {return false}
        this._nrOfHouses -= nrOfHousesToGet;
        return true;
    }
    returnHouses(nrOfHousesToReturn: number): boolean {
        this._nrOfHouses += nrOfHousesToReturn;
        return true;
    }

}