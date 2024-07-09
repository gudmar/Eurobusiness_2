import { tCity, tColors } from "../../Data/types";
import { NrOfHotels, NrOfHouses } from "../Journalist/utils/getBuildingPermits";

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
