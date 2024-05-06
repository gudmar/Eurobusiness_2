import { tJournalistOptionsUnderDevelopement } from "../types";
import { isCurrentPlayerEachEstatePlegded } from "./commonFunctions";
import { tStateModifierArgs } from "./types";

export enum PlegdeEstatesReasons {
    EveryPlegded = 'Every estate owned by player is already plegded',
}

export const getPlegdeOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    if (!state) throw new Error('No game state passed to getPlegdeOptions')
    const isEveryPlegded = isCurrentPlayerEachEstatePlegded(options!);
    if (isEveryPlegded) {
        state.plegdeEstates = { reason: PlegdeEstatesReasons.EveryPlegded }
        return state;
    }
    return state
}
