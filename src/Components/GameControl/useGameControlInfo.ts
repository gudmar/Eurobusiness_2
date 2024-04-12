import { useEffect, useReducer } from "react";
import { getReducer } from "../../Functions/reducer";
import { Game } from "../../Logic/Game/Game";
import { tPlayerName } from "../../Logic/Player/types"
import { Players } from "../../Logic/Players/Players";
import { TurnPhases } from "../../Logic/types"

type tOptionAction = () => void;

type tOption = {
    message: string,
    action: tOptionAction,
    isMandatory: boolean,
}

type tGameControlInfoState = {
    currentPlayerName: tPlayerName,
    currentPlayerColor: string, 
    turnPhase: TurnPhases,
    playersOrder: tPlayerName[],
    money: number,
}

enum GameControlActionTypes {
    Update = 'Update'
}

const initialState = {
    currentPlayerName: '',
    currentPlayerColor: '',
    turnPhase: TurnPhases.BeforeMove,
    playersOrder: [],
    money: 0,
}

const updateGameControlState = () => {
    const gameState = Game.instance.state;
    const {
        currentPlayer: currentPlayerName,
        playersOrder, turnPhase
    } = gameState;
    const currentPlayerColor = Players.playerNameToPlayerColor(currentPlayerName);
    const money = Players.getPlayerByColor(currentPlayerColor).state.money;
    return { money, playersOrder, turnPhase, currentPlayerColor, currentPlayerName }
}

const actionHandlers = {
    [GameControlActionTypes.Update]: updateGameControlState,
}

const reducer = getReducer<tGameControlInfoState, GameControlActionTypes, unknown>(actionHandlers);

export const useGameControlInfo = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        dispatch({type: GameControlActionTypes.Update})
    }, [])
    return state;
}
