import { useEffect, useState } from "react"
import { TEST_PLAYERS } from "../../Constants/testPlayers"
import { GameSettings } from "../../GameSettings/GameSettings"
import { Messages } from "../../Logic/Messages/constants"
import { Players } from "../../Logic/Players/Players"
import { Board } from "../Board/Board"
import CommandArea from "../CommandArea/CommandArea"
import { Pawns } from "../Pawns/Pawns"

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
        if (Players?.instance) {
            Players?.instance?.subscribe({
                callback: subscribtionCallback,
                id: GAME_STARTER_ID,
                messageType: Messages.loadPlayers,
            })    
        }
        return (
            () => {
                if (Players?.instance) {
                    Players?.instance?.unsubscribe(Messages.loadPlayers, GAME_STARTER_ID);
                }
            })
    }, [Players.instance])
    return descriptorsFromLogic ?? TEST_PLAYERS
}

export const GameStarter = () => {
    // This component should render initial view, where player may select color, name, nr of players
    // and players strategies
    // For now it is only a wrapper delivering data

    // useStartChanceCardsHolders();
    // useEffect(() => {new Bank()}, [])
    const playersDescriptors = usePlayersDescriptors()
    return (
        <>
            <GameSettings />
            <Board/>
            <Pawns playerDescriptors={playersDescriptors}/>
            <CommandArea/>
        </>
    )
}