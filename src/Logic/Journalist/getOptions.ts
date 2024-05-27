import { applyStateModifiers, tStateModifier } from "../../Functions/applyStateModifiers"
import { tGameState } from "../../Functions/PersistRetrieveGameState/types"
import { tJournalistOptionsUnderDevelopement, tJournalistState } from "./types"
import { getTestableOptionsWithBuyBuildings } from "./utils/getBuyBuildingsOptions"
import { getDrawChanceCardOption } from "./utils/getDrawChanceCardOption"
import { getSpecialCardsOptions } from "./utils/getGetOutFromPrisonCardOptions"
import { getGoToJailOptions } from "./utils/getGoToJailOptions"
import { getMayPlayerEndGameOptions } from "./utils/getMayPlayerEndGameOptions"
import { getPaymentOptions } from "./utils/getPaymentOptions"
import { getPlegdeOptions } from "./utils/getPlegdeOptions"
import { getTestableOptionsWithSellBuildings } from "./utils/getSellBuildingOptions"
import { getSellEstatesOptions } from "./utils/getSellEstatesOptions"
import { getShouldPayForPassingStartOptions } from "./utils/getShouldPayForPassingStartOptions"
import { getStoppedOnBankOwnedEstateOptions } from "./utils/getStoppedOnBankOwnedEstatesOptions"
import { getUnplegdeOptions } from "./utils/getUnplegdeOptions"


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
    // handleStayOnBankOwnedEstate: 
    // pay
    // getMoney
    // goToJail
};

type tJournalistOptionsModifier = tStateModifier<tJournalistOptionsUnderDevelopement, tGameState>

type tApplyStateToJournalistOptions = {
    options: tGameState, 
    state: tJournalistOptionsUnderDevelopement,
    stateModifiers: tJournalistOptionsModifier[]
}

const applyStateToJournalistOptions = applyStateModifiers<tJournalistOptionsUnderDevelopement, tGameState>

// WARNING:
// This is not for chance card actions. Chance card actions
// are a separate responsiblity
export const getTestableOptions = (state: tGameState, playerName: string): tJournalistState => {
    // const result = {};
    const builderSequence = [
        getTestableOptionsWithBuyBuildings,
        getTestableOptionsWithSellBuildings,
        getSellEstatesOptions,
        getPlegdeOptions,
        getUnplegdeOptions,
        getSpecialCardsOptions,
        getShouldPayForPassingStartOptions,
        getPaymentOptions,
        getDrawChanceCardOption,
        getStoppedOnBankOwnedEstateOptions,
        getGoToJailOptions,

        getMayPlayerEndGameOptions,
    ];
    if (builderSequence[builderSequence.length - 1] !== getMayPlayerEndGameOptions) {
        throw new Error('getMayPlayerEndGameOptions should be the last function in optionsBuilder')
    }
    const result = applyStateToJournalistOptions(
        {
            state: {},
            options: state,
            playerName,
        },
        builderSequence,
    )
    return result as tJournalistState;
}
