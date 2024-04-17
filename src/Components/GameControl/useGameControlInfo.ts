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

const useSubscribeToGameState = (id: string) => {
    const [state, setState] = useState(Game.state)
    useEffect(() => {
        const subscribion = {
            callback: setState,
            id,
            messageType: Messages.stateChanged
        }
        if (Game?.instance) {
            Game.instance.subscribeWithInformation(subscribion);
        }
        return (() => {
            if (Game.instance) {
                Game.instance.unsubscribe(Messages.stateChanged, id)
            }
        })
    }, [Game.instance])
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

const indexToFiels = (fieldIndex: number) => {
    const board = getBoardCaretaker();
    const field = board.getFieldByIndex(fieldIndex);
    return field
}

export const useGameControlInfo = () => {
    const {currentPlayer, turnPhase, playersOrder} = useSubscribeToGameState('GameLogic component subscribtion')
    const currentPlayerColor = getPlayerColor(currentPlayer);
    const pawnIndex =  usePawnFieldIndex(currentPlayerColor)
    const money = getPlayerMoney(currentPlayerColor); 
    
    const currentPlayerField = indexToFiels(pawnIndex)
    return {
        currentPlayerName: currentPlayer, turnPhase, playersOrder,money, currentPlayerColor, currentPlayerField
    };
}
