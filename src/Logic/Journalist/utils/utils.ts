import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { TurnPhases } from "../../types";
import { getCurrentPlayer } from "./commonFunctions";
import { GO_TO_JAIL_INDEX } from "./getGoToJailOptions";

export const checkIsOnGoToJailField = (state: tGameState) => {
    const {fieldNr} = getCurrentPlayer(state);
    return fieldNr === GO_TO_JAIL_INDEX;
}

export const isAlreadyMoved = (state: tGameState) => state?.game.turnPhase === TurnPhases.AfterMove;

export const getCountryFieldsFromGameState = (state: tGameState, countryName: string) => {
    const fields = state.boardFields.filter((field) => {
        if (!('country' in field)) return false;
        return field.country === countryName
    })
    return fields;
}
