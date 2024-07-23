import { MAX_NR_HOUSES_IN_CITY } from "../../Constants/constants";
import { tCity, tColors } from "../../Data/types";
import { displayError } from "../../Functions/displayMessage";
import { Bank } from "../Bank/Bank";
import { BoardCreator } from "../BoardCaretaker";
import { Players } from "../Players/Players";
import { tBuyBuilding, tCompareBuildingsLeftToCurrentBuildingsArgs, tSellBuildingsArgs } from "./types";

export const getPlayerByColor = (playerColor: tColors) => {
    const player = Players.getPlayerByColor(playerColor);
    if (!player) {
        displayError({title: 'Not allowed', message: `Player with color ${playerColor} not found`});
    }
    return player;
}

export const getPlayerByName = (playerName: string) => {
    const player = Players.getPlayerByName(playerName);
    if (!player) {
        displayError({title: 'Not allowed', message: `Player ${playerName} does not exist`})
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
    const {oneHotelCity} = args;
    const nrOfNeededHotels = oneHotelCity?.length || 0;
    return nrOfNeededHotels;
}

export const throwWhenNotEnoughHouses = (args: tBuyBuilding) => {
    const nrOfNeededHouses = getTotalNrOfHouses(args);
    if (Bank.nrOfHouses < nrOfNeededHouses) throw new Error('Commander: Bank has not enough houses');
}

export const throwWhenNotEnoughHotels = (args: tBuyBuilding) => {
    const nrOfNeededHotels = args?.oneHotelCity?.length || 0;
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
    const {oneHotelCity} = args;
    oneHotelCity?.forEach((cityName) => {
        BoardCreator.instance.decreaseNrOfHouses(cityName, MAX_NR_HOUSES_IN_CITY)
    })
}

type tRemoveSoldBuildingsInSingleEstateArgs = {
    nrOfHotelsLeft: number, nrOfHousesLeft: number,
    cityName: string
}

const removeSoldBuildnigsInSingleEstate = (args: tRemoveSoldBuildingsInSingleEstateArgs) => {
    const {nrOfHotelsLeft, nrOfHousesLeft, cityName } = args;
    BoardCreator.instance.setNrOfHotels(cityName, nrOfHotelsLeft);
    BoardCreator.instance.setNrOfHouses(cityName, nrOfHousesLeft);
}

export const compareIfThereAreBuildingsInCitiesSold = (args: tCompareBuildingsLeftToCurrentBuildingsArgs) => {
    const { nrOfHotelsLeft, nrOfHousesLeft, nrOfHousesCurrent, nrOfHotelsCurrent } = args;
    const nrOfHotelsSold = nrOfHotelsCurrent - nrOfHotelsLeft;
    const result = (nrOfHotelsLeft <= nrOfHotelsCurrent && nrOfHousesLeft <= nrOfHousesCurrent + nrOfHotelsSold*(MAX_NR_HOUSES_IN_CITY))
    return result;
}

const checkIfEnoughBuildingsInCity = (args: tRemoveSoldBuildingsInSingleEstateArgs) => {
    const {nrOfHotelsLeft, nrOfHousesLeft, cityName} = args;
    const {nrOfHouses, nrOfHotels} = BoardCreator.instance.getNrOfBuildingsOnCityByName(cityName);
    const result = compareIfThereAreBuildingsInCitiesSold({
        nrOfHousesCurrent: nrOfHouses, nrOfHotelsCurrent: nrOfHotels, nrOfHotelsLeft, nrOfHousesLeft
    })
    return result;
}

export const compareCurrentBuildingsToBuildingsToBeLeft = ({
    nrOfHotelsLeft, nrOfHousesLeft, nrOfHousesCurrent, nrOfHotelsCurrent
}: tCompareBuildingsLeftToCurrentBuildingsArgs) => {
    const areNoHotelsToBeSold = (nrOfHotelsCurrent === nrOfHotelsLeft);
    const areNoHousesToBeSold = (nrOfHousesLeft === nrOfHousesCurrent);
    const areNoBuildingsToBeSold = areNoHotelsToBeSold && areNoHousesToBeSold;
    return !areNoBuildingsToBeSold;
}

type tSummedBuildigsAfterTransaction = { nrOfHotels: number, nrOfHouses: number };

const summNrBuildingsAfterTransaction = ({ locationAfterTransaction }: tSellBuildingsArgs) => {
    const nrBuildings = locationAfterTransaction.reduce((acc: tSummedBuildigsAfterTransaction, { nrOfHotels, nrOfHouses }) => {
        const nextAcc = {
            nrOfHotels: acc.nrOfHotels + nrOfHotels,
            nrOfHouses: acc.nrOfHouses + nrOfHouses,
        };
        return nextAcc;
    }, { nrOfHotels:0, nrOfHouses:0 })
    return nrBuildings;
}

const summCurrentNrOfBuildings = (args: tSellBuildingsArgs) => {
    const { locationAfterTransaction } = args;
    const nrOfBuildings = locationAfterTransaction.reduce((acc: tSummedBuildigsAfterTransaction, {cityName}) => {
        const {nrOfHouses, nrOfHotels} = BoardCreator.instance.getNrOfBuildingsOnCityByName(cityName);
        const nextAcc = {
            nrOfHotels: acc.nrOfHotels + nrOfHotels,
            nrOfHouses: acc.nrOfHouses + nrOfHouses,
        };
        return nextAcc;
    }, {nrOfHotels: 0, nrOfHouses: 0})
    return nrOfBuildings;
}

const checkIfThereAreBuildingsToBeSold =  (args: tSellBuildingsArgs) => {
    const {nrOfHotels: nrOfHotelsLeft, nrOfHouses: nrOfHousesLeft} = summCurrentNrOfBuildings(args);
    const {nrOfHotels: nrOfHotelsCurrent, nrOfHouses: nrOfHousesCurrent}  = summNrBuildingsAfterTransaction( args );
    const areAnyHousesToBeSold = compareCurrentBuildingsToBuildingsToBeLeft({
        nrOfHousesLeft, nrOfHotelsLeft, nrOfHotelsCurrent, nrOfHousesCurrent
    })

    return areAnyHousesToBeSold;
}

export const removeSoldHousessFromBuildings = (args: tSellBuildingsArgs) => {
    const { locationAfterTransaction } = args;        
    const areBuildingsToBeSold = checkIfThereAreBuildingsToBeSold(args);
    if (!areBuildingsToBeSold && args.price > 0) throw new Error('Cannot sell 0 buildings')
    locationAfterTransaction.forEach(({nrOfHotels, nrOfHouses, cityName}) => {
        const request = {
            nrOfHotelsLeft: nrOfHotels, 
            nrOfHousesLeft: nrOfHouses,
            cityName,
        }
        const isRequestValid = checkIfEnoughBuildingsInCity(request);
        if (!isRequestValid) throw new Error(`Cannot sell ${nrOfHouses} houses and ${nrOfHotels} hotels from ${cityName}, as there are not enough buildings left`);
        removeSoldBuildnigsInSingleEstate(request)
    })
}

export const returnBuildingsToBank = (args: tSellBuildingsArgs) => {
    const {nrOfHotels, nrOfHouses} = args;
    Bank.instance.returnHotels(nrOfHotels);
    Bank.instance.returnHouses(nrOfHouses);
}

export const returnMoneyToPlayer = (playerName: string, ammount: number) => {
    const player = getPlayerByName(playerName);
    player.giveThisPlayerMoney(ammount);
}

