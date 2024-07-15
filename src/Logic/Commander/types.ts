import { tLocationAfterTransaction } from "../../Components/GameOptions/types";
import { tCity, tColors } from "../../Data/types";

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

