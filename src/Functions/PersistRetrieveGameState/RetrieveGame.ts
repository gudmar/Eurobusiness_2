import { Bank } from "../../Logic/Bank/Bank"
import { BoardCaretaker } from "../../Logic/BoardCaretaker"
import { tField } from "../../Logic/boardTypes"
import { ChanceCardHolder } from "../../Logic/Chance/ChanceCardHolder"
import { DiceTestModeDecorator } from "../../Logic/Dice/Dice"
import { ChanceField, CityField, NonCityEstatesField, OtherFieldTypesField } from "../../Logic/FieldCreators"
import { Players } from "../../Logic/Players/Players"
import { displayError } from "../displayMessage"
import { getGames } from "./localStorageOperations"
import { tGameState, tPartialPlayer, tSaves } from "./types"
import { getGameState, throwIfNoGame } from "./utils"


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
        player.state = state.players[color as  keyof tPartialPlayer]
    })
}

const getFieldInstance = (boardField: tField): CityField | NonCityEstatesField => {
    const result = BoardCaretaker.fieldInstances.find(({name}) => boardField.name === name);
    if (!result) throw new Error(`Cannot find estate named ${boardField.name}`)
    if (result instanceof OtherFieldTypesField || result instanceof ChanceField) throw new Error('Field of not proper type')
    return result;
}

const setBoardFieldsStates = (state: tGameState) => {
    const { boardFields } = state;
    boardFields.forEach((boardField) => {
        if (boardField instanceof OtherFieldTypesField || boardField instanceof ChanceField) return;
        const fieldInstance = getFieldInstance(boardField);
        if (fieldInstance) fieldInstance.state = boardField;
    })
    throw new Error('Implement this')
}
const setDiceState = (state: tGameState) => {
    const {dice} = state;
    DiceTestModeDecorator.instance.state = dice;
}

const setBankState = (state: tGameState) => {
    const {bank} = state;
    Bank.instance.state = bank;
}

const loadGame = (state: tGameState) => {
    setBankState(state);
    setDiceState(state);
    setChanceCardsState(state);
    setPlayersState(state);
    setBoardFieldsStates(state);
}

export const loadGameStateWithResume = (state: tGameState) => {
    const backupState = getGameState();
    try {
        loadGame(state);
    } catch (error) {
        displayError(
            {
                title: 'Failure',
                message: 'Could not load game. Is game data valid ? Going to resume previous game state'
            }
        );
        loadGame(backupState)
    }

}

export const loadGameStateFromLocalStorage = (name: string) => {
    throwIfNoGame(name);
    const games = getGames();
    const state = games[name];
    loadGameStateWithResume(state);
}
