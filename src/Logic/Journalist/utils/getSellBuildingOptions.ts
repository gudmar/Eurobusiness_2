import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { tJournalistOptionsUnderDevelopement } from "../types";
import { getNrOfCurrentPlayerBuildings, isCurrentPlayerInJail } from "./commonFunctions";
import { tStateModifierArgs } from "./types";

export enum SellBuildingsRejected {
    NoBuildings = 'Player need to have a building before he may sell it',
    InJail = 'When player is in jail, he cannot sell buildings',
}


const hasCurrentPlayerBuildings = (state:  tGameState) => {
    const {nrOfHotels, nrOfHouses} = getNrOfCurrentPlayerBuildings(state);
    const result = nrOfHotels > 0 || nrOfHouses > 0;
    return result;
}

export const getTestableOptionsWithSellBuildings = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    const hasPlayerBuildings = hasCurrentPlayerBuildings(options!);
    if (!hasPlayerBuildings) {
        state.sellBuildings = { reason: SellBuildingsRejected.NoBuildings };
        return state;
    }
    const isInJail = isCurrentPlayerInJail(options);
    if (isInJail) {
        state.sellBuildings = { reason: SellBuildingsRejected.InJail}
        return state;
    }
    state.sellBuildings = []
    return state;
} 
