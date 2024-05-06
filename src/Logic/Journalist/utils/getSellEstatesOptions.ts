import { tJournalistOptionsUnderDevelopement } from "../types"
import { getCurrentPlayerEstates } from "./commonFunctions";
import { tStateModifierArgs } from "./types"

export const getSellEstatesOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    const hasCurrentPlayerEstates = getCurrentPlayerEstates(options!).length > 0;
    if (!hasCurrentPlayerEstates) return state;
    return state;
}
