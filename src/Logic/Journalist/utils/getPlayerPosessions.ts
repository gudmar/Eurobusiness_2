import { tGameState } from "../../../Functions/PersistRetrieveGameState/types"
import { tEstateField, tField, tFieldState } from "../../boardTypes"
import { Players } from "../../Players/Players"

type tPlayerBelogingsConditionFunction = (field: tFieldState) => boolean

const getNrPlayerBelongings = (gameState: tGameState, conditionFunction: tPlayerBelogingsConditionFunction) => {
    const {boardFields} = gameState;
    const result = boardFields.filter(conditionFunction);
    return result
}

export const getPlayerEstates = (gameState: tGameState, playerName: string) => {
    const playerColor = Players.playerNameToPlayerColor(playerName);
    const conditionFunction = (field: tFieldState) => {
        if ('owner' in field) { return false }
        const result = playerColor === (field as unknown as tEstateField).owner
        return result;
    }
    const result = getNrPlayerBelongings(gameState, conditionFunction);
    return result;
}
