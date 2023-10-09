import { useEffect, useState } from "react";
import { COLOR, FIELD_NR, IS_GAME_LOST, IS_IN_PREISON, MONEY, NAME, NR_TURNS_TO_WAIT, SPECIAL_CARDS } from "../Constants/constants";
import { BLUE } from "../Data/const";
import { DiceTestModeDecorator } from "../Logic/Dice/Dice";
import { SWITCH_PLAYER } from "../Logic/Messages/constants";
import { Players } from "../Logic/Players/Players"
import { iAllPlayers, iPlayer, iPlayerDescriptor, iPlayerState } from "../Logic/Players/types"

const USE_PLAYER_DATA_ID = 'use-player-data-id';

const getFromPlayer = (player: iPlayer | null, key: keyof iPlayerState) => {
    const result = player?.state?.[key];
    console.log(player, player?.state, key)
    return result;
}

const initialPlayerState = {
    currentPlayerColor: BLUE,
    currentPlayerName: '',
    currentPlayerMoney: 0,
    currentPlayerSpecialCards: [],
    currentPlayerFieldNr: 0,
    currentPlayerIsInPrison: false,
    currentPlayerNrTurnsToWait: 0,
    currentPlayerIsGameLost: false,
    allPlayersStates: [],
}

const getData = (allPlayersInstance: iAllPlayers) => {
    const currentPlayer = allPlayersInstance.currentPlayer
    const result = {
        currentPlayerColor: getFromPlayer(currentPlayer, COLOR),
        currentPlayerName: getFromPlayer(currentPlayer, NAME),
        currentPlayerMoney: getFromPlayer(currentPlayer, MONEY),
        currentPlayerSpecialCards: getFromPlayer(currentPlayer, SPECIAL_CARDS),
        currentPlayerFieldNr: getFromPlayer(currentPlayer, FIELD_NR),
        currentPlayerIsInPrison: getFromPlayer(currentPlayer, IS_IN_PREISON),
        currentPlayerNrTurnsToWait: getFromPlayer(currentPlayer, NR_TURNS_TO_WAIT),
        currentPlayerIsGameLost: getFromPlayer(currentPlayer, IS_GAME_LOST),
        allPlayersStates: allPlayersInstance?.allPlayersStates,
    }
    return result;
};

export const usePlayerData = (playersData: iPlayerDescriptor[] | null) => {
    const [playersInstance, setPlayersInstance] = useState<null | iAllPlayers>(null);
    const [currentPlayer, setCurrentPlayer] = useState<null | iPlayer>(null)
    const [data, setData] = useState<any>(initialPlayerState)
    useEffect(() => {
        if (playersInstance === null && playersData !== null) {
            const players = new Players({
                DiceClass: DiceTestModeDecorator, 
                players: playersData,
            });
            setPlayersInstance(players)
            const actualPlayer = players.currentPlayer;
            setCurrentPlayer(actualPlayer);
        }
    }, [playersData, playersInstance])
    useEffect(() => {
        playersInstance?.subscribe({
            callback: setCurrentPlayer,
            id: USE_PLAYER_DATA_ID,
            messageType: SWITCH_PLAYER,
        })
        if (playersInstance) {
            const newData = getData(playersInstance);
            console.log(currentPlayer, newData)
            setData(newData);    
        }
        return playersInstance?.unsubscribe(SWITCH_PLAYER, USE_PLAYER_DATA_ID)
    }, [setCurrentPlayer, playersInstance, currentPlayer])
    return data
}