import { createPath } from "../../../Functions/createPath";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { DoneThisTurn } from "../../types";
import { IS_MANDATORY, PAY, PAYLOAD, TYPE } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { getCurrentPlayer, isCurrentPlayerQueried } from "./commonFunctions";
import {tStateModifierArgs } from "./types";
import { checkIsOnGoToJailField } from "./utils";


export const GO_TO_JAIL_INDEX = 30;

const didCurrentPlayerAlreadyGoToJail = (state: tGameState) => {
    const {doneThisTurn} = state.game;
    const result = doneThisTurn.includes(DoneThisTurn.GoneToJail);
    return result
}

const checkIfPlayerInJail = (state: tGameState) => getCurrentPlayer(state).isInPrison;

const checkIfCurrentPlayerHasSpecialCard = (state: tGameState) => {
    const player = getCurrentPlayer(state);
    const result = player.specialCards.length;
    return result;
}

export const getGoToJailOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const isCurrentPlayer = isCurrentPlayerQueried(options!, playerName);
    const didPlayerAlreadyGoToJail = didCurrentPlayerAlreadyGoToJail(options!);
    const isOnGoToJailField = checkIsOnGoToJailField(options!);
    const isInPrison = checkIfPlayerInJail(options!)
    if (!isCurrentPlayer) return state;
    if (didPlayerAlreadyGoToJail) return state;
    if (!isOnGoToJailField) return state;
    if (isInPrison) return state;
    // const noJailConditions = [
    //     !isCurrentPlayer,
    //     didPlayerAlreadyGoToJail,
    //     !isOnGoToJailField,
    //     isInPrison,
    // ];
    // const shouldNotGoToJail = noJailConditions.some((condition) => !condition)
    // if (shouldNotGoToJail) { return state; }
    const actions = [
        { [TYPE]: OptionTypes.GoToJail },
    ]
    const hasGetOutOfJailCard = checkIfCurrentPlayerHasSpecialCard(options!)
    if (hasGetOutOfJailCard) {
        actions.push({ [TYPE]: OptionTypes.UseSpecialCard})
    }
    state.goToJail = {
        [IS_MANDATORY]: true,
        actions,
    }
    return state
}
