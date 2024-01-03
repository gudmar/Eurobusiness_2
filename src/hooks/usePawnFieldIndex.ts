import { useEffect, useMemo, useState } from "react";
import { tColors } from "../Data/types";
import { ANY_CHANGE, MOVE } from "../Logic/Messages/constants";
import { Player } from "../Logic/Player/Player";
import { Players } from "../Logic/Players/Players";
import { getUseSubscribtion } from "./useSubscribtion";

// WORKS OK

const useSubscribtionPlayerStateChange = getUseSubscribtion(ANY_CHANGE);
const useSubscribtionPlayerMove = getUseSubscribtion(MOVE);

export const usePawnFieldIndex = (color: tColors) => {
    const players = useMemo(() => {
        const players = new Players({})
        return players
    }, []);
    const player = Players.getPlayerByColor(color);
    const [playerIndex, setPlayerIndex] = useState(players.getPlayerFieldIndex(color))
    const move = (data: any) => {
        console.error('This move operation may cause bugs. Look what data is', data);
        setPlayerIndex(data)
    }
    const setPosition = (data: any) => { setPlayerIndex(data.fieldNr)}
    useSubscribtionPlayerStateChange(player as Player, setPosition)
    useSubscribtionPlayerMove(player as Player, move)
    
    return playerIndex
}
