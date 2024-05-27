import { descriptors } from "../../../Data/boardFields";
import { CHANCE_BLUE, CHANCE_RED } from "../../../Data/const";
import { DoneThisTurn, TurnPhases } from "../../types";
import { ACTIONS, IS_MANDATORY, PAYLOAD, TYPE } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { getCurrentPlayer, getFieldIndexesOfType } from "./commonFunctions";
import { tStateModifierArgs } from "./types";

export const getDrawChanceCardOption = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const BLUE_CHANCE_CARD_INDEXES = getFieldIndexesOfType(options!, CHANCE_BLUE);
    const RED_CHANCE_CARD_INDEXES = getFieldIndexesOfType(options!, CHANCE_RED);
    const currentPlayer = getCurrentPlayer(options!);
    const isCurrentPlayer = currentPlayer.name === playerName;
    const isBeforeMove = options?.game.turnPhase === TurnPhases.BeforeMove
    const isDoneThisTurn = options?.game.doneThisTurn.includes(DoneThisTurn.DrawnChanceCard);
    const isOnRedChanceField = RED_CHANCE_CARD_INDEXES.includes(currentPlayer.fieldNr)
    const isOnBlueChanceField = BLUE_CHANCE_CARD_INDEXES.includes(currentPlayer.fieldNr)
    const noChanceCard = [
        !isCurrentPlayer,
        isBeforeMove,
        isDoneThisTurn
    ].some((condition) => condition);
     if (noChanceCard) return state;
     if (isOnBlueChanceField) {
        state.drawChanceCard = {
            [IS_MANDATORY]: true,
            [ACTIONS]: [
                {
                    [TYPE]: OptionTypes.DrawChanceCard,
                    [PAYLOAD]: CHANCE_BLUE        
                }
            ]
        }
    return state
     }
     if (isOnRedChanceField) {
        state.drawChanceCard = {
            [IS_MANDATORY]: true,
            [ACTIONS]: [
                {
                    [TYPE]: OptionTypes.DrawChanceCard,
                    [PAYLOAD]: CHANCE_RED        
                }
            ]
        }
        return state
     }
return state
}
