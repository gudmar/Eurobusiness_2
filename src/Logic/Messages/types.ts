import { tPlayerName } from "../../Components/Pawns/types";
import { BANK, PLAYER_1, PLAYER_2, PLAYER_3, PLAYER_4 } from "../../Data/const";
import { BoardCaretaker } from "../BoardCaretaker";

export type tPayTargets = typeof PLAYER_1 | typeof PLAYER_2 | typeof PLAYER_3 | typeof PLAYER_4 | typeof BANK;

export interface iPayment {
    source: tPayTargets,
    ammount: number,
    isMandatory: boolean,
    mandatoryPriority: number,
}
export interface iPaymentTo extends iPayment {
    target: tPayTargets,
}

export interface iPaymentMultipleToBank extends iPayment {
    nrOfSources: number
}

export interface iGoToField {
    fieldNumber: number,
    passStart: boolean,
    canBuildHouse: boolean,
    canBuildHotel: boolean,
    costOfStay: boolean,
    fieldOwner: tPayTargets,
    isMortgaged: boolean,
    isJail: boolean,
}

export interface iPayForEachBuilding {
    boardInstance: BoardCaretaker,
    owner: tPlayerName
}
