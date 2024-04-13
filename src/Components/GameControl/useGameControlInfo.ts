import { useEffect, useReducer, useState } from "react";
import { getReducer } from "../../Functions/reducer";
import { usePlayerInfo } from "../../hooks/useEditPlayer/useEditPlayer";
import { Game } from "../../Logic/Game/Game";
import { Messages } from "../../Logic/Game/types";
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

const useSubscribeToGameState = (id: string) => {
    const [state, setState] = useState(Game.state)
    useEffect(() => {
        const subscribion= {
            callback: setState,
            id,
            messageType: Messages.stateChanged
        }
        if (Game?.instance) {
            Game.instance.subscribe(subscribion);
        }
        return (() => {
            if (Game.instance) {
                Game.instance.unsubscribe(Messages.stateChanged, id)
            }
        })
    }, [setState])
    return {...state}
}

const getPlayerColor = (currentPlayer: string) => {
    try {
        const color = Players.playerNameToPlayerColor(currentPlayer);
        return color
    } catch(e) {
        return ''
    }    
}

const getPlayerMoney = (playerColor: string) => {
    const player = Players?._instance?.allPlayersStates?.find(({color}) => color === playerColor);
    if (!player) return 0;
    return player.money;
}

export const useGameControlInfo = () => {
    const {currentPlayer, turnPhase, playersOrder} = useSubscribeToGameState('GameLogic component subscribtion')
    const currentPlayerColor = getPlayerColor(currentPlayer);
    const money = getPlayerMoney(currentPlayerColor); 

    // const [state, dispatch] = useReducer(reducer, initialState)
    // useEffect(() => {
    //     dispatch({type: GameControlActionTypes.Update})
    // }, [])
    return {
        currentPlayerName: currentPlayer, turnPhase, playersOrder,money, currentPlayerColor
    };
}
