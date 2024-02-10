import { useEffect, useMemo, useState } from "react";
import { tColors } from "../Data/types";
import { ANY_CHANGE, Messages, MOVE } from "../Logic/Messages/constants";
import { Player } from "../Logic/Player/Player";
import { Players } from "../Logic/Players/Players";
import { getUseSubscribtion } from "./useSubscribtion";

// WORKS OK

const useSubscribtionPlayerStateChange = getUseSubscribtion(ANY_CHANGE);
const useSubscribtionNewPlayer = getUseSubscribtion(Messages.loadPlayers)

const useSubscribtionPlayerStateChangeWithInitialStateSet = (player: Player, cb: (data: any) => void) => {
    useSubscribtionPlayerStateChange(player, cb);
    useEffect(() => { cb(player.state);}, [player])
}

const useSubscribtionNewPlayer_log = (arg1: any, arg2: any) => {
    useSubscribtionNewPlayer(arg1, arg2);
}

export const usePawnFieldIndex = (color: tColors) => {
    const players = useMemo(() => {
        const players = new Players({})
        return players
    }, []);
    const [player, setPlayer] = useState(Players.getPlayerByColor(color))
    const [playerIndex, setPlayerIndex] = useState(players.getPlayerFieldIndex(color))
    const setPosition = (data: any) => { setPlayerIndex(data.fieldNr)}
    useSubscribtionNewPlayer_log(players as Players, () => { setPlayer(Players.getPlayerByColor(color))})
    useSubscribtionPlayerStateChangeWithInitialStateSet(player as Player, setPosition)
    return playerIndex
}
