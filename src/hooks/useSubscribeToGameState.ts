import { useEffect, useState } from "react";
import { Game } from "../Logic/Game/Game";
import { Messages } from "../Logic/Game/types";

export const useSubscribeToGameState = (id: string) => {
    const [state, setState] = useState(Game.state)
    useEffect(() => {
        const subscribion = {
            callback: setState,
            id,
            messageType: Messages.stateChanged
        }
        if (Game?.instance) {
            Game.instance.subscribeWithInformation(subscribion);
        }
        return (() => {
            if (Game.instance) {
                Game.instance.unsubscribe(Messages.stateChanged, id)
            }
        })
    }, [Game.instance])
    return {...state}
}
