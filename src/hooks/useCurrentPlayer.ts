import { useEffect, useState } from "react";
import { Messages } from "../Logic/Messages/constants";
import { Player } from "../Logic/Player/Player";
import { Players } from "../Logic/Players/Players";

export const useCurrentPlayer = () => {
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    useEffect(() => {
        const subscribtion = {
            id: 'useCurrentPlayer change',
            callback: (player: Player) => {
                setCurrentPlayer(player)
            },
            messageType: Messages.playerChanged
        }
        if (Players._instance) {
            Players._instance.subscribeWithInformation(subscribtion)
        }
        return () => Players?._instance?.unsubscribe(Messages.playerChanged, subscribtion.id)
    }, [Players._instance])
    return {
        currentPlayer,
        currentPlayerColor: currentPlayer?.color,
        currentPlayerName: currentPlayer?.name,
    }
}
