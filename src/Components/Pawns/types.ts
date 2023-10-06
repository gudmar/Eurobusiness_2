import { PLAYER_1, PLAYER_2, PLAYER_3, PLAYER_4 } from "../../Data/const"
import { iPlayerDescriptor } from "../../Logic/Players/types";

export type tPlayerName = typeof PLAYER_1 | typeof PLAYER_2 | typeof PLAYER_3 | typeof PLAYER_4;

export interface iPawnPosition {
    top: number,
    left: number,
}

export interface iPawnSizes extends iPawnPosition {
    width: number, height: number
}

export interface iPawnArgs {
    playerDescriptors: iPlayerDescriptor[]
}
