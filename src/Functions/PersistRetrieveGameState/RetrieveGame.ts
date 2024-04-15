import { Bank } from "../../Logic/Bank/Bank"
import { BoardCaretaker } from "../../Logic/BoardCaretaker"
import { isCityFieldState, isNonCityEstatesFieldState, tFieldState } from "../../Logic/boardTypes"
import { ChanceCardHolder } from "../../Logic/Chance/ChanceCardHolder"
import { DiceTestModeDecorator } from "../../Logic/Dice/Dice"
import { ChanceField, CityField, NonCityEstatesField, OtherFieldTypesField } from "../../Logic/FieldCreators"
import { Game } from "../../Logic/Game/Game"
import { Players } from "../../Logic/Players/Players"
import { displayError } from "../displayMessage"
import { getGames } from "./localStorageOperations"
import { tGameState } from "./types"
import { getGameState, throwIfNoGame } from "./utils"


const setChanceCardsState = (state: tGameState) => {
    const stateTemplates = Object.entries(state.chanceCards)
    const newInstances = stateTemplates.map(([key, val]) => ([key, new ChanceCardHolder(val)]))
    const instances = Object.fromEntries(newInstances);
    ChanceCardHolder.instances = instances;
}

const setPlayersState = (state: tGameState) => {
    // const stateTemplates = Object.entries(state.players);
    const stateTemplates = state.players;
    Players.deleteAllPlayers();
    // const playersConstructorArgs = stateTemplates.map(([color, state]) => (state));
    const playersConstructorArgs = stateTemplates;
    new Players({DiceClass: DiceTestModeDecorator, players: playersConstructorArgs});
    Players.players.forEach((player) => {
        const getPlayer = () => (state.players.find(({name}) => player.state.name === name))
        const color = player.color;
        console.log('Creating player', color, player.state, state.players)
        player.state = getPlayer()
    })
}

const getFieldInstance = (boardField: tFieldState): CityField | NonCityEstatesField | null => {
    const result = BoardCaretaker.fieldInstances.find(({name}) => boardField.name === name);
    if (!result) throw new Error(`Cannot find estate named ${boardField.name}`)
    if (result instanceof OtherFieldTypesField || result instanceof ChanceField) {
        // throw new Error('Field of not proper type')
        return null;
    }
    return result;
}

const setBoardFieldsStates = (state: tGameState) => {
    const { boardFields } = state;
    boardFields.forEach((boardField) => {
        // if (boardField instanceof OtherFieldTypesField || boardField instanceof ChanceField) return;
        if (isCityFieldState(boardField) || isNonCityEstatesFieldState(boardField)){
            const fieldInstance = getFieldInstance(boardField);
            if (!fieldInstance) return;
            if (fieldInstance) fieldInstance.state = boardField;    
        }
    })
}
const setDiceState = (state: tGameState) => {
    const {dice} = state;
    DiceTestModeDecorator.instance.state = dice;
}

const setBankState = (state: tGameState) => {
    const {bank} = state;
    Bank.instance.state = bank;
}

const setGameState = (state: tGameState) => {
    const { game } = state;
    Game.instance.state = game;
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
