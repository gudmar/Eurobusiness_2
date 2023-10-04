import { PLAYER_1, PLAYER_2, PLAYER_3, PLAYER_4 } from "../../Data/const"

export type tPlayerName = typeof PLAYER_1 | typeof PLAYER_2 | typeof PLAYER_3 | typeof PLAYER_4;

export interface tPawnPosition {
    top: number,
    left: number,
}

export interface tPawnSizes extends tPawnPosition {
    width: number, height: number
}
