import { tGameState } from "../../Functions/PersistRetrieveGameState/types"
import { tJurnalistState } from "./types"


const BLANK_REJECTION = { reason: 'Dummy rejection' }

const BLANK_TESTABLE_OPTIONS_OUTPUT: tJurnalistState = {
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

const getTestableOptionsWithBuyBuildings = (state: tGameState) => {

}

// WARNING:
// This is not for chance card actions. Chance card actions
// are a separate responsiblity
export const getTestableOptions = (state: tGameState): tJurnalistState => {
    const result = {};
    const resultWithBuyBuildings = getTestableOptionsWithBuyBuildings(state)
    return BLANK_TESTABLE_OPTIONS_OUTPUT
}
