import { STATE_LOCATION } from "./const";
import { tSavedGames, tSaves } from "./types";

export const isStateNameTaken = (name:string) => {
    const gamesAsString = window.localStorage.getItem(STATE_LOCATION);
    if (gamesAsString === null) return false;
    const games = JSON.parse(gamesAsString);
    return (!!games?.[name]);
};

export const throwErrorIfNameTaken = (name: string) => {
    if (isStateNameTaken(name)) throw new Error(`Game name ${name} already taken`)
}

export const deleteGame = (toBeDeletedGameName: string) => {
    const games = getGames();
    delete games[toBeDeletedGameName];
    overwritteGames(games)

}

export const getGames = (): tSavedGames => {
    const gamesAsString = window.localStorage.getItem(STATE_LOCATION);
    if (gamesAsString === null) return {};
    return JSON.parse(gamesAsString);
}

export const getSavedGameNames = (): string[] => {
    const games = getGames();
    const names = Object.values(games).map(({name}) => name)
    return names;
}


export const overwritteGames = (saves: tSaves) => {
    window.localStorage.setItem(STATE_LOCATION, JSON.stringify(saves))
}
