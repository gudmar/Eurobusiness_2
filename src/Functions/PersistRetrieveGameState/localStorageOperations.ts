import { STATE_LOCATION } from "./const";
import { tSaves } from "./types";
import { getGameState } from "./utils";

export const isStateNameTaken = (name:string) => {
    const gamesAsString = window.localStorage.getItem(STATE_LOCATION);
    if (gamesAsString === null) return false;
    const games = JSON.parse(gamesAsString);
    return (!!games?.[name]);
};

export const throwErrorIfNameTaken = (name: string) => {
    if (isStateNameTaken(name)) throw new Error(`Game name ${name} already taken`)
}

export const getGames = () => {
    const gamesAsString = window.localStorage.getItem(STATE_LOCATION);
    if (gamesAsString === null) return {};
    return JSON.parse(gamesAsString);
}


export const overwritteGames = (saves: tSaves) => {
    window.localStorage.setItem(STATE_LOCATION, JSON.stringify(saves))
}
