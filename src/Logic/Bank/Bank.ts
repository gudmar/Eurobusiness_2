import { INITIAL_NR_HOTELS, INITIAL_NR_HOUSES, MAX_NR_OF_HOUSES_TO_PURCHASE_IN_ONE_ROW } from "../../Constants/constants";
import { iBank, tBankState } from "./types";

export class Bank implements iBank {

    // private _nrOfHotels: number = INITIAL_NR_HOTELS;
    // private _nrOfHouses: number = INITIAL_NR_HOUSES;
    private static _instance?: Bank;
    static nrOfHotels: number;
    static nrOfHouses: number

    constructor() {
        if (Bank._instance) return Bank._instance;
        Bank._instance = this;
    }
    static get instance(): Bank {
        if (!Bank._instance) throw new Error('Cannot get a not existing Bank instance')
        return Bank._instance
    }

    get state(): tBankState {
        return {
            nrOfHotels: Bank.nrOfHotels,
            nrOfHouses: Bank.nrOfHouses,
        }
    }

    set state(state: tBankState) {
            Bank.nrOfHotels = state.nrOfHotels;
            Bank.nrOfHouses = state.nrOfHouses;
        }

    get nrOfHotels(): number {return Bank.nrOfHotels}
    get nrOfHouses(): number {return Bank.nrOfHouses}

    getHotel() {
        if (Bank.nrOfHotels <= 0) {return false}
            Bank.nrOfHotels--; return true
    }
    returnHotel(): boolean { Bank.nrOfHotels++; return true; }

    getHouses(nrOfHousesToGet: number): boolean {

        if (nrOfHousesToGet > MAX_NR_OF_HOUSES_TO_PURCHASE_IN_ONE_ROW) throw new Error(`Cannot get more then ${MAX_NR_OF_HOUSES_TO_PURCHASE_IN_ONE_ROW}`)
        if (Bank.nrOfHouses <= nrOfHousesToGet ) {return false}
        Bank.nrOfHouses -= nrOfHousesToGet;
        return true;
    }
    returnHouses(nrOfHousesToReturn: number): boolean {
        Bank.nrOfHouses += nrOfHousesToReturn;
        return true;
    }

}