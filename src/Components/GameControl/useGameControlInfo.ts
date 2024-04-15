import { useEffect, useState } from "react";
import { getBoardCaretaker } from "../../Functions/getBoardCaretaker";
import { getReducer } from "../../Functions/reducer";
import { usePawnFieldIndex } from "../../hooks/usePawnFieldIndex";
import { tField } from "../../Logic/boardTypes";
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
    currentPlayerField: tField,
}

// enum GameControlActionTypes {
//     Update = 'Update'
// }

// const initialState = {
//     currentPlayerName: '',
//     currentPlayerColor: '',
//     turnPhase: TurnPhases.BeforeMove,
//     playersOrder: [],
//     money: 0,
// }

// const updateGameControlState = () => {
//     const gameState = Game.instance.state;
//    const {
//         currentPlayer: currentPlayerName,
//         playersOrder, turnPhase
//     } = gameState;
//     const currentPlayerColor = Players.playerNameToPlayerColor(currentPlayerName);
//     const money = Players.getPlayerByColor(currentPlayerColor).state.money;
//     return { money, playersOrder, turnPhase, currentPlayerColor, currentPlayerName }
// }

// const actionHandlers = {
//     [GameControlActionTypes.Update]: updateGameControlState,
// }

// const reducer = getReducer<tGameControlInfoState, GameControlActionTypes, unknown>(actionHandlers);

const useSubscribeToGameState = (id: string) => {
    const [state, setState] = useState(Game.state)
    useEffect(() => {
        console.log('Players in useSubscribeToGamesSTate', Players._instance)
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

const getPlayerField = (playerColor: string) => {
    const player = Players?._instance?.allPlayersStates?.find(({color}) => color === playerColor);
    if (!player) return;
    const fieldNr = player.fieldNr;
    const board = getBoardCaretaker();
    const field = board.getFieldByIndex(fieldNr);
    return field;
}

const indexToFiels = (fieldIndex: number) => {
    const board = getBoardCaretaker();
    const field = board.getFieldByIndex(fieldIndex);
    return field
}

const useCurrentPlayerColor = (currentPlayer: string) => {
    const [color] = useState(getPlayerColor(currentPlayer));
    return color
}

export const useGameControlInfo = () => {
    const {currentPlayer, turnPhase, playersOrder} = useSubscribeToGameState('GameLogic component subscribtion')
    console.log('useGameCotnrolInfo', currentPlayer, playersOrder, Players)
    console.log('%cUsing players', "background-color: red; color: white")
    const currentPlayerColor = getPlayerColor(currentPlayer);
    const pawnIndex =  usePawnFieldIndex(currentPlayerColor)
    const money = getPlayerMoney(currentPlayerColor); 
    
    // const currentPlayerField = getPlayerField(currentPlayerColor);
    const currentPlayerField = indexToFiels(pawnIndex)
    console.log('Coloor position', currentPlayerColor, pawnIndex)
    return {
        currentPlayerName: currentPlayer, turnPhase, playersOrder,money, currentPlayerColor, currentPlayerField
    };
}
