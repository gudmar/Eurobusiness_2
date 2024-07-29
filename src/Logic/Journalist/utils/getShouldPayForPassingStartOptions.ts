import { PASS_START_AMMOUNT } from "../../../Constants/constants";
import { createPath } from "../../../Functions/createPath";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { PassStartPayments } from "../../Player/types";
import { DoneThisTurn, TurnPhases } from "../../types";
import { ACTIONS, GET_MONEY, IS_MANDATORY, PASSING_START, PAY, PAYLOAD, REASON, TYPE } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement, tOption, tRejection } from "../types";
import { getCurrentPlayer, isPlayerInJail } from "./commonFunctions";
import { tStateModifierArgs } from "./types";

export enum PassingStartPaymentErrors {
    NotCurrentPlayer = "Only currently playing person is entitled to receive money for passing start",
    StillNotPassed = "You are standing on start field, but still you did not pass start",
    NotPassed = "You did not pass start this turn",
    NotGoodMoment = "Cannot receive pass start payment when not in after-move game phase",
    Forbidden = "Forbidden",
    AlreadyGotMoney = "Money was already payed",
    inJail = "Prisoners don't receive money for passing start",
}

const checkIfCurrentPlayer = (state: tGameState, playerName: string) => {
    const currentPlayerName = state.players.currentPlayersName;
    return currentPlayerName === playerName;
}

const isAlreadyPayedForStart = (state: tGameState) => {
    const result = state.game.doneThisTurn.includes(DoneThisTurn.GotMoneyForStart);
    return result;
}

const isJustStartPassedCase =  (state: tGameState) => {
    const { fieldNr, lastFieldNr, shouldPayForPassingStart } = getCurrentPlayer(state);
    if (shouldPayForPassingStart !== PassStartPayments.NotSet) return false;
    if (lastFieldNr === 0 && fieldNr > 0) return true;
    return lastFieldNr > fieldNr;
}

const didPassInBackwordDirection = (state: tGameState) => {
    const {fieldNr, lastFieldNr, shouldPayForPassingStart} = getCurrentPlayer(state);
    const result = lastFieldNr < fieldNr && shouldPayForPassingStart === PassStartPayments.ForceBackward;
    return result;
}

const PAYMENT = {
    [IS_MANDATORY]: true,
    [ACTIONS]: [
        {
            [TYPE]: OptionTypes.GetMoney,
            [PAYLOAD]: PASS_START_AMMOUNT,        
        }
    ]
}

const setReasonForNotGettingMoney = (options: tJournalistOptionsUnderDevelopement, description: PassingStartPaymentErrors) => {
    createPath(options, [GET_MONEY, PASSING_START, REASON]);
    (options[GET_MONEY]![PASSING_START] as tRejection)!.reason = description;
}

export const getShouldPayForPassingStartOptions = (args: tStateModifierArgs) => {
    const { options, state, playerName } = args;
    const isInJail = isPlayerInJail(options!, playerName);
    if (isInJail) {
        // setReasonForNotGettingMoney(state, PassingStartPaymentErrors.inJail);
        return state;
    }
    const isCurrentPlayer = checkIfCurrentPlayer(options!, playerName);
    if (!isCurrentPlayer) {
        setReasonForNotGettingMoney(state, PassingStartPaymentErrors.NotCurrentPlayer)
        return state;
    }
    const isPayedForStart = isAlreadyPayedForStart(options!)
    if (isPayedForStart) {
        setReasonForNotGettingMoney(state, PassingStartPaymentErrors.AlreadyGotMoney)
        return state;
    };
    const isAfterMove = options?.game.turnPhase === TurnPhases.AfterMove;
    if (!isAfterMove) {
        setReasonForNotGettingMoney(state, PassingStartPaymentErrors.NotGoodMoment)
        return state;
    }
    const isJustStartPassed = isJustStartPassedCase(options!);
    if (isJustStartPassed) {
        createPath(state, [GET_MONEY, PASSING_START]);
        (state[GET_MONEY]![PASSING_START] as tOption) = PAYMENT
        return state;
    }
    const isForbidden = getCurrentPlayer(options).shouldPayForPassingStart === PassStartPayments.DoNot;
    if (isForbidden) {
        setReasonForNotGettingMoney(state, PassingStartPaymentErrors.Forbidden)
        return state;
    }
    const isInBackwordDirection = didPassInBackwordDirection(options!);
    if (isInBackwordDirection) {
        createPath(state, [GET_MONEY, PASSING_START]);
        (state[GET_MONEY]![PASSING_START] as tOption) = PAYMENT
        return state;
    }
    createPath(state, [GET_MONEY, PASSING_START, REASON]);
    (state[GET_MONEY]![PASSING_START] as tRejection)!.reason = PassingStartPaymentErrors.NotPassed;
    return state;
};
