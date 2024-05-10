import { createPath } from "../../../Functions/createPath";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { tFieldState } from "../../boardTypes";
import { tObject } from "../../types";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { areBuildings, arePlegded, getCountryBoardFieldsFromGameState, getPlayerColorFromPlayerName, isCurrentPlayerEachEstatePlegded, isCurrentPlayerInJail, isPlayerEachEstatePlegded, processEachCountry } from "./commonFunctions";
import { tProcessEachCountryCalbackArgs, tStateModifierArgs } from "./types";

export enum PlegdeEstatesReasons {
    EveryPlegded = 'Every estate owned by player is already plegded',
    InJail = 'When player is in jail, he cannot mortgage estates',
    Plegded = 'Cannot plegde already plegded estates',
    Allowed = 'Allowed',
    Buildings = 'One may not plegde an estate with any buildings on it',
    NotOwner = 'Player may not plegde an estate when he is not an owner of the estate'
}

const getQuotation = (boardField: tFieldState) => {
    if (!('price' in boardField) || !('isPlegded' in boardField)) throw new Error('Cannot get quotation for board field');
    return {
        reason: PlegdeEstatesReasons.Allowed,
        price: boardField.mortgage
    }
}

const getPlegdeEstatesPermits = (gameState: tGameState, playerName: string) => {
    const callback = ({
        gameState,
        countryName,
    }: tProcessEachCountryCalbackArgs) => {
        const playerColor = getPlayerColorFromPlayerName(gameState, playerName);
        const countryBoardFieldsFromGameState = getCountryBoardFieldsFromGameState(gameState, countryName);
        const result = countryBoardFieldsFromGameState.reduce((acc: tObject<any>, boardField) => {
            if (!('owner' in boardField) || !('name' in boardField)) return acc;
            createPath(acc, [countryName, boardField.name])
            if (boardField.owner !== playerColor) {
                acc[countryName][boardField.name] = { reason: PlegdeEstatesReasons.NotOwner }
                return acc;
            };
            if ( areBuildings([boardField])) {
                acc[countryName][boardField.name] = { reason: PlegdeEstatesReasons.Buildings }
                return acc;
            }
            if ( arePlegded([boardField])) {
                acc[countryName][boardField.name] = { reason: PlegdeEstatesReasons.Plegded }
                return acc;
            }
            const quotation = getQuotation(boardField);
            acc[countryName][boardField.name] = quotation;
            return acc;
        }, {})
        return result;
    }
    const result = processEachCountry(callback, gameState);
    return result;
}


export const getPlegdeOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    if (!state) throw new Error('No game state passed to getPlegdeOptions')
    const isEveryPlegded = isPlayerEachEstatePlegded(options!, playerName);
    if (isEveryPlegded) {
        state.plegdeEstates = { reason: PlegdeEstatesReasons.EveryPlegded }
        return state;
    }
    const isInJail = isCurrentPlayerInJail(options!);
    if (isInJail) {
        state.plegdeEstates = {reason: PlegdeEstatesReasons.InJail}
        return state;
    }
    const plegdePermits = {
        isMandatory: false,
        type:  OptionTypes.Mortgage,
        payload: getPlegdeEstatesPermits(options!, playerName)
    }
    state.plegdeEstates = plegdePermits;
    return state
}
