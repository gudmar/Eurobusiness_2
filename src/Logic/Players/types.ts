import { tColors } from "../../Data/types";
import { tToBeImplemented } from "../../Types/types";
import { iDiceTestModeDecorator, tDiceTestModeDecorator } from "../Dice/types";

export interface iPlayerDescriptor {
    name: string,
    color: string,
}

export interface iAllPlayersArgs {
    DiceClass: tDiceTestModeDecorator;
    playes: iPlayerDescriptor;
}

export interface iPlayerArgs {
    name: string,
    money: number,
    color: tColors,
    strategy: tToBeImplemented,
    DiceClassInstance: iDiceTestModeDecorator
}

export interface iPlayerState {
    name: string,
    money: number,
    specialCards: tToBeImplemented,
    color: tToBeImplemented,
    fieldNr: number, // indexed from 1
    isInPrison: boolean,
    nrTurnsToWait: number,
    isGameLost: boolean,
    strategy: tToBeImplemented,
}

export interface iPlayer extends iPlayerState {
    state: iPlayerState,
    move(): Promise<boolean>;
}
