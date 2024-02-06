import BoardField from "../../Components/Board/BoardField/BoardFiled"
import { CITY, PLANT, RAILWAY } from "../../Data/const"
import { tColors } from "../../Data/types"
import { Bank } from "../../Logic/Bank/Bank"
import { BoardCaretaker } from "../../Logic/BoardCaretaker"
import { tField } from "../../Logic/boardTypes"
import { ChanceCardHolder } from "../../Logic/Chance/ChanceCardHolder"
import { DiceTestModeDecorator } from "../../Logic/Dice/Dice"
import { ChanceField, CityField, NonCityEstatesField, OtherFieldTypesField } from "../../Logic/FieldCreators"
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

const throwIfNoGame = (name: string) => {
    const isGame = isStateNameTaken(name);
    if (!isGame) throw new Error(`Game named ${name} does not exist`)
}

const setChanceCardsState = (state: tGameState) => {
    const stateTemplates = Object.entries(state.chanceCards)
    const newInstances = stateTemplates.map(([key, val]) => ([key, new ChanceCardHolder(val)]))
    const instances = Object.fromEntries(newInstances);
    ChanceCardHolder.instances = instances;
}

const setPlayersState = (state: tGameState) => {
    const stateTemplates = Object.entries(state.players);
    Players.deleteAllPlayers();
    const playersConstructorArgs = stateTemplates.map(([color, state]) => (state));
    new Players({DiceClass: DiceTestModeDecorator, players: playersConstructorArgs});
    Players.players.forEach((player) => {
        const color = player.color;
        player.state = state.players[color as tColors]
    })
}

const getFieldInstance = (boardField: tField): CityField | NonCityEstatesField => {
    const result = BoardCaretaker.fieldInstances.find(({name}) => boardField.name === name);
    if (!result) throw new Error(`Cannot find estate named ${boardField.name}`)
    if (result instanceof OtherFieldTypesField || result instanceof ChanceField) throw new Error('Field of not proper type')
    return result;
}

const setBoardFieldsStates = (state: tGameState) => {
    throw new Error ('Problem with type guards here')
    const { boardFields } = state;
    boardFields.forEach((boardField) => {
        const fieldInstance = getFieldInstance(boardField);
        if (fieldInstance) fieldInstance.state = boardField;
        // if ('owner' in fieldInstance) {
        // if (!(fieldInstance instanceof OtherFieldTypesField) || !(fieldInstance instanceof ChanceField)){
        if ((fieldInstance instanceof CityField) || (fieldInstance instanceof NonCityEstatesField)){
            (fieldInstance as CityField | NonCityEstatesField).state = boardField;
            // (fieldInstance as CityField | NonCityEstatesField).state = boardField;
        }
        
    })
    throw new Error('Implement this')
    const fields = BoardCaretaker.fieldInstances;
    const states = fields.map((field) => field.state);
    return states
}
const setDiceState = () => {
    throw new Error('Implement this')
    const dice = DiceTestModeDecorator.instance;
    const state = dice?.state;
    return state
}

const setBankState = () => {
    throw new Error('Implement this')
    const bank = Bank.instance;
    const state = bank.state;
    return state;
}

export const loadGame = (name: string) => {
    throwIfNoGame(name);
    const games = getGames();
    const state = games[name];
}
