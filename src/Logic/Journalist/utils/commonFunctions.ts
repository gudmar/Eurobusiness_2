import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { tObject } from "../../types";

export const getCurrentPlayerName = (state: tGameState) => state.game.currentPlayer;
export const getPlayerColorFromPlayerName = (state: tGameState, playerName: string) => {
    const currentPlayer = state.players.find(({name}) => {
        if (name === playerName) return true;
        return false;
    })
    return currentPlayer?.color
}
export const getCurrentPlayerColor = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayerName(state);
    const playerColor = getPlayerColorFromPlayerName(state, currentPlayerName);
    return playerColor;
}
export const getCurrentPlayer = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayerName(state);
    const currentPlayer = state.players.find((player) => player.name === currentPlayerName);
    if (!currentPlayer) throw new Error(`No player named ${currentPlayerName}`);
    return currentPlayer;
}

export const getCountryEstateNames = (state: tGameState, countryName: string) => {
    const result = state.boardFields.filter((estate) => {
        if ('country' in estate) { return estate.country === countryName }
        return false;
    }).map(({name}) => name)
    return result;
}

export const getPlayerEstates = (state: tGameState, playerName: string) => {
    const playerColor = getPlayerColorFromPlayerName(state, playerName);
    const playersEstates = state.boardFields.filter((estate) => {
        if ('owner' in estate) { return estate.owner === playerColor }
        return false;
    })
    return playersEstates
}

export const getEstatesIfPlayerOwnsWholeCountry = (state: tGameState, playerName: string) => {
    const playerEatates = getPlayerEstates(state, playerName);
    const getPlayerEstateNamesFromCountry = (country: string) => playerEatates.filter(
        (estate) => {
            if ('country' in estate) return estate.country === country;
            return false;
        }
    )
    const doesPlayerOwnAllEstatesInCountry = (countryName: string) => {
        const playerOwnedEstatesNamesFromCountry = getPlayerEstateNamesFromCountry(countryName);
        const estateNamesInCountry = getCountryEstateNames(state, countryName);
        return playerOwnedEstatesNamesFromCountry.length === estateNamesInCountry.length;
    }
    const countries = playerEatates.reduce((acc: tObject<unknown>, estate) => {
        if ('owner' in estate) {
            if (doesPlayerOwnAllEstatesInCountry(estate.country)) {
                acc[estate.name] = true;
            }
        }
        return acc
    }, {})
    const keys = Object.keys(countries);
    return keys;
}
export const getCurrentPlayerEstatesIfOwnsWholeCountry = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayerName(state);
    const result = getEstatesIfPlayerOwnsWholeCountry(state, currentPlayerName);
    return result;
}

export const isCurrentPlayerInJail = (state: tGameState) => getCurrentPlayer(state)?.isInPrison;
