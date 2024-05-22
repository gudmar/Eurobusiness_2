import { descriptors } from "../../../Data/boardFields";
import { DoneThisTurn, TurnPhases } from "../../types";
import { tJournalistOptionsUnderDevelopement } from "../types";
import { tStateModifierArgs } from "./types";

const BLUE_CHANCE_CARD_INDEXES = Object.values(descriptors).filter((card) => card).filter()

export const getDrawChanceCardOption = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const isBeforeMove = options?.game.turnPhase === TurnPhases.BeforeMove
    const isDoneThisTurn = options?.game.doneThisTurn.includes((item: DoneThisTurn) => item === DoneThisTurn.DrawnChanceCard)
    return state
}
