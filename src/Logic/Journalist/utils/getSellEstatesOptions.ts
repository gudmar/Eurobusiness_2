import BoardField from "../../../Components/Board/BoardField/BoardFiled";
import { iCityField, iNonCityEstates, tBoardField } from "../../../Data/types";
import { createPath } from "../../../Functions/createPath";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { tFieldState } from "../../boardTypes";
import { tObject } from "../../types";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types"
import { areBuildings, checkIfPlayerOwnsEveryEstate, getCountryBoardFieldsFromGameState, getPlayerColorFromPlayerName, getPlayerEstates, isPlayerInJail, processEachCountry } from "./commonFunctions";
import { tProcessEachCountryCalbackArgs, tStateModifierArgs } from "./types"

export enum SellEstatesReasons {
    InJail = 'Player in jail cannot sell estates',
    NotOwner = 'Player has to own an estate to sell it',
    Buildings = 'Player cannot sell an estate if any city in the country of the estate has buildings',
    Allowed = 'Player is privilaged to sell this estate'
}

const getQuotation = (boardField: tFieldState) => {
    if (!('price' in boardField) || !('isPlegded' in boardField)) throw new Error('Cannot get quotation for board field');
    const initilaPrice = boardField.isPlegded ? boardField.price / 4 : boardField.price / 2;
    return {
        reason: SellEstatesReasons.Allowed,
        initilaPrice
    }
}

type tEstateBoardField = iCityField | iNonCityEstates;

const calculateSellEstatePermits = (gameState: tGameState, playerName: string) => {
    const callback = ({
        gameState,
        countryName,
        countryBoardFields,
    }: tProcessEachCountryCalbackArgs) => {
        const playerColor = getPlayerColorFromPlayerName(gameState, playerName);
        const countryBoardFieldsFromGameState = getCountryBoardFieldsFromGameState(gameState, countryName);
        const doesPlayerOwnEveryEstate = checkIfPlayerOwnsEveryEstate(countryBoardFieldsFromGameState, playerColor!);
        const areAnyBuildings = areBuildings(countryBoardFieldsFromGameState);
        if (doesPlayerOwnEveryEstate && areAnyBuildings) {
            const result = {
                [countryName]: {
                    reason: SellEstatesReasons.Buildings
                }
            }
            return result;
        }
        const result = countryBoardFieldsFromGameState.reduce((acc: tObject<any>, boardField) => {
            if (!('owner' in boardField) || !('name' in boardField)) return acc;
            createPath(acc, [countryName, boardField.name])
            if (boardField.owner !== playerColor) {
                acc[countryName][boardField.name] = { reason: SellEstatesReasons.NotOwner }
                return acc;
            };
            const quotation = getQuotation(boardField);
            acc[countryName][boardField.name] = quotation;
            return acc;
        }, {})
        return result;
    }
    const result = processEachCountry(callback, gameState);
    return result;
}

export const getSellEstatesOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const hasCurrentPlayerEstates = getPlayerEstates(options!, playerName).length > 0;
    if (!hasCurrentPlayerEstates) return state;
    const isInJail = isPlayerInJail(options!, playerName);
    if (isInJail) {
        state.sellEstates = { reason: SellEstatesReasons.InJail }
        return state;
    }
    const sellEstatePermits = {
        isMandatory: false,
        type:  OptionTypes.AuctionEstate,
        payload: calculateSellEstatePermits(options!, playerName)
    }
    state.sellEstates = sellEstatePermits;
    return state;
}
