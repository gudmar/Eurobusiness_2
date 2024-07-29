import { applyStateModifiers, tStateModifier } from "../../Functions/applyStateModifiers"
import { tGameState } from "../../Functions/PersistRetrieveGameState/types"
import { getGameState } from "../../Functions/PersistRetrieveGameState/utils"
import { tJournalistOptionsUnderDevelopement, tJournalistState } from "./types"
import { getTestableOptionsWithBuyBuildings } from "./utils/getBuyBuildingsOptions"
import { getDrawChanceCardOption } from "./utils/getDrawChanceCardOption"
import { getSpecialCardsOptions } from "./utils/getGetOutFromPrisonCardOptions"
import { getGoToJailOptions } from "./utils/getGoToJailOptions"
import { getMayPlayerEndTurnOptions } from "./utils/getMayPlayerEndGameOptions"
import { getPaymentOptions } from "./utils/getPaymentOptions"
import { getPlegdeOptions } from "./utils/getPlegdeOptions"
import { getTestableOptionsWithSellBuildings } from "./utils/getSellBuildingOptions"
import { getSellEstatesOptions } from "./utils/getSellEstatesOptions"
import { getShouldPayForPassingStartOptions } from "./utils/getShouldPayForPassingStartOptions"
import { getStoppedOnBankOwnedEstateOptions } from "./utils/getStoppedOnBankOwnedEstatesOptions"
import { getUnplegdeOptions } from "./utils/getUnplegdeOptions"


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
        getMayPlayerEndTurnOptions,
    ];
    if (builderSequence[builderSequence.length - 1] !== getMayPlayerEndTurnOptions) {
        throw new Error('getMayPlayerEndTurnOptions should be the last function in optionsBuilder')
    }
    const result = applyStateToJournalistOptions(
        {
            state: {},
            options: state,
            playerName,
        },
        builderSequence,
    )
    console.log('Options of the game', result)
    return result as tJournalistState;
}

export const getOptions = () => {
    const gameState = getGameState();
    // const currentPlayerName = gameState.game.currentPlayer;
    const currentPlayerName = gameState.players.currentPlayersName;
    // console.log(gameState)
    // debugger;
    const options = getTestableOptions(gameState, currentPlayerName);
    console.log('Game options:', options)
    return options;
}
