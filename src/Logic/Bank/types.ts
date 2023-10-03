export interface iBank {
    getHotel(): boolean,
    getHouse(): boolean, // successfull if there was a hotel
    returnHotel(): boolean,
    returnHouse(): boolean,
    nrOfHotels: number,
    nrOfHouses: number,
}
