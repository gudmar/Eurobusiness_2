import { BLUE, GREEN, RED, YELLOW } from "../Data/const";
import { iPlayerDescriptor } from "../Logic/Players/types";
import { StrategyNames } from "../Logic/Strategies/types";

export const START_PLAYER_NAME = 'Balin';
export const START_PLAYER_COLOR = YELLOW;
export const START_PLAYER_NAMES_ORDER = [
    'Balin', 'Dwalin', 'Dorin', 'Gloin'
]

export const TEST_PLAYERS: iPlayerDescriptor[] = [
    {
        color: YELLOW,
        name: 'Balin',
        strategy: StrategyNames.manual,
    },
    {
        color: RED,
        name: 'Dwalin',
        strategy: StrategyNames.manual,
    },
    {
        color: GREEN,
        name: 'Dorin',
        strategy: StrategyNames.manual,
    }, 
    {
        color: BLUE,
        name: 'Gloin',
        strategy: StrategyNames.manual,
    }
];
