import { createPath } from "../../../Functions/createPath";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { roundToMultiplicity } from "../../../Functions/round";
import { tFieldState } from "../../boardTypes";
import { tObject, TurnPhases } from "../../types";
import { ACTIONS, IS_MANDATORY, PAYLOAD, TYPE } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { areBuildings, arePlegded, getCountryBoardFieldsFromGameState, getPlayerColorFromPlayerName, isCurrentPlayerEachEstatePlegded, isCurrentPlayerInJail, isPlayerEachEstatePlegded, hasPlayerEachEstateUnplegded, processEachCountry, getPlayer, isPlayerInJail } from "./commonFunctions";
import { tProcessEachCountryCalbackArgs, tStateModifierArgs } from "./types";

export enum SpecialCardsReasons {
    NotOwner="Cannot sell a get our from prison card, when player has no such card",
    Sell = "Able to sell get out of prison card", 
    Use = "You are in prison, you may use a get out of prison card now"
}

// const getQuotation = (boardField: tFieldState, playerMoney: number) => {
//     if (!('price' in boardField) || !('isPlegded' in boardField)) throw new Error('Cannot get quotation for board field');
//     if (!('mortgage' in boardField)) throw new Error('No mortgage field i boardField')
//     const buyoutPrice = roundToMultiplicity(boardField.mortgage * BANK_PROFIT_FACTOR, SMALLEST_DENOMINATION);
//     const isPlayerRitchEnough = playerMoney >= buyoutPrice;
//     const reason = isPlayerRitchEnough ? UnplegdeEstatesReasons.Allowed : UnplegdeEstatesReasons.NoMoney
//     return {
//         reason,
//         price: boardField.mortgage
//     }
// }

// const getUnplegdeEstatesPermits = (gameState: tGameState, playerName: string) => {
//     const callback = ({
//         gameState,
//         countryName,
//     }: tProcessEachCountryCalbackArgs) => {
//         const player = getPlayer(gameState, playerName);
//         const playerColor = player.color;
//         const countryBoardFieldsFromGameState = getCountryBoardFieldsFromGameState(gameState, countryName);
//         const result = countryBoardFieldsFromGameState.reduce((acc: tObject<any>, boardField) => {
//             if (!('owner' in boardField) || !('name' in boardField)) return acc;
//             createPath(acc, [countryName, boardField.name])
//             if (boardField.owner !== playerColor) {
//                 acc[countryName][boardField.name] = { reason: UnplegdeEstatesReasons.NotOwner }
//                 return acc;
//             };
//             if ( !arePlegded([boardField])) {
//                 acc[countryName][boardField.name] = { reason: UnplegdeEstatesReasons.EveryUnplegded }
//                 return acc;
//             };
//             const quotation = getQuotation(boardField, player.money);
//             acc[countryName][boardField.name] = quotation;
//             return acc;
//         }, {})
//         return result;
//     }
//     const result = processEachCountry(callback, gameState);
//     return result;
// }

const isPlayerOwneOfSpecialCard = (state: tGameState, playerName: string) => {
    const player = getPlayer(state, playerName);
    const hasPlayerSpecialCards = player.specialCards.length === 0;
    return hasPlayerSpecialCards;
}

const getPlayerSpecialCards = (state: tGameState, playerName: string): string[] => {
    const player = getPlayer(state, playerName);
    const cards = player.specialCards;
    return cards;
}

export const getSpecialCardsOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    if (!state) throw new Error('No game state passed to getGetOutFromPrisonCardOptions')
    const isPlayerOwnerOfASpecialCard = isPlayerOwneOfSpecialCard(options!, playerName);
    if (isPlayerOwnerOfASpecialCard) {
        state.specialCards = {reason: SpecialCardsReasons.NotOwner}
        return state;
    }
    const playersSpecialCards = getPlayerSpecialCards(options!, playerName);
    const isInJail = isPlayerInJail(options!, playerName);
    if (isInJail) {        
        return state
    }
    const specialCards = {
        [IS_MANDATORY]: false,
        [ACTIONS] : [
            {
                [PAYLOAD]: playersSpecialCards,
                [TYPE]: OptionTypes.SellSpecialCard,        
            }
        ]
    }
    return { ...state, specialCards }
}
