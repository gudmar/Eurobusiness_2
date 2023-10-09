import { useEffect, useMemo, useState } from "react";
import { tColors } from "../Data/types";
import { Players } from "../Logic/Players/Players";

// WORKS OK

export const usePawnFieldIndex = (color: tColors) => {
    const players = useMemo(() => {
        const players = new Players({})
        return players
    }, []);
    const [playerIndex, setPlayerIndex] = useState(players.getPlayerFieldIndex(color))
    useEffect(() => {
        const index = players.getPlayerFieldIndex(color);
        setPlayerIndex(index)
    }, [color, setPlayerIndex, players])
    return playerIndex
}
