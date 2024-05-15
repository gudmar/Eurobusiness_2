import { PASS_START_AMMOUNT } from "../../../Constants/constants";
import { createPath } from "../../../Functions/createPath";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { PassStartPayments } from "../../Player/types";
import { TurnPhases } from "../../types";
import { GET_MONEY, IS_MANDATORY, PASSING_START, PAY, PAYLOAD, REASON, TYPE } from "../const";
import { OptionTypes, tOption, tRejection } from "../types";
import { getCurrentPlayer } from "./commonFunctions";
import { tStateModifierArgs } from "./types";

export enum PassingStartPaymentErrors {
    NotCurrentPlayer = "Only currently playing person is entitled to receive money for passing start",
    StillNotPassed = "You are standing on start field, but still you did not pass start",
    NotPassed = "You did not pass start this turn",
    NotGoodMoment = "Cannot receive pass start payment when not in after-move game phase",
    Forbidden = "Forbidden"
}

const checkIfCurrentPlayer = (state: tGameState, playerName: string) => {
    const currentPlayerName = state.game.currentPlayer;
    return currentPlayerName === playerName;
}

const isJustStartPassedCase =  (state: tGameState) => {
    const { fieldNr, lastFieldNr, shouldPayForPassingStart } = getCurrentPlayer(state);
    if (shouldPayForPassingStart !== PassStartPayments.NotSet) return false;
    if (lastFieldNr === 0 && fieldNr > 0) return true;
    return lastFieldNr > fieldNr;
}

export const getShouldPayForPassingStartOptions = (args: tStateModifierArgs) => {
    const { options, state, playerName } = args;
    const isCurrentPlayer = checkIfCurrentPlayer(options!, playerName);
    if (!isCurrentPlayer) {
        createPath(state, [GET_MONEY, PASSING_START, REASON]);
        (state[GET_MONEY]![PASSING_START] as tRejection)!.reason = PassingStartPaymentErrors.NotCurrentPlayer;
        return state;
    }
    const isAfterMove = options?.game.turnPhase === TurnPhases.AfterMove;
    if (!isAfterMove) {
        createPath(state, [GET_MONEY, PASSING_START, REASON]);
        (state[GET_MONEY]![PASSING_START] as tRejection)!.reason = PassingStartPaymentErrors.NotGoodMoment;
        return state;
    }
    const isJustStartPassed = isJustStartPassedCase(options!);
    if (isJustStartPassed) {
        createPath(state, [GET_MONEY, PASSING_START,]);
        (state[GET_MONEY]![PASSING_START] as tOption) = {
            [IS_MANDATORY]: true,
            [TYPE]: OptionTypes.GetMoney,
            [PAYLOAD]: PASS_START_AMMOUNT,
        }
        return state;
    }
    const isForbidden = getCurrentPlayer(options).shouldPayForPassingStart === PassStartPayments.DoNot;
    if (isForbidden) {
        createPath(state, [GET_MONEY, PASSING_START, REASON]);
        (state[GET_MONEY]![PASSING_START] as tRejection)!.reason = PassingStartPaymentErrors.Forbidden;
        return state;
    }
    return state;
};
