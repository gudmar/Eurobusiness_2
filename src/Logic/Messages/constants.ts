export const PRIORITY_NOT_IMPORTANT = -1;
export const PRIORITY_CHANCE_PAY_EACH_HOTEL = 10;
export const MOVE = 'move';
export const SWITCH_PLAYER = 'switch-player'
export const ANY_CHANGE = 'any-change'

export const CHANGE_FIELDS_TO_VISIT = 'change fields to visit in test dice';
export const CHANGE_TEST_MODE = 'change test mode in test dice';
export const CHANGE_NR_THAT_DICE_WILL_THROW = 'change number that will appear on the dice on each throw';

export const CHANGE_NR_HOUSES = 'Change nr of houses in the bank';
export const CHANGE_NR_HOTELS = 'Change nr of hotels in the bank';

export const PLAYER_ADDED_DELETED = 'player-added-or-deleted';

export enum Messages {
    playerAddedDeleted = 'player-added-or-deleted',
    switchPlayer = 'switch-player',
    movePlayer = 'move-player',
    loadPlayers = 'load-players',
    stateChanged = 'state-changed',
    playerChanged = 'player-changed',
    interruptingPlayerChanged = 'player-that-interrupts-during-auction-changed'
}
