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

// export type tSavedGameDescription = { name: string, description: string }

export type tSavedGame = tGameState & tSavedGameDescriptor;

export type tSavedGames = { [key: string] : tSavedGame }

export type tSaves = { [key: string]: tGameState }

export type tAllSavedGamesGetter = () => string[]

export type tSavedGameDescriptor = {
    name: string,
    description: string,
}

export type tRenameGameArgs = {
    originalName: string,
    newName: string,
    newDescription: string,
}
