import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { Bank } from "../../Bank/Bank";
import { tGetBuildingPermitsArgs } from "./getBuildingPermits";

type tWrappedGameState = { gameState: tGameState }

export const getHousesInBank = (args: tWrappedGameState) => {
    const housesFromGameState = args?.gameState?.bank?.nrOfHouses;
    const result = Bank.nrOfHouses || housesFromGameState;
    return result;
}

export const getHotelsInBank = (args: tWrappedGameState) => {
    const hotelsFromState = args?.gameState?.bank?.nrOfHotels;
    const result = Bank.nrOfHotels || hotelsFromState;
    return result;
}
