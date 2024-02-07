import { getGames, overwritteGames, throwErrorIfNameTaken } from "./localStorageOperations"
import { tAllSavedGamesGetter, tSavedGameDescription } from "./types";
import { getGameState } from "./utils"

export const overwritteCurrentGameState = ({name, description}: tSavedGameDescription) => {
    const gameState = { ...getGameState(), name, description };
    const saves = getGames();
    const newSaves = {...saves, [name]: gameState }
    overwritteGames(newSaves);
}

export const saveCurrentGameState = ({name, description}: tSavedGameDescription) => {
    throwErrorIfNameTaken(name);
    overwritteCurrentGameState({name, description});
}

export const getAllSavedGameNames: tAllSavedGamesGetter = () => {
    const games = getGames();
    const names = Object.keys(games);
    return names;
}

export const getSavedGameDescription = (gameName: string) => {
    const games = getGames();
    const game = games[gameName];
    const description = game?.description || '';
    return description;
}
