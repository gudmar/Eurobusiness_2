import { useEffect, useState } from "react"
import { BLUE, GREEN, RED, YELLOW } from "../../Data/const"
import { useStartChanceCardsHolders } from "../../hooks/starters/useStartChanceCardsHoleders"
import { Bank } from "../../Logic/Bank/Bank"
import { Game } from "../../Logic/Game/Game"
import { Messages } from "../../Logic/Messages/constants"
import { Players } from "../../Logic/Players/Players"
import { iPlayerDescriptor } from "../../Logic/Players/types"
import { StrategyNames } from "../../Logic/Strategies/types"
import { Board } from "../Board/Board"
import CommandArea from "../CommandArea/CommandArea"
import { Pawns } from "../Pawns/Pawns"

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

const GAME_STARTER_ID = 'Game-starter';

const getPlayersDescriptors = () => Players?.instance?.allPlayersStates ?? TEST_PLAYERS;

const usePlayersDescriptors = () => {    
    const initialDescriptors = getPlayersDescriptors();
    const [descriptorsFromLogic, setDescriptorsFromLogic] = useState(initialDescriptors)
    useEffect(() => {
        const subscribtionCallback = () => {
            const playersDescriptors = getPlayersDescriptors();
            setDescriptorsFromLogic(playersDescriptors);
        };
        Players?.instance?.subscribe({
            callback: subscribtionCallback,
            id: GAME_STARTER_ID,
            messageType: Messages.loadPlayers,
        })
        return (
            () => {
                Players?.instance?.unsubscribe(Messages.loadPlayers, GAME_STARTER_ID);
            })
    }, [])
    return descriptorsFromLogic ?? TEST_PLAYERS
}

export const GameStarter = () => {
    // This component should render initial view, where player may select color, name, nr of players
    // and players strategies
    // For now it is only a wrapper delivering data

    // useStartChanceCardsHolders();
    // useEffect(() => {new Bank()}, [])
    useEffect(() => {
        new Game({
            playersData: getPlayersDescriptors(),
        })
    }, [])
    const playersDescriptors = usePlayersDescriptors()
    return (
        <>
            <Board/>
            <Pawns playerDescriptors={playersDescriptors}/>
            {/* <Pawns playerDescriptors={TEST_PLAYERS}/> */}
            <CommandArea/>
        </>
    )
}