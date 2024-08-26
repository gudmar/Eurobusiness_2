import { applyStateModifiers, tStateModifier } from "../../Functions/applyStateModifiers"
import { tGameState } from "../../Functions/PersistRetrieveGameState/types"
import { getGameState } from "../../Functions/PersistRetrieveGameState/utils"
import { tJournalistOptionsUnderDevelopement, tJournalistState, tThrowIfNotInOrderArgs } from "./types"
import { getTestableOptionsWithBuyBuildings } from "./utils/getBuyBuildingsOptions"
import { getDrawChanceCardOption } from "./utils/getDrawChanceCardOption"
import { getSpecialCardsOptions } from "./utils/getGetOutFromPrisonCardOptions"
import { getGoToJailOptions } from "./utils/getGoToJailOptions"
import { getMayPlayerEndTurnOptions } from "./utils/getMayPlayerEndGameOptions"
import { getMoveOptions } from "./utils/getMoveOptions"
import { getPaymentOptions } from "./utils/getPaymentOptions"
import { getPlegdeOptions } from "./utils/getPlegdeOptions"
import { getTestableOptionsWithSellBuildings } from "./utils/getSellBuildingOptions"
import { getSellEstatesOptions } from "./utils/getSellEstatesOptions"
import { getShouldPayForPassingStartOptions } from "./utils/getShouldPayForPassingStartOptions"
import { getStoppedOnBankOwnedEstateOptions } from "./utils/getStoppedOnBankOwnedEstatesOptions"
import { getUnplegdeOptions } from "./utils/getUnplegdeOptions"
import { giveUp } from "./utils/giveUp"


type tJournalistOptionsModifier = tStateModifier<tJournalistOptionsUnderDevelopement, tGameState>

type tApplyStateToJournalistOptions = {
    options: tGameState, 
    state: tJournalistOptionsUnderDevelopement,
    stateModifiers: tJournalistOptionsModifier[]
}

const applyStateToJournalistOptions = applyStateModifiers<tJournalistOptionsUnderDevelopement, tGameState>

const throwIfNotInOrder = ({ expectedBeforeFunction, expectedAfterFunction, sequence }: tThrowIfNotInOrderArgs ): void => {
    const indexOfBefore = sequence.findIndex((fn) => fn === expectedBeforeFunction);
    const indexOfAfter = sequence.findIndex((fn) => fn === expectedAfterFunction);
    if (indexOfBefore === -1) throw new Error(`${expectedBeforeFunction.name} function missing in builder sequence`);
    if (indexOfAfter === -1) throw new Error(`${expectedAfterFunction.name} function missing in builder sequence`);
    if (indexOfAfter === indexOfBefore) throw new Error(`The same function given to throwIfNotInOrder. This should not happen`)
    if (indexOfAfter < indexOfBefore) throw new Error(`${expectedAfterFunction} is expected to be after ${expectedBeforeFunction} in builder sequence`);
}

// WARNING:
// This is not for chance card actions. Chance card actions
// are a separate responsiblity
export const getTestableOptions = (state: tGameState, playerName: string): tJournalistState => {
    const builderSequence = [
        giveUp,
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
        getMoveOptions,
        getMayPlayerEndTurnOptions
    ];
    if (builderSequence[builderSequence.length - 2] !== getMoveOptions) {
        throw new Error('getMoveOptions should be the second function from the end, as all mandatory actions have to be in options object')
    }

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
    return result as tJournalistState;
}

export const getOptions = () => {
    const gameState = getGameState();
    const currentPlayerName = gameState.players.currentPlayersName;
    const options = getTestableOptions(gameState, currentPlayerName);
    return options;
}
