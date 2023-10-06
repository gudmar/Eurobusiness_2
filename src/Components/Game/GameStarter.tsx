import { BLUE, GREEN, RED, YELLOW } from "../../Data/const"
import { iPlayerDescriptor } from "../../Logic/Players/types"
import { StrategyNames } from "../../Logic/Strategies/types"
import { Board } from "../Board/Board"
import CommandArea from "../CommandArea/CommandArea"
import { Pawns } from "../Pawns/Pawns"

export const GameStarter = () => {
    // This component should render initial view, where player may select color, name, nr of players
    // and players strategies
    // For now it is only a wrapper delivering data
    const TEST_PLAYERS: iPlayerDescriptor[] = [
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
    return(
        <>
            <Board><Board>/>
            <Pawns playerDescriptors={TEST_PLAYERS}/>
            <CommandArea/>
        </>
    )
}