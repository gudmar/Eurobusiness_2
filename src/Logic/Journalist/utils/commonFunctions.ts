import { tBoardField, tBoardFieldName } from "../../../Data/types";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { tFieldState } from "../../boardTypes";
import { tObject } from "../../types";
import { tProcessEachCountryCallback } from "./types";
import { descriptors } from '../../../Data/boardFields';
import { mapEstatesToCountries } from "../../../Functions/mapCitiesToCountries";
import { PLANT, RAILWAY } from "../../../Data/const";
import { isDefined } from "../../../Functions/isDefined";

export const getCurrentPlayerName = (state: tGameState) => state.players.currentPlayersName;

export const getPlayer = (state: tGameState, playerName: string) => {
    const player = state.players.playersList.find(({name}) => name === playerName);
    if (!player) throw new Error(`Cannot find player named ${playerName}`)
    return player;
}

export const getPlayerByColor = (state: tGameState, playerColor: string) => {
    const player = state.players.playersList.find(({color}) => color === playerColor);
    if (!player) throw new Error(`Cannot find player with color ${playerColor}`)
    return player;
}

export const getPlayerColorFromPlayerName = (state: tGameState, playerName: string) => {
    const currentPlayer = getPlayer(state, playerName);
    return currentPlayer?.color
}
export const getCurrentPlayerColor = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayerName(state);
    const playerColor = getPlayerColorFromPlayerName(state, currentPlayerName);
    return playerColor;
}
export const getCurrentPlayer = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayerName(state);
    const currentPlayer = state.players.playersList.find((player) => player.name === currentPlayerName);
    if (!currentPlayer) throw new Error(`No player named ${currentPlayerName}`);
    return currentPlayer;
}

