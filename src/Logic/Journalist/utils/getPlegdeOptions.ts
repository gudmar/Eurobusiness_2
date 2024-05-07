import { tJournalistOptionsUnderDevelopement } from "../types";
import { isCurrentPlayerEachEstatePlegded, isCurrentPlayerInJail } from "./commonFunctions";
import { tStateModifierArgs } from "./types";

export enum PlegdeEstatesReasons {
    EveryPlegded = 'Every estate owned by player is already plegded',
    InJail = 'When player is in jail, he cannot mortgage estates'
}

export const getPlegdeOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    if (!state) throw new Error('No game state passed to getPlegdeOptions')
    const isEveryPlegded = isCurrentPlayerEachEstatePlegded(options!);
    if (isEveryPlegded) {
        state.plegdeEstates = { reason: PlegdeEstatesReasons.EveryPlegded }
        return state;
    }
    const isInJail = isCurrentPlayerInJail(options!);
    if (isInJail) {
        state.plegdeEstates = {reason: PlegdeEstatesReasons.InJail}
        return state;
    }
    
    return state
}
