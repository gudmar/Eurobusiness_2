import { useEffect, useMemo, useState } from "react";
import { tColors } from "../Data/types";
import { ANY_CHANGE, Messages, MOVE } from "../Logic/Messages/constants";
import { Player } from "../Logic/Player/Player";
import { Players } from "../Logic/Players/Players";
import { iPlayer } from "../Logic/Players/types";
import { getUseSubscribtion } from "./useSubscribtion";

// WORKS OK

const useSubscribtionPlayerStateChange = getUseSubscribtion(ANY_CHANGE);
const useSubscribtionNewPlayer = getUseSubscribtion(Messages.loadPlayers)

const useSubscribtionPlayerStateChangeWithInitialStateSet = (player: Player, cb: (data: any) => void) => {
    useSubscribtionPlayerStateChange(player, cb);
    useEffect(() => { 
        if (player) {
            cb(player.state);
        }
    }, [player])
}

const useSubscribtionNewPlayer_log = (arg1: any, arg2: any) => {
    useSubscribtionNewPlayer(arg1, arg2);
}

// export const usePawnFieldIndex = (color: tColors) => {
//     const players = useMemo(() => {
//         const players = new Players({})
//         // const players = Players._instance
//         return players
//     }, []);
//     const [player, setPlayer] = useState(Players.getPlayerByColor(color))
//     const [playerIndex, setPlayerIndex] = useState(players.getPlayerFieldIndex(color))
//     const setPosition = (data: any) => { setPlayerIndex(data.fieldNr)}
//     useSubscribtionNewPlayer_log(players as Players, () => { setPlayer(Players.getPlayerByColor(color))})
//     useSubscribtionPlayerStateChangeWithInitialStateSet(player as Player, setPosition)
//     return playerIndex
// }

export const usePawnFieldIndex = (color: tColors) => {
    const players = Players._instance;
    // const players = useMemo(() => {
    //     const players = new Players({})
    //     // const players = Players._instance
    //     return players
    // }, []);
    const [player, setPlayer] = useState<iPlayer | null>(null)
    const [playerIndex, setPlayerIndex] = useState<number>(0)
    const setPosition = (data: any) => { setPlayerIndex(data.fieldNr)}
    useEffect(() => {
        if (Players) {
            try {
                setPlayer(Players.getPlayerByColor(color));
                setPlayerIndex(Players._instance.getPlayerFieldIndex(color))    
            } catch (e) {

            }
        }
    
    }, [Players._instance, color])
    useSubscribtionNewPlayer_log(Players._instance as Players, () => { setPlayer(Players.getPlayerByColor(color))})
    useSubscribtionPlayerStateChangeWithInitialStateSet(player as Player, setPosition)
    return playerIndex
}
