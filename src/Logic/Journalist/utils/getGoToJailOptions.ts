import { createPath } from "../../../Functions/createPath";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { DoneThisTurn } from "../../types";
import { IS_MANDATORY, PAY, PAYLOAD, TYPE } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { getCurrentPlayer, isCurrentPlayerQueried } from "./commonFunctions";
import {tStateModifierArgs } from "./types";


export const GO_TO_JAIL_INDEX = 30;

const didCurrentPlayerAlreadyGoToJail = (state: tGameState) => {
    const {doneThisTurn} = state.game;
    const result = doneThisTurn.includes(DoneThisTurn.GoneToJail);
    return result
}
const checkIsOnGoToJailField = (state: tGameState) => {
    const {fieldNr} = getCurrentPlayer(state);
    return fieldNr === GO_TO_JAIL_INDEX;
}

const checkIfPlayerInJail = (state: tGameState) => getCurrentPlayer(state).isInPrison;

export const getGoToJailOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const isCurrentPlayer = isCurrentPlayerQueried(options!, playerName);
    const didPlayerAlreadyGoToJail = didCurrentPlayerAlreadyGoToJail(options!);
    const isOnGoToJailField = checkIsOnGoToJailField(options!);
    const isInPrison = checkIfPlayerInJail(options!)
    const noJailConditions = [
        !isCurrentPlayer,
        didPlayerAlreadyGoToJail,
        !isOnGoToJailField,
        isInPrison,
    ];
    if (noJailConditions) { return state; }
    state.goToJail = {
        [IS_MANDATORY]: true,
        [TYPE]: OptionTypes.GoToJail,
    }
    return state
}
