import { tColors } from "../../Data/types";
import { tToBeImplemented } from "../../Types/types";
import { iEditableState, iPlayerState } from "../Players/types";
import { StrategyNames } from "../Strategies/types";

export const NR_OF_HOTELS_PURCHASED_IN_ROUND = 'nrOfHotelsPurchasedInRound';
export const NR_OF_HOUSES_PURCHASED_IN_TURN = 'nrOfHousesPurchasedInTurn';

export enum PassStartPayments {
    Force = "Pass start (Force payment for start pass)",
    ForceForward = "Forward (Force payment for pass start only if in forward direction)",
    ForceBackward = "Backward (Force payment for pass start only if in reverse direction)",
    DoNot = "Do not (Don't pay for passing start)"
}

export interface iPlayerSnapshot {
    name: string,
    money: number,
    specialCards: tToBeImplemented,
    color: tColors,
    fieldNr: number,
    isInPrison: boolean,
    nrTurnsToWait: number,
    isGameLost: boolean,
    strategy: StrategyNames,
    [NR_OF_HOTELS_PURCHASED_IN_ROUND]: number
    // nrOfHotelsPurchasedInRound: number,
    // nrOfHousesPurchasedInTurn: number,
    [NR_OF_HOUSES_PURCHASED_IN_TURN]: number
}

export interface iPlayerMemento extends iEditableState, iPlayerState {}

export type tPlayerName = string;
