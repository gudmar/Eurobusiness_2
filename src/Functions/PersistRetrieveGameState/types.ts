import { tColors } from "../../Data/types"
import { tBankState } from "../../Logic/Bank/types"
import { tField } from "../../Logic/boardTypes"
import { tChanceCardState } from "../../Logic/Chance/ChanceCardHolder"
import { tDiceState } from "../../Logic/Dice/types"
import { iPlayerSnapshot } from "../../Logic/Player/types"

export type tPartialPlayer = Partial<Record<tColors, iPlayerSnapshot>>

export type tGameState = {
    players: tPartialPlayer,
    dice: tDiceState,
    bank: tBankState,
    chanceCards: { [key: string ]: tChanceCardState}
    boardFields: tField[]
}

export type tSaves = { [key: string]: tGameState }