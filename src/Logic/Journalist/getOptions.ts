import { BUILDING_PURCHASE_LIMIT } from "../../Constants/constants"
import { descriptors } from "../../Data/boardFields"
import { tBoard, tBoardField } from "../../Data/types"
import { applyStateModifiers, tStateModifier } from "../../Functions/applyStateModifiers"
import { tGameState } from "../../Functions/PersistRetrieveGameState/types"
import { NR_OF_HOTELS_PURCHASED_IN_ROUND, NR_OF_HOUSES_PURCHASED_IN_TURN } from "../Player/types"
import { tObject } from "../types"
import { isBeforeFirstMove } from "./isBeforeFirstMove"
import { tJournalistOptionsUnderDevelopement, tJournalistState } from "./types"
import { getBuildingPermits, getBuildingPermitsForEachCountry } from "./utils/getBuildingPermits"


const BLANK_REJECTION = { reason: 'Dummy rejection' }

const BLANK_TESTABLE_OPTIONS_OUTPUT: tJournalistState = {
    buyBuildings:  BLANK_REJECTION,
    sellBuildings: BLANK_REJECTION,
    // buyEstate
    sellEstates: BLANK_REJECTION,
    plegdeEstates: BLANK_REJECTION,
    unplegdeEstates: BLANK_REJECTION,
    move: false,
    endPhase: false,
    // pay
    // getMoney
    // goToJail
}

export enum NoBuildingPermitResults {
    GameNotStartedYet = 'Game is not satrted yet, player has no estates to build on.',
    NoFullCountries = 'Player should own all estaes in a city to purchase a building',
    HousePurchaseLimitReached = 'Player already bought 3 houses in a row',
    HotelPurcahseLimitReached = 'Player already bought 3 hotels in a row',
    InJail = 'Player cannot be in jail to purchase houses',
    NoMoney = 'Player does not have enough money to purchase buildings on estates he could'
}

type tStateModifierArgs = {state: tJournalistOptionsUnderDevelopement, options?: tGameState}

const addNoBuildingPermitsResult = (options: tJournalistOptionsUnderDevelopement, result: string) => options.buyBuildings = { reason : result };
const getCurrentPlayerName = (state: tGameState) => state.game.currentPlayer;
const getPlayerColorFromPlayerName = (state: tGameState, playerName: string) => {
    const currentPlayer = state.players.find(({name}) => {
        if (name === playerName) return true;
        return false;
    })
    return currentPlayer?.color
}
const getCurrentPlayerColor = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayerName(state);
    const playerColor = getPlayerColorFromPlayerName(state, currentPlayerName);
    return playerColor;
}
const getCurrentPlayer = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayerName(state);
    const currentPlayer = state.players.find((player) => player.name === currentPlayerName);
    if (!currentPlayer) throw new Error(`No player named ${currentPlayerName}`);
    return currentPlayer;
}

const getCountryEstateNames = (state: tGameState, countryName: string) => {
    const result = state.boardFields.filter((estate) => {
        if ('country' in estate) { return estate.country === countryName }
        return false;
    }).map(({name}) => name)
    return result;
}

const getPlayerEstates = (state: tGameState, playerName: string) => {
    const playerColor = getPlayerColorFromPlayerName(state, playerName);
    const playersEstates = state.boardFields.filter((estate) => {
        if ('owner' in estate) { return estate.owner === playerColor }
        return false;
    })
    return playersEstates
}

const getEstatesIfPlayerOwnsWholeCountry = (state: tGameState, playerName: string) => {
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
const getCurrentPlayerEstatesIfOwnsWholeCountry = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayerName(state);
    const result = getEstatesIfPlayerOwnsWholeCountry(state, currentPlayerName);
    return result;
}
type tBuildingLimitKey = 'nrOfHotelsPurchasedInRound' | 'nrOfHousesPurchasedInTurn';

const getIsBuildingPurchaseLimitReached = (propKey: tBuildingLimitKey) => (state: tGameState) => {
    const currentPlayerName = getCurrentPlayerName(state);
    const currentPlayer = state.players.find(({name}) => name === currentPlayerName);
    if (currentPlayer === undefined) throw new Error(`No player named ${currentPlayerName}`);
    const limit = currentPlayer?.[propKey];
    return limit >= BUILDING_PURCHASE_LIMIT;
}

