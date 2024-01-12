export const FIRST_FIELD_INDEX = 1;
export const LAST_FIELD_INDEX = 40;

export const NR_OF_HOTELS = 'nrOfHotels';
export const NR_OF_HOUSES = 'nrOfHouses';

export const COLOR = 'color';
export const NAME = 'name';
export const MONEY = 'money';
export const SPECIAL_CARDS ='specialCards';
export const FIELD_NR = 'fieldNr';
export const IS_IN_PREISON = 'isInPrison';
export const NR_TURNS_TO_WAIT = 'nrTurnsToWait';
export const IS_GAME_LOST = 'isGameLost';

export const PAWN_DIAMETER = 32;
export const MAX_NR_OF_HOUSES_TO_PURCHASE_IN_ONE_ROW = 4;
export const INITIAL_NR_HOUSES = 32;
export const INITIAL_NR_HOTELS = 12;

export const NOTES = {
    '1000': 20,
    '500' : 30,
    '100' : 50,
    '50'  : 50,
    '20'  : 30,
    '10'  : 40,
    '5'   : 30,
}  // NOT VERIFIED !!!!!

export const MONEY_ALLTOGETHER = (() => {
    const result = Object.entries(NOTES).reduce((acc: number, [key, value]: [string, number]) => {
        acc = (acc + (parseInt(key) * value));
        return acc
    }, 0);
    return result;
})();

//=========================
export const INFORMATION_TIMEOUT = 3000;
export const MAX_PLAYER_NAME_LENGTH = 20;


