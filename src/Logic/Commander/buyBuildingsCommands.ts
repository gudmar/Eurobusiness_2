import { MAX_NR_HOUSES_IN_CITY } from "../../Constants/constants";
import { Bank } from "../Bank/Bank";
import { tBuyBuilding } from "./types";
import { addHotelsToEstate, addHousesToEstates, getPlayerByColor, getTotalNrOfHotels, getTotalNrOfHouses, removeHousesToBuildHotels, throwWhenNotEnoughHotels, throwWhenNotEnoughHouses, throwWhenPlayerIsTooPoor } from "./utils";

export const throwWhenBuildingsCannotBePurchased = (args: tBuyBuilding) => {
    throwWhenNotEnoughHouses(args);
    throwWhenNotEnoughHotels(args);
    throwWhenPlayerIsTooPoor(args);
}

export const takeBuildingsFromBank = (args: tBuyBuilding) => {
    const nrOfHouses = getTotalNrOfHouses(args);
    const nrOfHotels = getTotalNrOfHotels(args);
    Bank.nrOfHouses -= nrOfHouses;
    Bank.nrOfHotels -= nrOfHotels;
}

export const returnHousesBeforeBuildingHotelsToBank = (args: tBuyBuilding) => {
    const nrOfCitiesToBuildHotels = args.oneHotelCity?.length || 0;
    const nrOfHousesToReturn = nrOfCitiesToBuildHotels * MAX_NR_HOUSES_IN_CITY;
    Bank.nrOfHouses += nrOfHousesToReturn;
    // It is not possible to get here if there are less then MAX_NR_HOUSES_IN_CITY
}

export const updateNrBuildingsPlayerBoughtThisTurn = (args: tBuyBuilding) => {
    const player = getPlayerByColor(args.playerColor);
    const nrOfHouses = getTotalNrOfHouses(args);
    const nrOfHotels = getTotalNrOfHotels(args);
    player.nrOfHousesPurcahsedInTurn += nrOfHouses;
    player.nrOfHotelsPurchasedInRound += nrOfHotels;
}

export const payForBuildings = (args: tBuyBuilding) => {
    const player = getPlayerByColor(args.playerColor);
    player.money -= args.cost;
}

export const addBuildingsToEstates = (args: tBuyBuilding) => {
    const {oneHotelCity, oneHouseCities, twoHouseCities} = args;
    console.log('addBuildingsToEstates', args)
    if (oneHouseCities) addHousesToEstates(oneHouseCities, 1);
    if (twoHouseCities) addHousesToEstates(twoHouseCities, 2);
    if (oneHotelCity) {
        addHotelsToEstate(oneHotelCity);
    }
}
