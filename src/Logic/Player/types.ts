import { tColors } from "../../Data/types";
import { tToBeImplemented } from "../../Types/types";
import { iEditableState, iPlayerState } from "../Players/types";
import { iStrategy, StrategyNames } from "../Strategies/types";

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
    nrOfHotelsBoughtInRound: number
}

export interface iPlayerMemento extends iEditableState, iPlayerState {}
