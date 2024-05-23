import { BANK } from "../../../Data/const";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { DoneThisTurn, TurnPhases } from "../../types";
import { IS_MANDATORY, PAYLOAD, TYPE } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { getFieldCurrentPlayerStandsOn, getFieldData, getPlayerFromState } from "./commonFunctions";
import { tStateModifierArgs } from "./types";

const checkIfCanBeBought = (state: tGameState, playerName: string) => {
    const player = getPlayerFromState(state);
    const field = state.boardFields[player!.fieldNr];
    if (!('owner' in field)) return false;
    const isCurrentPlayer = state.game.currentPlayer === playerName;
    const isGoodMoment = state.game.turnPhase === TurnPhases.AfterMove;
    const notDoneYet = !state.game.doneThisTurn.includes(DoneThisTurn.BoughtEstate)
    const isBankProperty = field.owner === BANK;
    const canBePurchased = [
        isCurrentPlayer, isGoodMoment, notDoneYet, isBankProperty
    ].every((val) => !!val)
    return canBePurchased;
}

export const getStoppedOnBankOwnedEstateOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const canBePurchased = checkIfCanBeBought(options!, playerName);
    if (canBePurchased) {
        const field = getFieldCurrentPlayerStandsOn(options!);
        if (!('name' in field)) return state;
        state.buyEstate = {
            [IS_MANDATORY]: true,
            [TYPE]: OptionTypes.BuyEstate,
            [PAYLOAD]: field,
        };
        return state;
    }
    return state;
}
