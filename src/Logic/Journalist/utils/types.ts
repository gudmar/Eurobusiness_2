import { tGameState } from "../../../Functions/PersistRetrieveGameState/types"
import { iAny } from "../../../Types/types"
import { iCityFieldState } from "../../boardTypes"
import { tObject } from "../../types"

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

// export type tSellingPermits = iAny;
export type tSellingPermits = tObject<tSellingPermit[]>

export type tBuildingLocations = tNrOfBuildings[]

export type tPossibleHouseSolutions = number[][]

export type tGetCityFieldByCountryArgs = { gameState: tGameState, countryName: string}
export type tGetCityFieldByCountryIfOwnedByArgs = { gameState: tGameState, countryName: string, playerName: string}
export type tCityFieldsByCountry = iCityFieldState[];
