import { tColors } from "../../Data/types";
import { iSubscription, tToBeImplemented } from "../../Types/types";
import { iDiceTestModeDecorator, tDiceTestModeDecorator } from "../Dice/types";
import { MOVE, SWITCH_PLAYER } from "../Messages/constants";
import { iStrategy } from "../Strategies/types";
import { iSubscribtionHandler } from "../types";

export interface iPlayerDescriptor {
    name: string,
    color: tColors,
    strategy: iStrategy
}

export interface iAllPlayersArgs {
    DiceClass?: tDiceTestModeDecorator;
    players?: iPlayerDescriptor[];
}

export interface iPlayerArgs {
    name: string,
    money: number,
    color: tColors,
    strategy: iStrategy,
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
}

export interface iPlayer extends iPlayerState {
    state: iPlayerState,
    move(): Promise<boolean>;
}

export interface iAllPlayers extends iSubscribtionHandler<tSwitchPlayer, iPlayer> {
    currentPlayerState: iPlayerState,
    allPlayersStates: iPlayerState[],
    getPlayerFieldIndex(color:tColors): number,
    currentPlayer: iPlayer,
    makeMove(): Promise<boolean>,
}

// export interface iAllPlayersReturn {
//     _diceClassInstance: iDiceTestModeDecorator,
//     _players: iPlayer[],
//     _currentPlayerIndex: number,
//     _createPlayer(args: iPlayerDescriptor): iPlayer
// }

export type tMove = typeof MOVE;
export type tSwitchPlayer = typeof SWITCH_PLAYER;
export interface iMoveMessage {
    nrOfFields: number,
    done(): Promise<boolean>
} 
