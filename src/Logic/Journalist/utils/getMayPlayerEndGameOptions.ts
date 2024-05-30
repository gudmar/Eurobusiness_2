import { getAllEntreisWithKey } from "../../../Functions/getAllEntriesWithKey";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { TurnPhases } from "../../types";
import { ACTIONS, IS_MANDATORY, REASON, TYPE } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { isPlayerInJail } from "./commonFunctions";
import { tStateModifierArgs } from "./types";

export enum NoTurnEndReasons {
    MandatoryAction = 'Player has a mandatory action to perform',
    MoveFirst = 'Player should move first'
}

const getNrOfMandatoryActions = (options: tJournalistOptionsUnderDevelopement) => {
    const mandatoryEntries = getAllEntreisWithKey( options, IS_MANDATORY);
    const mandatoryActions = mandatoryEntries.filter(({value}) => !!value)
    const nrOfActions = mandatoryActions.length;
    return nrOfActions;
}

export const getMayPlayerEndTurnOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    // This should be the last function
    const { options, state, playerName } = args;
    const nrOfMandatoryActions = getNrOfMandatoryActions(state);
    const isAfterMove = options?.game?.turnPhase === TurnPhases.AfterMove;
    const isInJail = isPlayerInJail(options!, playerName);
    if (isInJail) {
        state.endTurn = {
            [IS_MANDATORY]: true,
            [ACTIONS]: [
                {
                    [TYPE]: OptionTypes.EndTurn,
                }
            ]
        }
        return state;
    }
    if (!isAfterMove) {
        state.endTurn = {[REASON]: NoTurnEndReasons.MoveFirst}
        return state;
    }
    if (nrOfMandatoryActions > 0) {
        state.endTurn = {[REASON]: NoTurnEndReasons.MandatoryAction}
        return state;
    }
    const endTurn = {
        [IS_MANDATORY]: false,
        [ACTIONS]: [
            {
                [TYPE]: OptionTypes.EndTurn,
            }
        ]
    }
    state.endTurn = endTurn;
    return state;
}
