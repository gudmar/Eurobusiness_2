import { applyStateModifiers, tStateModifier } from "../../Functions/applyStateModifiers"
import { tGameState } from "../../Functions/PersistRetrieveGameState/types"
import { tGetGameStateMockOptions } from "../Tests/Journalist/getGameStateMock/types"
import { tObject } from "../types"
import { isBeforeFirstMove } from "./isBeforeFirstMove"
import { tJournalistOptionsUnderDevelopement, tJournalistState, tRejection } from "./types"


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
    NoFullCountries = 'Player should own all estaes in a city to purchase a building'
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

const getCountryNamesOwnedByPlayer = (state: tGameState, playerName: string) => {
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
const getCountryNamesOwnedByCurrentPlayer = (state: tGameState) => {
    const currentPlayerName = getCurrentPlayerName(state);
    const result = getCountryNamesOwnedByPlayer(state, currentPlayerName);
    return result;
}

const getTestableOptionsWithBuyBuildings = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state } = args;
    const isGameNotStartedYet = isBeforeFirstMove(options!);
    if (isGameNotStartedYet) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.GameNotStartedYet)
        return state;
    }
    const playerOwnedCountryNames = getCountryNamesOwnedByCurrentPlayer(options!);
    if (playerOwnedCountryNames.length === 0) {
        addNoBuildingPermitsResult(state!, NoBuildingPermitResults.NoFullCountries);
        return state;
    }
    state.buyBuildings = []
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
