import { Bank } from "../../Logic/Bank/Bank";
import { BoardCaretaker } from "../../Logic/BoardCaretaker";
import { ChanceCardHolder } from "../../Logic/Chance/ChanceCardHolder";
import { DiceTestModeDecorator } from "../../Logic/Dice/Dice";
import { Players } from "../../Logic/Players/Players";
import { isStateNameTaken } from "./localStorageOperations";
import { tGameState } from "./types";

const getChanceCardsState = () => {
    const instances = Object.entries(ChanceCardHolder.instances);
    const state = instances.reduce((acc, instance) => {
        const [key, chanceCardInstance] = instance;
        const newAcc = {...acc, [key]: chanceCardInstance.state}
        return acc
    }, {})
    return state
}

const getPlayersState = () => {
    const state = Players.players.reduce((acc, player) => {
        const id = player.color;
        const state = player.state;
        const newAcc = {...acc, [id]: state }
        return newAcc;
    },{})
    return state;
}
const getBoardFieldsStates = () => {
    const fields = BoardCaretaker.fieldInstances;
    const states = fields.map((field) => field.state);
    return states
}
const getDiceState = () => {
    const dice = DiceTestModeDecorator.instance;
    const state = dice?.state;
    return state
}

const getBankState = () => {
    const bank = Bank.instance;
    const state = bank.state;
    return state;
}

const STATE_PROVIDERS = {
    bank: getBankState,
    dice: getDiceState,
    boardFields: getBoardFieldsStates,
    players: getPlayersState,
    chanceCards: getChanceCardsState,
}

export const getGameState = (): tGameState => {
    const stateGetters = Object.entries(STATE_PROVIDERS);
    const state = stateGetters.reduce((acc, stateGetter) => {
        const [key, getter] = stateGetter;
        const newAcc = {...acc, [key]: getter}
        return newAcc;
    }, {})
    return state as unknown as tGameState;
}

export const throwIfNoGame = (name: string) => {
    const isGame = isStateNameTaken(name);
    if (!isGame) throw new Error(`Game named ${name} does not exist`)
}
