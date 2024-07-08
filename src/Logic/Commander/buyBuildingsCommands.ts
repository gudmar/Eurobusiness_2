import { Bank } from "../Bank/Bank";
import { tBuyBuilding } from "./types";
import { addHotelsToEstate, addHousesToEstates, getPlayerByColor, getTotalNrOfHotels, getTotalNrOfHouses, throwWhenNotEnoughHotels, throwWhenNotEnoughHouses, throwWhenPlayerIsTooPoor } from "./utils";

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
    const {oneHotel, oneHouseCities, twoHouseCities} = args;
    if (oneHouseCities) addHousesToEstates(oneHouseCities, 1);
    if (twoHouseCities) addHousesToEstates(twoHouseCities, 2);
    if (oneHotel) addHotelsToEstate(oneHotel);
}
