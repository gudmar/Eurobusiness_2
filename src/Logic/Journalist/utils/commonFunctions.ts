import { tBoardField, tBoardFieldName } from "../../../Data/types";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { getEstate } from "../../BoardCaretaker";
import { tFieldState } from "../../boardTypes";
import { tObject } from "../../types";
import { tStateModifierArgs } from "./types";
import { descriptors } from '../../../Data/boardFields';

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

export const getNrOfCurrentPlayerBuildings = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayer(state).name;
    const currentPlayerEstates = getPlayerEstates(state, currentPlayerName);
    const buildings = currentPlayerEstates.reduce((acc, item) => {
        if ('nrOfHouses' in item && 'nrOfHotels' in item) {
            const result = {
                nrOfHouses: acc.nrOfHouses + item.nrOfHouses,
                nrOfHotels: acc.nrOfHotels + item.nrOfHotels,
            };
            return result;
        }
        return acc;
    }, {nrOfHotels: 0, nrOfHouses: 0})
    return buildings;
}

export const getCurrentPlayerEstates = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayer(state).name;
    const currentPlayerEstates = getPlayerEstates(state, currentPlayerName);
    return currentPlayerEstates;
}

type tGetPlayerEstateCheckerConditionFunction = (estateDescriptor: tBoardField, boardFieldFromState: tFieldState) => boolean
export enum EstateCheckerVariant {
    None = 'No estate meets criteria',
    Each = 'Each estate meets cirteria',
    Some = 'Some estates meet cirteria',
    OwnesSome = 'Player ownes some estates'
}

export const getPlayerEstateChecker = (
        conditionFunction: tGetPlayerEstateCheckerConditionFunction,
        variant: EstateCheckerVariant,
    ) => 
        (playerName: string, gameState: tGameState) => {
    const playerColor = getPlayerColorFromPlayerName(gameState, playerName);
    const getFieldByName = (fieldName: string) => {
        const result = gameState.boardFields.find((field) => {
            if (field?.name === fieldName) return true;
            return false
        })
    }
    const reduced = gameState.boardFields.reduce((acc, boardField) => {
        const currentFieldName: tBoardFieldName = boardField?.name as tBoardFieldName;
        if (!currentFieldName) throw new Error(`Field ${currentFieldName} is not in descriptors`);
        const descriptor: tBoardField | undefined = descriptors?.[currentFieldName] as tBoardField;
        if (!('owner' in boardField)) return acc;
        if (boardField?.owner !== playerColor) return acc;
        const callbackResult = conditionFunction(descriptor, boardField);
        const result = {
            owned: acc.owned + 1,
            passingCondition: callbackResult ? acc.passingCondition + 1 : acc.passingCondition
        }
        return result;
    }, {owned: 0, passingCondition: 0})
    const checkSome = () => {
        const { owned, passingCondition } = reduced;
        if (passingCondition > 0) return true;
        return false;
    }
    const checkEach = () => {
        const { owned, passingCondition } = reduced;
        if (owned === 0 && owned !== passingCondition) return false
        return true;
    }
    const checkNone = () => {
        const { owned, passingCondition } = reduced;
        return passingCondition === 0
    }
    const checkOwnesSomeEstates = () => {
        const { owned, passingCondition } = reduced;
        return owned === 0
    }
    const checkers = {
        [EstateCheckerVariant.Each]: checkEach,
        [EstateCheckerVariant.None]: checkNone,
        [EstateCheckerVariant.Some]: checkSome,
        [EstateCheckerVariant.OwnesSome]: checkOwnesSomeEstates
    }
    const result = checkers[variant]();
    return result;
}

export const getCurrentPlayerEstateChecker = (
    conditionFunction: tGetPlayerEstateCheckerConditionFunction,
    variant: EstateCheckerVariant,
) => 
    (gameState: tGameState) => {
    const currentPlayerName = getCurrentPlayer(gameState).name;
    const checkerFunction = getPlayerEstateChecker(conditionFunction, variant);
    const result = checkerFunction(currentPlayerName, gameState);
    return result;
}

export const isCurrentPlayerOwnerOfSomeEstates = getCurrentPlayerEstateChecker(() => true, EstateCheckerVariant.OwnesSome);
export const isCurrentPlayerEachEstatePlegded = getCurrentPlayerEstateChecker((estateDescriptor: tBoardField, boardField: tFieldState) => {
    if (!('isPlegded' in boardField)) return true;
    const isPlegded = boardField?.isPlegded;
    return isPlegded;
}, EstateCheckerVariant.Each)
