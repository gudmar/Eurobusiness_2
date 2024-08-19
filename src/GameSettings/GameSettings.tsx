import { useEffect } from "react"
import { START_PLAYER_COLOR, START_PLAYER_NAME, START_PLAYER_NAMES_ORDER, TEST_PLAYERS } from "../Constants/testPlayers";
import { useModal } from "../hooks/useModal"
import { Game } from "../Logic/Game/Game";
import { Players } from "../Logic/Players/Players";

const getTestPlayersSnapshot = () => {
    return {
        playersList: TEST_PLAYERS,
        currentPlayersName: START_PLAYER_NAME,
        currentPlayersColor: START_PLAYER_COLOR,
        currentInterruptingPlayerName: START_PLAYER_NAME,
        currentInterruptingPlayerColor: START_PLAYER_COLOR,
        playerNamesOrder: START_PLAYER_NAMES_ORDER,
    }
}

const getPlayersSnapshot = () => {
    const result = Players.exists ? Players.snapshot : getTestPlayersSnapshot();
    console.log('Players snapshot is', result)
    return result;
}

const GameSettingsGuts = () => {
    
    return (
        <ul>
            <li>New game</li>
            <li>Load game</li>
            <li>Configure players</li>
        </ul>
    )
}

export const GameSettings = () => {
    const {Component: GameSettingsInModal, setOpen: openGameSettings, setClose: closeGamesettings, isOpen: isSettingsOpen} = useModal(GameSettingsGuts)
    
    useEffect(() => {
        new Game({
            // playersData: getPlayersDescriptors(),
            playersData: getPlayersSnapshot(),
        })
    }, [])

    useEffect(() => closeGamesettings(), []);

    if (!isSettingsOpen) return null;
    return (
        <>{GameSettingsInModal}</>
    )
}