const isHousePurchaseTurnLimitReached = getIsBuildingPurchaseLimitReached(NR_OF_HOUSES_PURCHASED_IN_TURN);
const isHotelPurchaseRoundLimitReached = getIsBuildingPurchaseLimitReached(NR_OF_HOTELS_PURCHASED_IN_ROUND);
const isCurrentPlayerInJail = (state: tGameState) => getCurrentPlayer(state)?.isInPrison;
const hasPlayerMoneyToBuyBuildings = (state: tGameState) => {
    const fullCountryEstateNames = getCurrentPlayerEstatesIfOwnsWholeCountry(state);
    if (fullCountryEstateNames.length === 0) return true;
    const { name, color, money } = getCurrentPlayer(state);
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


const getTestableOptionsWithBuyBuildings = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    const isGameNotStartedYet = isBeforeFirstMove(options!);
    if (isGameNotStartedYet) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.GameNotStartedYet)
        return state;
    }
    const playerOwnedCountryNames = getCurrentPlayerEstatesIfOwnsWholeCountry(options!);
    if (playerOwnedCountryNames.length === 0) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.NoFullCountries);
        return state;
    }
    const isHousePurchaseLimitReached = isHousePurchaseTurnLimitReached(options!)
    if (isHousePurchaseLimitReached) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.HousePurchaseLimitReached);
        return state;
    }
    const isHotelPurchaseLimitReached = isHotelPurchaseRoundLimitReached(options!)
    if (isHotelPurchaseLimitReached) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.HotelPurcahseLimitReached);
        return state;
    }
    const isInJail = isCurrentPlayerInJail(options!)
    if (isInJail) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.InJail);
        return state;
    }
    const hasPlayerEnoughMoney = hasPlayerMoneyToBuyBuildings(options!);
    if (!hasPlayerEnoughMoney) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.NoMoney);
        return state;
    }
    const permits = getBuildingPermitsForEachCountry(options!, getCurrentPlayer(options!).name)
    state.buyBuildings = permits
    return state ;
}
const getTestableOptionsWithSellBuildings = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    state.sellBuildings = []
    return state;
} 
const getBuyEstate = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    state.buyEstate = { reason: 'You are not on any estate at present' }
    return state;
} 
const getTestableOptionsWithSellEstates = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    state.sellEstates = []
    return state;
}
const getTestableOptionsWithPlegdeEstates = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    state.plegdeEstates = []
    return state;
}
const getTestableOptionsWithUnplegdeEstates = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    state.plegdeEstates = []
    return state;
}
const getPay = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    // options.pay = { reason: `You don't have anything to pay for`}
    const { options, state } = args;
    return state;
}

const getMoney = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    // options.getMoney = { reason: `There is nothing you may charge for`}
    return state;
}

const getGoToJail = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    // options.goToJail = { reason: `You are not guilty`}
    return state;
}

const getMove = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    state.move = { reason: `There is a mandatory action to perform before you may move`}
    return state;
}

const getNextPhase = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    state.endPhase = { reason: `There is a mandatory action to perform before you may end your turn`}
    return state;
}

// type tJournalistOptionsModifier = tStateModifier<tGameState, tJournalistOptionsUnderDevelopement>
type tJournalistOptionsModifier = tStateModifier<tJournalistOptionsUnderDevelopement, tGameState>

type tApplyStateToJournalistOptions = {
    // state: tGameState, 
    // options: tJournalistOptionsUnderDevelopement,
    options: tGameState, 
    state: tJournalistOptionsUnderDevelopement,
    stateModifiers: tJournalistOptionsModifier[]
}

// const applyStateToJournalistOptions = ({ state, options, stateModifiers }: tApplyStateToJournalistOptions) => {
//     const applyModifiers = applyStateModifiers<tJournalistOptionsUnderDevelopement, tGameState>;
//     // const applyModifiers = applyStateModifiers<tJournalistOptionsUnderDevelopement, tGameState>;
//     // const modifiers = stateModifiers.map((stateModifier) => {
//     //     const resultOptions = ({state, options}: {state: tGameState, options: tJournalistOptionsUnderDevelopement}) => stateModifier({state: options, options: state};
//     //         return resultOptions;
//     // })
//     const result = applyModifiers({ state, options }, stateModifiers)
//     return result;
// }

const applyStateToJournalistOptions = applyStateModifiers<tJournalistOptionsUnderDevelopement, tGameState>

// WARNING:
// This is not for chance card actions. Chance card actions
// are a separate responsiblity
export const getTestableOptions = (state: tGameState): tJournalistState => {
    // const result = {};
    const result = applyStateToJournalistOptions(
        {
            state: {},
            options: state,
        },
        [
            getTestableOptionsWithBuyBuildings,
        ]
    )
    return result as tJournalistState;
    return BLANK_TESTABLE_OPTIONS_OUTPUT
}
