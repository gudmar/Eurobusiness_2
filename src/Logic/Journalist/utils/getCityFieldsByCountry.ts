import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { Players } from "../../Players/Players";
import { iGameState } from "../../StateEditorCaretaker/types";
import { tCityFieldsByCountry, tGetCityFieldByCountryArgs, tGetCityFieldByCountryIfOwnedByArgs } from "./types";

export const getCityFieldsByCountry = (args: tGetCityFieldByCountryArgs): tCityFieldsByCountry => {
    const { gameState, countryName } = args;
    const estates = gameState.boardFields;
    const report = estates.filter((estate) => {
        if (!('country' in estate)) return false;
        const result = estate.country === countryName;
        return result;
    }, [])
    return report as tCityFieldsByCountry;
}

export const currentPlayerColorFromNameInState = (state: iGameState) => {
    const { currentPlayerColor, players } = state;
    const currentPlayer = players.find(({color}) => (color === currentPlayerColor))
}

export const playerColorFromNameInState = (playerName: string, state: tGameState) => {
    const { players } = state;
    const color = players.find(({name}) => (name === playerName))?.color;
    return color;
}

export const getCityFieldsByCountryIfOwnedBy = (args: tGetCityFieldByCountryIfOwnedByArgs): tCityFieldsByCountry => {
    const { gameState, playerName } = args;
    console.log(Players.players)
    const playerColor = playerColorFromNameInState(playerName, gameState)
    // const playerColor = Players.playerNameToPlayerColor(playerName);
    const cities = getCityFieldsByCountry(args);
    const citiesOwned = cities.filter(({owner}) => owner === playerColor)
    const result = cities.length === citiesOwned.length ? cities : []
    return result;
}
