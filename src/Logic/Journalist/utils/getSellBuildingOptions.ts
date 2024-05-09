import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { getCurrentPlayerName, getNrOfPlayerBuildings, isCurrentPlayerInJail, isPlayerInJail } from "./commonFunctions";
import { SellBuildingsRejected } from "./constants";
import { getSellingPermitsForEachCountry } from "./getSellingPermits";
import { tStateModifierArgs } from "./types";

const hasPlayerBuildings = (state:  tGameState, playerName: string) => {
    const {nrOfHotels, nrOfHouses} = getNrOfPlayerBuildings(state, playerName);
    const result = nrOfHotels > 0 || nrOfHouses > 0;
    return result;
}

const getSellingPossiblitiesForPlayer = (args: tStateModifierArgs) => {
    const gameState = args.options;
    const result = getSellingPermitsForEachCountry({gameState: gameState!, playerName: args.playerName})
    return result;
}

export const getTestableOptionsWithSellBuildings = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const hasBuildings = hasPlayerBuildings(options!, playerName);
    if (!hasBuildings) {
        state.sellBuildings = { reason: SellBuildingsRejected.NoBuildings };
        return state;
    }
    const isInJail = isPlayerInJail(options!, playerName);
    if (isInJail) {
        state.sellBuildings = { reason: SellBuildingsRejected.InJail}
        return state;
    }
    const sellingPossibilities = getSellingPossiblitiesForPlayer(args);
    const result = {
        payload: sellingPossibilities,
        type: OptionTypes.SellBuildings,
        isMandatory: false,
    };
    state.sellBuildings = result;
    return state;
} 
