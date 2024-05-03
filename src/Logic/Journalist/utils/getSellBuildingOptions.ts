import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { getCurrentPlayerName, getNrOfCurrentPlayerBuildings, isCurrentPlayerInJail } from "./commonFunctions";
import { SellBuildingsRejected } from "./constants";
import { getSellingPermitsForEachCountry } from "./getSellingPermits";
import { tStateModifierArgs } from "./types";

const hasCurrentPlayerBuildings = (state:  tGameState) => {
    const {nrOfHotels, nrOfHouses} = getNrOfCurrentPlayerBuildings(state);
    const result = nrOfHotels > 0 || nrOfHouses > 0;
    return result;
}

const getSellingPossiblitiesForCurrentPlayer = (args: tStateModifierArgs) => {
    const gameState = args.options;
    const currentPlayer = getCurrentPlayerName(gameState!);
    const result = getSellingPermitsForEachCountry({gameState: gameState!, playerName: currentPlayer})
    return result;
}

export const getTestableOptionsWithSellBuildings = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    const hasPlayerBuildings = hasCurrentPlayerBuildings(options!);
    if (!hasPlayerBuildings) {
        state.sellBuildings = { reason: SellBuildingsRejected.NoBuildings };
        return state;
    }
    const isInJail = isCurrentPlayerInJail(options!);
    if (isInJail) {
        state.sellBuildings = { reason: SellBuildingsRejected.InJail}
        return state;
    }
    const sellingPossibilities = getSellingPossiblitiesForCurrentPlayer(args);
    const result = {
        payload: sellingPossibilities,
        type: OptionTypes.SellBuildings,
        isMandatory: false,
    };
    state.sellBuildings = result;
    return state;
} 
