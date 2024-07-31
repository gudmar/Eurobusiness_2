import { BANK } from "../../../Data/const";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { DoneThisTurn, TurnPhases } from "../../types";
import { ACTIONS, IS_MANDATORY, PAYLOAD, TYPE } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement, tOptionAction } from "../types";
import { getFieldCurrentPlayerStandsOn, getPlayerFromState } from "./commonFunctions";
import { tStateModifierArgs } from "./types";

const hasCurrentPlayerMoneyForEstate = (state: tGameState) => {
    const currentPlayer = getPlayerFromState(state);
    if (!currentPlayer) throw new Error('No current player found')
    const currentField = getFieldCurrentPlayerStandsOn(state);
    if (!('price' in currentField)) throw new Error('Player is not on an estate, but he should be')
    const hasPlayerMoney = currentPlayer?.money >= currentField.price
    return hasPlayerMoney;
}

const whatToDoWithEstate = (state: tGameState, playerName: string) => {
    const player = getPlayerFromState(state);
    const field = state.boardFields[player!.fieldNr];
    if (!('owner' in field)) return { canBePurchased: false, canBeAuctioned: false };
    const isCurrentPlayer = state.players.currentPlayersName === playerName;
    const isGoodMoment = state.game.turnPhase === TurnPhases.AfterMove;
    const notDoneYet = !state.game.doneThisTurn.includes(DoneThisTurn.BoughtEstate)
    const isBankProperty = field.owner === BANK;
    const hasPlayerMoney = hasCurrentPlayerMoneyForEstate(state);
    const canBeAuctioned = [
        isCurrentPlayer, isGoodMoment, notDoneYet, isBankProperty
    ].every((val) => !!val)
    const canBePurchased = canBeAuctioned && hasPlayerMoney;
    return { canBePurchased, canBeAuctioned }
}

export const getStoppedOnBankOwnedEstateOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const { canBePurchased, canBeAuctioned } = whatToDoWithEstate(options!, playerName);
    const field = getFieldCurrentPlayerStandsOn(options!);
    if (!('name' in field)) return state;
    const actions: tOptionAction[] = [];
    if (canBeAuctioned) actions.push(
        {
            [TYPE]: OptionTypes.AuctionEstate,
            [PAYLOAD]: field
        }
    )
    if (canBePurchased) actions.push(
        {
            [TYPE]: OptionTypes.BuyEstate,
            [PAYLOAD]: field
        }
    );
    if (canBeAuctioned) {
        state.handleStayOnBankOwnedEstate = {
            [IS_MANDATORY]: true,
            [ACTIONS]: actions,
        }
    }
    return state;
}
