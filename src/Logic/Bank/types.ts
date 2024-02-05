export interface iBankState {
    nrOfHotels: number,
    nrOfHouses: number,
    
}

export interface iBank extends iBankState {
    getHotel(): boolean,
    getHouses(nrOfHousesToGet: number): boolean, // successfull if there was a hotel
    returnHotel(): boolean,
    returnHouses(nrOfHousesToReturn: number): boolean,
    state: tBankState,
}

export type tBankState = {
    nrOfHotels: number,
    nrOfHouses: number,
}
