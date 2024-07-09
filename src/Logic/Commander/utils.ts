import { MAX_NR_HOUSES_IN_CITY } from "../../Constants/constants";
import { tCity, tColors } from "../../Data/types";
import { displayError } from "../../Functions/displayMessage";
import { Bank } from "../Bank/Bank";
import { BoardCreator } from "../BoardCaretaker";
import { Players } from "../Players/Players";
import { tBuyBuilding } from "./types";

export const getPlayerByColor = (playerColor: tColors) => {
    const player = Players.getPlayerByColor(playerColor);
    if (!player) {
        displayError({title: 'Not allowed', message: `Player with color ${playerColor} not found`});
    }
    return player;
}


// ==================  Buy buildings ===============
export const getTotalNrOfHouses = (args: tBuyBuilding) => {
    const {oneHouseCities, twoHouseCities} = args;
    const nrOfHousesForSingleLocations = oneHouseCities?.length || 0;
    const nrOfHousesForDoubleLocations = twoHouseCities?.length || 0;
    const nrOfNeededHouses = nrOfHousesForSingleLocations + nrOfHousesForDoubleLocations;
    return nrOfNeededHouses;
}

export const getTotalNrOfHotels = (args: tBuyBuilding) => {
    const {oneHotel} = args;
    const nrOfNeededHotels = oneHotel?.length || 0;
    return nrOfNeededHotels;
}

export const throwWhenNotEnoughHouses = (args: tBuyBuilding) => {
    const nrOfNeededHouses = getTotalNrOfHouses(args);
    if (Bank.nrOfHouses < nrOfNeededHouses) throw new Error('Commander: Bank has not enough houses');
}

export const throwWhenNotEnoughHotels = (args: tBuyBuilding) => {
    const nrOfNeededHotels = args?.oneHotel?.length || 0;
    if (Bank.nrOfHotels < nrOfNeededHotels) throw new Error('Commander: Bank has not enough hotels');
}

export const throwWhenPlayerIsTooPoor = (args: tBuyBuilding) => {
    const player = getPlayerByColor(args.playerColor);
    if (player.money < args.cost) throw new Error('Commander: Player is too poor')
}

export const addHousesToEstates = (listOfCities: tCity[], nrOfHousesToBuy: number) => {
    listOfCities.forEach((cityName) => {
        BoardCreator.instance.increaseNrOfHouses( nrOfHousesToBuy, cityName);
    })
}

export const addHotelsToEstate = (listOfCities: tCity[]) => {
    listOfCities.forEach((cityName) => {
        BoardCreator.instance.increaseNrOfHotels( cityName);
    })
}

export const removeHousesToBuildHotels = (args: tBuyBuilding) => {
    const {oneHotel} = args;
    oneHotel?.forEach((cityName) => {
        BoardCreator.instance.decreaseNrOfHouses(cityName, MAX_NR_HOUSES_IN_CITY)
    })
}
