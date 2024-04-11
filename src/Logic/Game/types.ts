import { tPlayerName } from "../Player/types"
import { iPlayerDescriptor } from "../Players/types"
import { TurnPhases } from "../types"

export type tGameConstructionArgs = {
    playersData: iPlayerDescriptor[]
}

export type tGameLogicState = {
    currentPlayer: tPlayerName,
    playersOrder: tPlayerName[],
    turnPhase: TurnPhases,
}
