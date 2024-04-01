import { iAny } from "../../../Types/types"

export type tNrOfBuildings = {
    nrOfHouses: number,
    nrOfHotels: number,
}

export type tNrOfBuildingsWithCityName = {
    nrOfHouses: number,
    nrOfHotels: number,
    cityName: string,
}

export type tSellingPermit = {
    locationsAfterTransaction: tNrOfBuildingsWithCityName[],
    nrOfSoldHotels: number,
    nrOfSoldHouses: number,
    price: number,
}

export type tKeyCreator = {
    nrOfSoldHotels: number, nrOfSoldHouses: number, price: number
}

export type tSellingPermits = iAny;

export type tBuildingLocations = tNrOfBuildings[]

export type tPossibleHouseSolutions = number[][]
