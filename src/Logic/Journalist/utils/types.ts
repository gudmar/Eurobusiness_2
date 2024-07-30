import { tEstateFieldWithName } from "../../../Functions/mapCitiesToCountries"
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types"
import { iChanceFieldState, iCityFieldState, iNonCityEstatesFieldState, iOtherFieldTypesFieldState } from "../../boardTypes"
import { tObject } from "../../types"
import { tJournalistOptionsUnderDevelopement } from "../types"

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
type tCityBuildingsManagement = { nrOfHotels: number, nrOfHouses: number, housePrice: number, hotelPrice: number, name: string, owner: string }
// export type tCityFieldsByCountry = iCityFieldState[];
type tGenericCityFieldsByCountry<T extends tCityBuildingsManagement> = T;
export type tCityFieldsByCountry = tGenericCityFieldsByCountry<tCityBuildingsManagement>[];

export type tStateModifierArgs = {state: tJournalistOptionsUnderDevelopement, options?: tGameState, playerName: string}

export type tBuildingLimitKey = 'nrOfHotelsPurchasedInRound' | 'nrOfHousesPurchasedInTurn';

export type tProcessEachCountryCalbackArgs = {
    gameState: tGameState,
    countryName: string,
    countryBoardFields: tEstateFieldWithName[]
}

export type tProcessEachCountryCallback = (args: tProcessEachCountryCalbackArgs) => tObject<any>

export type tCustomError = {
    message: string,
    stack: string,
}
