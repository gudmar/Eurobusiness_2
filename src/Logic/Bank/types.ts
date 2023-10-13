export interface iBankState {
    nrOfHotels: number,
    nrOfHouses: number,
}

export interface iBank extends iBankState {
    getHotel(): boolean,
    getHouse(): boolean, // successfull if there was a hotel
    returnHotel(): boolean,
    returnHouse(): boolean,
}