export const getCurrentGamePhase = (state: tGameState) => {
    const phase = state.game.turnPhase;
    return phase;
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
export const isPlayerInJail = (state: tGameState, playerName: string) => getPlayer(state, playerName)?.isInPrison;

export const getNrOfPlayerBuildings = (state: tGameState, playerName: string) => {
    const currentPlayerEstates = getPlayerEstates(state, playerName);
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
        const result: any = {
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
        if (owned === 0 || owned !== passingCondition) return false
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

export const getCountryBoardFieldsFromGameState = (gameState: tGameState, countryName: string): tFieldState[] => {
    const result = gameState.boardFields.filter((filed) => {
        if (!('country' in filed)) { return false }
        if (filed.country === countryName) return true;
        return false;
    })
    return result;
}

export const arePlegded = (boardFields: tFieldState[]) => {
    const result = boardFields.some((boardField) => {
        if (!('isPlegded' in boardField)) return false;
        const result = boardField.isPlegded;
        return result;
    })
    return result;
}

export const areBuildings = (boardFields: tFieldState[]) => {
    const result = boardFields.some((boardField) => {
        if (!('nrOfHotels' in boardField)) return false;
        if (!('nrOfHouses' in boardField)) return false;
        const result = boardField.nrOfHotels > 0 || boardField.nrOfHouses > 0;
        return result;
    })
    return result;
}

export const checkIfPlayerOwnsEveryEstate = (boardFields: tFieldState[], playerColor: string) => {
    const result = boardFields.every((boardField: tFieldState) => {
        if (!('owner' in boardField)) return false;
        return boardField.owner === playerColor
    })
    return result;
}


export const getNamedPlayerEstateChecker = (
    conditionFunction: tGetPlayerEstateCheckerConditionFunction,
    variant: EstateCheckerVariant,
) => 
    (gameState: tGameState, playerName: string) => {
    const checkerFunction = getPlayerEstateChecker(conditionFunction, variant);
    const result = checkerFunction(playerName, gameState);
    return result;
}

export const isPlayerOwnerOfSomeEstates = getNamedPlayerEstateChecker(() => true, EstateCheckerVariant.OwnesSome);
export const isPlayerEachEstatePlegded =  getNamedPlayerEstateChecker((estateDescriptor: tBoardField, boardField: tFieldState) => {
    if (!('isPlegded' in boardField)) return true;
    const isPlegded = boardField?.isPlegded;
    return isPlegded;
}, EstateCheckerVariant.Each)

export const hasPlayerEachEstateUnplegded =  getNamedPlayerEstateChecker((estateDescriptor: tBoardField, boardField: tFieldState) => {
    if (!('isPlegded' in boardField)) return true;
    const isUnplegded = boardField?.isPlegded === false;
    return isUnplegded;
}, EstateCheckerVariant.Each)


export const isCurrentPlayerOwnerOfSomeEstates = getCurrentPlayerEstateChecker(() => true, EstateCheckerVariant.OwnesSome);
export const isCurrentPlayerEachEstatePlegded = getCurrentPlayerEstateChecker((estateDescriptor: tBoardField, boardField: tFieldState) => {
    if (!('isPlegded' in boardField)) return true;
    const isPlegded = boardField?.isPlegded;
    return isPlegded;
}, EstateCheckerVariant.Each)

export const processEachCountry = (callback: tProcessEachCountryCallback, gameState: tGameState) => {
    const countries = mapEstatesToCountries();
    const countryEntries = Object.entries(countries);
    const processedCountries = countryEntries.reduce((acc, [countryName, cities]) => {
        const processedCountry = callback({
            gameState, countryName, countryBoardFields: cities
        });
        return {...acc, ...processedCountry}
    }, {});
    return processedCountries;
}

export const getFieldIfOwned = (state: tGameState, playerName: string) => {
    const {fieldNr} = getPlayer(state, playerName);
    const field = state.boardFields[fieldNr];
    if (!('owner' in field)) return null;
    return field;
}

type tFieldName = keyof typeof descriptors;
export const getFieldData = (fieldName: string) => {
    const result = descriptors[fieldName  as tFieldName]
    if (!result) throw new Error(`There is no field named ${fieldName}`)
    return result;
}

const getPlayerColorFromNameOrColor = (state: tGameState, playerNameOrColor: string ) => {
    const player = state.players.playersList.find(({color, name}) => playerNameOrColor === color || playerNameOrColor === name);
    if (!state) throw new Error(`player ${playerNameOrColor} not found`)
    return player?.color
}

type tGetNrEstatesOfTypeArgs = { state: tGameState, playerNameOrColor: string, type: string}

export const getNrOfEstatesOfType = ({state, playerNameOrColor, type}: tGetNrEstatesOfTypeArgs) => {
    const playerColor = getPlayerColorFromNameOrColor(state, playerNameOrColor);
    const railwayFieldsOwnedByPlayer = state.boardFields.filter((field) => {
        if (!('owner' in field && 'type' in field)) return false;
        return field.owner === playerColor && field.type === type;
    })
    return railwayFieldsOwnedByPlayer.length;
}

export const getNrRailwaysPlayerOwns = (state: tGameState, playerNameOrColor: string) => {
    const result = getNrOfEstatesOfType({ state, playerNameOrColor, type: RAILWAY});
    return result
}

export const getNrPlantsPlayerOwns = (state: tGameState, playerNameOrColor: string) => {
    const result = getNrOfEstatesOfType({ state, playerNameOrColor, type: PLANT});
    return result
}

export const getFieldIndexesOfType = (state: tGameState, fieldType: string): number[] => {
    const fields = state.boardFields;
    descriptors
    const result = fields.reduce((acc: number[], field, index) => {
        if (!('type' in field)) return acc;
        if (field.type.includes(fieldType)) acc.push(index);
        return acc;
    }, [])
    return result;
}

export const getPlayerFromState = (state: tGameState) => {
    const player = state.players.playersList.find(({name}) => name === state.players.currentPlayersName);
    if (!isDefined(player)) throw new Error(`Player ${name} not defined`)
    return player
}

export const getFieldCurrentPlayerStandsOn = (state: tGameState) => {
    const player = getPlayerFromState(state);
    const field = state.boardFields[player!.fieldNr];
    return field;
}

export const isCurrentPlayerQueried = (options: tGameState, playerName: string) => {
    const currentPlayerName = getCurrentPlayer(options).name;
    const result = currentPlayerName === playerName
    return result;
}
