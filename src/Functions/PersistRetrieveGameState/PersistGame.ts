import { getGames, overwritteGames, throwErrorIfNameTaken } from "./localStorageOperations"
import { tAllSavedGamesGetter, tSavedGameDescriptor } from "./types";
import { getGameState } from "./utils"

export const overwritteCurrentGameState = ({name, description}: tSavedGameDescriptor) => {
    const state = getGameState();
    const gameState = { ...state, name, description };
    const saves = getGames();
    console.log(gameState)
    const newSaves = {...saves, [name]: gameState }
    overwritteGames(newSaves);
}

export const saveCurrentGameState = ({name, description}: tSavedGameDescriptor) => {
    throwErrorIfNameTaken(name);
    overwritteCurrentGameState({name, description});
}

export const getAllSavedGameNames: tAllSavedGamesGetter = () => {
    const games = getGames();
    const names = Object.keys(games);
    return names;
}

export const getAllSavedGames = ():tSavedGameDescriptor[] => {
    const games = getGames();
    const names = Object.keys(games);
    const gameDescriptors = names.map((name) => ({name, description: (games[name].description  || '')}))
    return gameDescriptors;
}

export const getSavedGameDescription = (gameName: string) => {
    const games = getGames();
    const game = games[gameName];
    const description = game?.description || '';
    return description;
}
