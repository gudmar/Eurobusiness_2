import { BANK } from "../../../Data/const";
import { GUARDED_PARKING_FEE, TAX_FEE } from "../../../Data/fees";
import { createPath } from "../../../Functions/createPath";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { DoneThisTurn, TurnPhases } from "../../types";
import { IS_MANDATORY, PAY, PAYLOAD, TYPE } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { getCurrentPlayer } from "./commonFunctions";
import { tStateModifierArgs } from "./types";

export const TAX_FIELD_INDEX = 38;
export const GUARDED_PARKING_FIELD_INDEX = 4;

const TAXABLE_FIELD_INDEX_TO_FEE_MAP = {
    [TAX_FIELD_INDEX]: TAX_FEE,
    [GUARDED_PARKING_FIELD_INDEX]: GUARDED_PARKING_FEE,
}
type tTaxableFieldIndexes = typeof TAX_FIELD_INDEX | typeof GUARDED_PARKING_FIELD_INDEX
const TAX_FIELD_INDEXES = Object.keys(TAXABLE_FIELD_INDEX_TO_FEE_MAP).map((index) => parseInt(index))

const checkIfOnTaxableField = (options: tGameState) => {
    const currentPlayer = getCurrentPlayer(options);
    const isOnTaxableField = TAX_FIELD_INDEXES.includes(currentPlayer.fieldNr);
    return isOnTaxableField;
}

const isCurrentPlayerQueried = (options: tGameState, playerName: string) => {
    const currentPlayerName = getCurrentPlayer(options).name;
    const result = currentPlayerName === playerName
    return result;
}

const getTaxFee = (options: tGameState) => {
    const currentPlayerIndex = getCurrentPlayer(options).fieldNr;
    const result = TAXABLE_FIELD_INDEX_TO_FEE_MAP[currentPlayerIndex as tTaxableFieldIndexes]
    if (!result) throw new Error(`Cannot map current field index ${currentPlayerIndex} to tax fee`)
    return result;
}

const checkIfGoodMomentForPayment = (options: tGameState) => {
    const {doneThisTurn, turnPhase} = options.game;
    if (turnPhase !== TurnPhases.AfterMove) return false;
    if (doneThisTurn.includes(DoneThisTurn.PayedForVisit)) return false;
    return true;
}

export const getPaymentOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const isCurrentPlayer = isCurrentPlayerQueried(options!, playerName);
    if (!isCurrentPlayer) {
        return state;
    }
    const isGoodMomentForPayment = checkIfGoodMomentForPayment(options!);
    if (!isGoodMomentForPayment) return state;
    const isOnTaxableField = checkIfOnTaxableField(options!);
    if (isOnTaxableField) {
        const payment = {
            [IS_MANDATORY]: true,
            [TYPE]: OptionTypes.Pay,
            [PAYLOAD]: {
                target: BANK,
                ammount: getTaxFee(options!)
            }
        };
        createPath(state, [PAY]);
        state.pay!.visigingOtherPlayersEstate = payment;
        return state;
    }
    return state
}
