import { useReducer } from "react";
import { tColors } from "../../Data/types";
import { Player } from "../../Logic/Player/Player";
import { Players } from "../../Logic/Players/Players";
import { iPlayer } from "../../Logic/Players/types";
import { usePlayersColors } from "../usePlayersColors";
import { reducer } from "./utils";

const getPlayerInstance = (instances: iPlayer[], color: tColors) => instances.find((instance: iPlayer) => instance.color === color)


export const useEditPlayer = (wantedColor: tColors) => {
    const playerInstances = Players.instance;
    const colors = usePlayersColors();
    const [{
        name, money, specialCards, color, fieldNr, isInPrison, nrTurnsToWait, isGameLost
    }, dispatch ] = useReducer(reducer, Player.initialState)
}