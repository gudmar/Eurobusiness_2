import { createPath } from "../../../Functions/createPath";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { roundToMultiplicity } from "../../../Functions/round";
import { tFieldState } from "../../boardTypes";
import { tObject, TurnPhases } from "../../types";
import { ACTIONS } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { areBuildings, arePlegded, getCountryBoardFieldsFromGameState, getPlayerColorFromPlayerName, isCurrentPlayerEachEstatePlegded, isCurrentPlayerInJail, isPlayerEachEstatePlegded, hasPlayerEachEstateUnplegded, processEachCountry, getPlayer } from "./commonFunctions";
import { tProcessEachCountryCalbackArgs, tStateModifierArgs } from "./types";

export enum UnplegdeEstatesReasons {
    EveryUnplegded = 'Nothing to buy out from mortgage',
    InJail = 'Not possible when player is in jail',
    Allowed = 'Allowed',
    NotOwner = 'Player has to be an owner',
    NoMoney = 'Player has not enough money to buy out this estate',
    NotGoodMoment = 'Cannot buyout from mortgage after move',
    WrongTurn = 'Cannot buyout from mortgage in another players turn'
}

const SMALLEST_DENOMINATION = 5;
const BANK_PROFIT_FACTOR = 1.1

const getQuotation = (boardField: tFieldState, playerMoney: number) => {
    if (!('price' in boardField) || !('isPlegded' in boardField)) throw new Error('Cannot get quotation for board field');
    if (!('mortgage' in boardField)) throw new Error('No mortgage field i boardField')
    const buyoutPrice = roundToMultiplicity(boardField.mortgage * BANK_PROFIT_FACTOR, SMALLEST_DENOMINATION);
    const isPlayerRitchEnough = playerMoney >= buyoutPrice;
    const reason = isPlayerRitchEnough ? UnplegdeEstatesReasons.Allowed : UnplegdeEstatesReasons.NoMoney
    return {
        reason,
        price: buyoutPrice
    }
}

const getUnplegdeEstatesPermits = (gameState: tGameState, playerName: string) => {
    const callback = ({
        gameState,
        countryName,
    }: tProcessEachCountryCalbackArgs) => {
        const player = getPlayer(gameState, playerName);
        const playerColor = player.color;
        const countryBoardFieldsFromGameState = getCountryBoardFieldsFromGameState(gameState, countryName);
        const result = countryBoardFieldsFromGameState.reduce((acc: tObject<any>, boardField) => {
            if (!('owner' in boardField) || !('name' in boardField)) return acc;
            createPath(acc, [countryName, boardField.name])
            if (boardField.owner !== playerColor) {
                acc[countryName][boardField.name] = { reason: UnplegdeEstatesReasons.NotOwner }
                return acc;
            };
            if ( !arePlegded([boardField])) {
                acc[countryName][boardField.name] = { reason: UnplegdeEstatesReasons.EveryUnplegded }
                return acc;
            };
            const quotation = getQuotation(boardField, player.money);
            acc[countryName][boardField.name] = quotation;
            return acc;
        }, {})
        return result;
    }
    const result = processEachCountry(callback, gameState);
    return result;
}


export const getUnplegdeOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    if (!state) throw new Error('No game state passed to getPlegdeOptions')
    const isEveryUnplegded = hasPlayerEachEstateUnplegded(options!, playerName);
    const isInJail = isCurrentPlayerInJail(options!);
    if (isInJail) {
        state.unplegdeEstates = {reason: UnplegdeEstatesReasons.InJail}
        return state;
    }
    if (isEveryUnplegded) {
        state.unplegdeEstates = { reason: UnplegdeEstatesReasons.EveryUnplegded }
        return state;
    }
    const isProperGamePhase = options!.game.turnPhase === TurnPhases.BeforeMove;
    if (!isProperGamePhase) {
        state.unplegdeEstates = { reason: UnplegdeEstatesReasons.NotGoodMoment }
        return state;
    }
    const isThisPlayersTurn = options!.players.currentPlayersName === playerName
    if (!isThisPlayersTurn) {
        state.unplegdeEstates = { reason: UnplegdeEstatesReasons.WrongTurn }
        return state;
    }
    const unplegdePermits = {
        isMandatory: false,
        [ACTIONS]: [
            {
                type:  OptionTypes.BuyOut,
                payload: getUnplegdeEstatesPermits(options!, playerName)

            }
        ]
    }
    state.unplegdeEstates = unplegdePermits;
    return state
}
