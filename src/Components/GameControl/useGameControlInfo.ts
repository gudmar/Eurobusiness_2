import { getBoardCaretaker } from "../../Functions/getBoardCaretaker";
import { usePawnFieldIndex } from "../../hooks/usePawnFieldIndex";
import { useSubscribeToGameState } from "../../hooks/useSubscribeToGameState";
import { useSubscribeToPlayersState } from "../../hooks/useSubscribeToPlayersState";
import { Players } from "../../Logic/Players/Players";

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

const SUBSCRIBTION_ID = 'GameLogic component subscribtion';

export const useGameControlInfo = () => {
    const {
        turnPhase,
    } = useSubscribeToGameState(SUBSCRIBTION_ID)
    const {
        currentPlayersName, playerNamesOrder, currentPlayersColor,
    } = useSubscribeToPlayersState(SUBSCRIBTION_ID)
    const pawnIndex =  usePawnFieldIndex(currentPlayersColor)
    const money = getPlayerMoney(currentPlayersColor); 
    
    const currentPlayerField = indexToFiels(pawnIndex)
    return {
        currentPlayersName, turnPhase, playerNamesOrder, money, currentPlayersColor, currentPlayerField
    };
}
