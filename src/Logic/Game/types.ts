import { iPlayersSnapshot } from "../Players/types"
import { DoneThisTurn, TurnPhases } from "../types"

export type tGameConstructionArgs = {
    playersData: iPlayersSnapshot
}

export type tGameLogicState = {
    // currentPlayer: tPlayerName,
    // playersOrder: tPlayerName[],
    turnPhase: TurnPhases,
    doneThisTurn: DoneThisTurn[],
}

export enum Messages {
    currentPlayerChanged = 'Current player changed',
    turnPhasesChanged = 'Turn phase changed',
    stateChanged = 'GameLogic State changed'
}
