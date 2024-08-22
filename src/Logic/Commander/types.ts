import { tLocationAfterTransaction } from "../../Components/GameOptions/types";
import { tCity, tColors, tEstate } from "../../Data/types";

export type tChanceCardPayload = {
    description: string;
    playerColor: tColors;
}

export type tBuyBuilding = {
    playerColor: tColors,
    oneHouseCities?: tCity[],
    twoHouseCities?: tCity[],
    oneHotelCity?: tCity[],
    cost: number,
}

export type tSellBuildingsArgs = {
    nrOfHouses: number,
    nrOfHotels: number,
    locationAfterTransaction: tLocationAfterTransaction[],
    playerName: string,
    price: number,
}

export type tCompareBuildingsLeftToCurrentBuildingsArgs = {
    nrOfHotelsLeft: number,
    nrOfHousesLeft: number,
    nrOfHousesCurrent: number,
    nrOfHotelsCurrent: number
}

export type tBuyEstate = {
    estateName: tEstate,
    playerName: string,
}

export type tHandleBankOwnedEstateActions = {
    playerName: string,
    estateName: tEstate,
    refreshFunction: tRefreshFunction,
}

export type tRefreshFunction =  () => void;
