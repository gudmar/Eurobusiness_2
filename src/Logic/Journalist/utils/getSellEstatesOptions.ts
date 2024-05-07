import BoardField from "../../../Components/Board/BoardField/BoardFiled";
import { tBoard, tBoardField } from "../../../Data/types";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { tObject } from "../../types";
import { tJournalistOptionsUnderDevelopement } from "../types"
import { getCurrentPlayer, getCurrentPlayerEstates, getPlayerColorFromPlayerName, isCurrentPlayerInJail, processEachCountry } from "./commonFunctions";
import { tProcessEachCountryCalbackArgs, tStateModifierArgs } from "./types"

export enum SellEstatesReasons {
    InJail = 'Player in jail cannot sell estates',
    NotOwner = 'Player has to own an estate to sell it',
    Buildings = 'Player cannot sell an estate if any city in the country of the estate has buildings',
    Allowed = 'Player is privilaged to sell this estate'
}

const areBuildings = (boardFields: tBoardField[]) => {
    const result = boardFields.some((boardField) => {
        if (!('nrOfHotels' in boardField)) return false;
        if (!('nrOfHouses' in boardField)) return false;
        const result = boardField.nrOfHotels > 0 || boardField.nrOfHouses > 0;
        return result;
    })
    return result;
}

const checkIfPlayerOwnsEveryEstate = (boardFields: tBoardField[], playerColor: string) => {
    const result = boardFields.every((boardField: tBoardField) => {
        if (!('owner' in boardField)) return false;
        return boardField.owner === playerColor
    })
    return result;
}

const getQuotation = (boardField: tBoardField) => {
    if (!('price' in boardField) || !('isPlegded' in boardField)) throw new Error('Cannot get quotation for board field');
    const initilaPrice = boardField.isPlegded ? boardField.price / 4 : boardField.price / 2;
    return {
        reason: SellEstatesReasons.Allowed,
        initilaPrice
    }
}

const calculateSellEstatePermits = (gameState: tGameState, playerName: string) => {
    const callback = ({
        gameState,
        countryName,
        countryBoardFields,
    }: tProcessEachCountryCalbackArgs) => {
        const playerColor = getPlayerColorFromPlayerName(gameState, playerName);
        const doesPlayerOwnEveryEstate = checkIfPlayerOwnsEveryEstate(countryBoardFields, playerColor!);
        const areAnyBuildings = areBuildings(countryBoardFields);
        if (doesPlayerOwnEveryEstate && areAnyBuildings) {
            const result = {
                [countryName]: {
                    reason: SellEstatesReasons.Buildings
                }
            }
            return result;
        }
        const result = countryBoardFields.reduce((acc: tObject<any>, boardField) => {
            if (!('owner' in boardField) && !('name' in boardField)) return acc;
            if (boardField.owner !== playerName) {
                acc[boardField.name] = { reason: SellEstatesReasons.NotOwner }
                return acc;
            };
            const quotation = getQuotation(boardField);
            acc[boardField.name] = quotation;
            return acc;
        }, {})
        return result;
    }
    const result = processEachCountry(callback, gameState);
    return result;
}

export const getSellEstatesOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    const currentPlayerName = getCurrentPlayer(options!).name;
    const hasCurrentPlayerEstates = getCurrentPlayerEstates(options!).length > 0;
    if (!hasCurrentPlayerEstates) return state;
    const isInJail = isCurrentPlayerInJail(options!);
    if (isInJail) {
        state.sellEstates = { reason: SellEstatesReasons.InJail }
        return state;
    }
    const sellEstatePermits = calculateSellEstatePermits(options!, currentPlayerName)
    state.sellEstates = sellEstatePermits;
    return state;
}
