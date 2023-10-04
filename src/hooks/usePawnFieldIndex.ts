import { useEffect, useState } from "react";
import { tColors } from "../Data/types";
import { Players } from "../Logic/Players/Players";

export const usePawnFieldIndex = (color: tColors) => {
    const players = new Players({});
    const [playerIndex, setPlayerIndex] = useState(players.getPlayerFieldIndex(color))
    useEffect(() => {
        const index = players.getPlayerFieldIndex(color);
        setPlayerIndex(index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color, setPlayerIndex])
    return playerIndex
}
