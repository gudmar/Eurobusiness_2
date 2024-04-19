import { tGameState } from "../../Functions/PersistRetrieveGameState/types"
import { tJournalistOptionsUnderDevelopement, tJournalistState } from "./types"


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

const getTestableOptionsWithBuyBuildings = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    options.buyBuildings = []
    return options;
}
const getTestableOptionsWithSellBuildings = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    options.sellBuildings = []
    return options;
} 
const getBuyEstate = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    options.buyEstate = { reason: 'You are not on any estate at present' }
    return options;
} 
const getTestableOptionsWithSellEstates = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    options.sellEstates = []
    return options;
}
const getTestableOptionsWithPlegdeEstates = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    options.plegdeEstates = []
    return options;
}
const getTestableOptionsWithUnplegdeEstates = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    options.plegdeEstates = []
    return options;
}
const getPay = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    // options.pay = { reason: `You don't have anything to pay for`}
    return options;
}

const getMoney = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    // options.getMoney = { reason: `There is nothing you may charge for`}
    return options;
}

const getGoToJail = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    // options.goToJail = { reason: `You are not guilty`}
    return options;
}

const getMove = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    options.move = { reason: `There is a mandatory action to perform before you may move`}
    return options;
}

const getNextPhase = (state: tGameState, options: tJournalistOptionsUnderDevelopement): tJournalistOptionsUnderDevelopement => {
    options.endPhase = { reason: `There is a mandatory action to perform before you may end your turn`}
    return options;
}





// WARNING:
// This is not for chance card actions. Chance card actions
// are a separate responsiblity
export const getTestableOptions = (state: tGameState): tJournalistState => {
    const result = {};
    const resultWithBuyBuildings = getTestableOptionsWithBuyBuildings(state, result);
    return 
    return BLANK_TESTABLE_OPTIONS_OUTPUT
}
