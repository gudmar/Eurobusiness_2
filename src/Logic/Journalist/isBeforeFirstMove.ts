import { BANK } from "../../Data/const";
import { tGameState } from "../../Functions/PersistRetrieveGameState/types";
import { iCityFieldState, tFieldState } from "../boardTypes";
import { iPlayerSnapshot } from "../Player/types";

export const isBeforeFirstMove = (state: tGameState) => {
    const conditionFunctions = [
        isEachPropertyInBank,
        isEachPlayerOnStartField,
        isEachPlayersMoneyNotSpend,
        hasEachPlayerNoSpecialCards,
    ];
    const result = conditionFunctions.every((func) => {
        const result = func(state);
        return result;
    })
    return result;
}

const checkIfPlayers = (state: tGameState, checkPlayerStateFunction: (player: iPlayerSnapshot) => boolean) => {
    const isPlayer = state.players.every(checkPlayerStateFunction);
    return isPlayer;
}

const checkIfEstates = (state: tGameState, checkEstateStateFunction: (estate: tFieldState) => boolean) => {
    const isEstate = state.boardFields.every(checkEstateStateFunction);
    return isEstate;
}


const isEachPropertyInBank = (state: tGameState) => {
    const isEstateInBank = (estate: tFieldState) => {
        if ((estate as iCityFieldState)?.owner === undefined) return true;
        if ((estate as iCityFieldState)?.owner === BANK) return true;
        return false
    }
    const result = checkIfEstates(state, isEstateInBank);
    return result;
}

const isEachPlayerOnStartField = (state: tGameState) => {
    const checkPlayerStateFunction = (player: iPlayerSnapshot) => (player.fieldNr === 0);
    const result = checkIfPlayers(state, checkPlayerStateFunction);
    return result;
}

const isEachPlayersMoneyNotSpend = (state: tGameState) => {
    const checkPlayerStateFunction = (player: iPlayerSnapshot) => (player.money === 3000);
    const result = checkIfPlayers(state, checkPlayerStateFunction);
    return result;
}

const hasEachPlayerNoSpecialCards = (state: tGameState) => {
    const checkPlayerStateFunction = (player: iPlayerSnapshot) => (player.specialCards.length === 0);
    const result = checkIfPlayers(state, checkPlayerStateFunction);
    return result;
}
