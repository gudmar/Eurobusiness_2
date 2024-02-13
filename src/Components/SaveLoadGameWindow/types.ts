import { tSavedGameDescriptor } from "../../Functions/PersistRetrieveGameState/types"

export type deleteMeType = any

export type tSavedGame = tSavedGameDescriptor

export type tSaveLoadGameState = {
    name: string, description: string, isSetDefault: boolean, savedGames: tSavedGame[], selectedGame: tSavedGame, searchFilter: string, filteredGames: string[]
}

export type tPayloadTypes = string | boolean | tSavedGame | string[] | tSavedGame[]

export enum SaveLoadGameTypes {
    setName = 'setName',
    setDescription = 'setDescription',
    toggleIsDefault = 'toggleIsDefault',
    setSavedGames = 'setSavedGames',
    setSelectedGame = 'setSelectedGame',
    setFilteredGames = 'setFilteredGames',
    search = 'search',
    log = 'log',
    dropSelection = 'dropSelection'
}

export type tActions = {
    type: SaveLoadGameTypes.search, payload: string 
} | {
    type: SaveLoadGameTypes.setName, payload: string
} | {
    type: SaveLoadGameTypes.setDescription, payload: string
} | {
    type: SaveLoadGameTypes.toggleIsDefault
} | {
    type: SaveLoadGameTypes.setSavedGames, payload: tSavedGame[]
} | {
    type: SaveLoadGameTypes.setSelectedGame, payload: tSavedGame
} | {
    type: SaveLoadGameTypes.setFilteredGames, payload: tSavedGame[]
} | {
    type: SaveLoadGameTypes.log
} | {
    type: SaveLoadGameTypes.dropSelection
}
