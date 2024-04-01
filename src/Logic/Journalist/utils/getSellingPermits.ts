import { tGetBuildingPermitsArgs } from "./getBuildingPermits";
import { tCountries } from "../../../Data/types";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { tKeyCreator } from "./types";


export type tGetSellingPermitsArgs = {
    gameState: tGameState,
    country: tCountries,
    playerName: string,
}

export enum NotAbleToSellBuildingsReasons {
    noBuildings = 'No buildings in this country',
    noHousesLeft = 'No houses. Not able to exchange hotels for houses. Can sell all hotels instead'
}

export const getSellingPermits = (args: tGetSellingPermitsArgs) => {
    const MAX_NR_OF_BUILDINGS = 3;
    const {gameState, playerName, country} = args;

}

export const getSellingPermitsCategory = ({ nrOfSoldHotels, nrOfSoldHouses, price }: tKeyCreator) => {
    if (nrOfSoldHotels > 0 && nrOfSoldHouses === 0) {
        return `Sell ${nrOfSoldHotels}, get ${price}`
    }
    if (nrOfSoldHotels > 0 && nrOfSoldHotels > 0) {
        return `Sell ${nrOfSoldHotels} and ${nrOfSoldHouses}, get ${price}`
    }
    if (nrOfSoldHouses > 0 && nrOfSoldHotels === 0) {
        return `Sell ${nrOfSoldHouses}, get ${price}`
    }
    if (nrOfSoldHotels === 0 && nrOfSoldHouses === 0) {
        return 'Sell nothing'
    }
    throw new Error(`getSellingPermitsCategory did not produce any reasonable output for ${nrOfSoldHotels} hotels and ${nrOfSoldHouses} houses`)
}

