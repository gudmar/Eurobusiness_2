import BoardField from "../../Components/Board/BoardField/BoardFiled"
import { Bank } from "../../Logic/Bank/Bank"
import { BoardCaretaker } from "../../Logic/BoardCaretaker"
import { ChanceCardHolder } from "../../Logic/Chance/ChanceCardHolder"
import { DiceTestModeDecorator } from "../../Logic/Dice/Dice"
import { Players } from "../../Logic/Players/Players"
import { tGameState } from "./types"

const STATE_LOCATION = 'eurobusinessGames'

type tSourcesOfTrough = {
    players: Players,
    dice: DiceTestModeDecorator,
    bank: Bank,
    boardFields: BoardCaretaker,
}

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

const getGameState = (): tGameState => {
    const stateGetters = Object.entries(STATE_PROVIDERS);
    const state = stateGetters.reduce((acc, stateGetter) => {
        const [key, getter] = stateGetter;
        const newAcc = {...acc, [key]: getter}
        return newAcc;
    }, {})
    return state as unknown as tGameState;
}

const isStateNameTaken = (name:string) => {
    const gamesAsString = window.localStorage.getItem(STATE_LOCATION);
    if (gamesAsString === null) return false;
    const games = JSON.parse(gamesAsString);
    return (!!games?.[name]);
};

const throwErrorIfNameTaken = (name: string) => {
    if (isStateNameTaken(name)) throw new Error(`Game name ${name} already taken`)
}

const getGames = () => {
    const gamesAsString = window.localStorage.getItem(STATE_LOCATION);
    if (gamesAsString === null) return {};
    return JSON.parse(gamesAsString);
}

type tSaves = { [key: string]: tGameState }

const overwritteGames = (saves: tSaves) => {
    window.localStorage.setItem(STATE_LOCATION, JSON.stringify(saves))
}

export const overwritteCurrentGameState = (name: string) => {
    const gameState = getGameState();
    const saves = getGames();
    const newSaves = {...saves, [name]: gameState}
    overwritteGames(newSaves);
}

export const saveCurrentGameState = (name: string) => {
    throwErrorIfNameTaken(name);
    overwritteCurrentGameState(name);
}

export const getAllSavedGameNames = () => {
    const games = getGames();
    const names = Object.keys(games);
    return names;
}

export const loadGame = () => {

}
