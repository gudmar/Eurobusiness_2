import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { Bank } from "../../Bank/Bank";

type tWrappedGameState = { gameState: tGameState }

export const getHousesInBank = (args: tWrappedGameState) => {
    const housesFromGameState = args?.gameState?.bank?.nrOfHouses;
    const housesFromBankClass = Bank.nrOfHouses
    const result = housesFromBankClass ?? housesFromGameState;
    return result;
}

export const getHotelsInBank = (args: tWrappedGameState) => {
    const hotelsFromState = args?.gameState?.bank?.nrOfHotels;
    const hotelsFromBankClass = Bank.nrOfHotels;

    

    // const result = hotelsFromBankClass ?? hotelsFromState;
    const result = hotelsFromBankClass;
    return result;
}
