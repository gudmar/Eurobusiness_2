import { useEffect, useState } from "react"
import { Messages } from "../Logic/Messages/constants";
import { Players } from "../Logic/Players/Players"
import { iPlayer } from "../Logic/Players/types";

const USE_PLAYERS = 'use-players'

export const usePlayersColors = () => {
     const [colors, setColors] = useState(Players.instance.colors);
     useEffect(() => {
        const subscribtionCallback = (players: iPlayer[]) => {
            const colors = players.map(({color}) => color );
            setColors(colors);
        }
        Players.instance!.subscribe({
            callback: subscribtionCallback,
            id: USE_PLAYERS,
            messageType: Messages.playerAddedDeleted,
        })
        return ( () => Players.instance.unsubscribe(Messages.playerAddedDeleted, USE_PLAYERS));        
     }, [])
     return colors;
}