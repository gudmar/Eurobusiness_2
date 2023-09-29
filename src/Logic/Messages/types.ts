import { tPlayerName } from "../../Components/Pawns/types";
import { BANK, PLAYER_1, PLAYER_2, PLAYER_3, PLAYER_4 } from "../../Data/const";
import { BoardCaretaker } from "../BoardCaretaker";
import { tAllMessages } from "../../Constants/commands";

export type tPayTargets = typeof PLAYER_1 | typeof PLAYER_2 | typeof PLAYER_3 | typeof PLAYER_4 | typeof BANK;

export interface iPaymentOption {
    operation: tAllMessages,
    source: tPayTargets,
    ammount: number,
    isMandatory: boolean,
    priority: number,
}
export interface iGetPayMessage {
    operation: tAllMessages,
    source: tPayTargets,
    ammount: number,
    isMandatory: boolean,
    priority: number,
}

export interface iPaymentToOption extends iPaymentOption {
    target: tPayTargets,
}

export interface iPaymentMultipleToBankOption extends iPaymentOption {
    nrOfSources: number,
    boardInstance: BoardCaretaker,
    singlePrice: number,
}

export interface iGoToFieldOption {
    fieldNumber: number,
    passStart: boolean,
    canBuildHouse: boolean,
    canBuildHotel: boolean,
    costOfStay: boolean,
    fieldOwner: tPayTargets,
    isMortgaged: boolean,
    isJail: boolean,
}

export interface iPayForEachBuildingOption {
    boardInstance: BoardCaretaker,
    owner: tPlayerName
}
