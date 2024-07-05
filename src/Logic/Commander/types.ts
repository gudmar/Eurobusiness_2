import { tCity, tColors } from "../../Data/types";

export type tChanceCardPayload = {
    description: string;
    playerColor: tColors;
}

export type tBuyBuilding = {
    playerColor: tColors,
    oneHouseCities: tCity[],
    twoHouseCities: tCity[],
    oneHotel: tCity,
    cost: number,
}
