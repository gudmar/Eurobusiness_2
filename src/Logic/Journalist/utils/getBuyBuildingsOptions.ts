import { BUILDING_PURCHASE_LIMIT } from "../../../Constants/constants";
import { descriptors } from "../../../Data/boardFields";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { NR_OF_HOTELS_PURCHASED_IN_ROUND, NR_OF_HOUSES_PURCHASED_IN_TURN } from "../../Player/types";
import { tObject, TurnPhases } from "../../types";
import { ACTIONS } from "../const";
import { isBeforeFirstMove } from "../isBeforeFirstMove";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { getCurrentGamePhase, getCurrentPlayer, getCurrentPlayerEstatesIfOwnsWholeCountry, getCurrentPlayerName, getEstatesIfPlayerOwnsWholeCountry, getPlayer, isCurrentPlayerInJail, isPlayerInJail } from "./commonFunctions";
import { getBuildingPermitsForEachCountry } from "./getBuildingPermits";
import { tBuildingLimitKey, tStateModifierArgs } from "./types";

export enum NoBuildingPermitResults {
    GameNotStartedYet = 'Game is not satrted yet, player has no estates to build on.',
    NoFullCountries = 'Player should own all estaes in a city to purchase a building',
    HousePurchaseLimitReached = 'Player already bought 3 houses in a row',
    HotelPurcahseLimitReached = 'Player already bought 3 hotels in a row',
    InJail = 'Player cannot be in jail to purchase houses',
    NoMoney = 'Player does not have enough money to purchase buildings on estates he could',
    NotGoodMoment = 'Player may purchase buildings only in his turn, before move'
}

const getIsBuildingPurchaseLimitReached = (propKey: tBuildingLimitKey) => (state: tGameState, playerName: string) => {
    const currentPlayer = state.players.find(({name}) => name === playerName);
    if (currentPlayer === undefined) throw new Error(`No player named ${playerName}`);
    const limit = currentPlayer?.[propKey];
    return limit >= BUILDING_PURCHASE_LIMIT;
}

const isHousePurchaseTurnLimitReached = getIsBuildingPurchaseLimitReached(NR_OF_HOUSES_PURCHASED_IN_TURN);
const isHotelPurchaseRoundLimitReached = getIsBuildingPurchaseLimitReached(NR_OF_HOTELS_PURCHASED_IN_ROUND);


const addNoBuildingPermitsResult = (options: tJournalistOptionsUnderDevelopement, result: string) => options.buyBuildings = { reason : result };

const hasPlayerMoneyToBuyBuildings = (state: tGameState, playerName: string) => {
    const fullCountryEstateNames = getCurrentPlayerEstatesIfOwnsWholeCountry(state);
    if (fullCountryEstateNames.length === 0) return true;
    const { name, color, money } = getPlayer(state, playerName);
    const boardFieldDescriptors: tObject<any> = descriptors;
    const result = fullCountryEstateNames.reduce((acc, estateName: any) => {
        if (acc === true) return acc;
        const estate = boardFieldDescriptors[estateName];
        if ('housePrice' in estate) {
            if (estate.housePrice <= money) return true;
        }
        return false;
    }, false)
    return result
}

const isGoodMomentToBuyBuilding = (state: tGameState, playerName: string) => {
    const isPlayerTurn = getCurrentPlayer(state).name === playerName;
    const isBeforeMove = getCurrentGamePhase(state) === TurnPhases.BeforeMove;
    return isPlayerTurn && isBeforeMove;
}

export const getTestableOptionsWithBuyBuildings = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const isGameNotStartedYet = isBeforeFirstMove(options!);
    if (isGameNotStartedYet) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.GameNotStartedYet)
        return state;
    }
    const isGoodModmentForBuilding = isGoodMomentToBuyBuilding(options!, playerName!);
    if (!isGoodModmentForBuilding) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.NotGoodMoment)
        return state;
    }
    const playerOwnedCountryNames = getEstatesIfPlayerOwnsWholeCountry(options!, playerName);
    if (playerOwnedCountryNames.length === 0) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.NoFullCountries);
        return state;
    }
    const isHousePurchaseLimitReached = isHousePurchaseTurnLimitReached(options!, playerName)
    if (isHousePurchaseLimitReached) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.HousePurchaseLimitReached);
        return state;
    }
    const isHotelPurchaseLimitReached = isHotelPurchaseRoundLimitReached(options!, playerName)
    if (isHotelPurchaseLimitReached) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.HotelPurcahseLimitReached);
        return state;
    }
    const isInJail = isPlayerInJail(options!, playerName)
    if (isInJail) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.InJail);
        return state;
    }
    const hasPlayerEnoughMoney = hasPlayerMoneyToBuyBuildings(options!, playerName);
    if (!hasPlayerEnoughMoney) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.NoMoney);
        return state;
    }
    const permits = getBuildingPermitsForEachCountry(options!, getPlayer(options!, playerName).name)
    state.buyBuildings = {
        isMandatory: false,
        [ACTIONS]: [
            {
                type: OptionTypes.BuyBuildings,
                payload: permits,
            }
        ]
    }
    return state ;
}