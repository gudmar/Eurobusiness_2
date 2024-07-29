import { useEffect, useState } from "react";
import { Messages } from "../Logic/Messages/constants";
import { Players } from "../Logic/Players/Players";
import { tPlayersState } from "../Logic/Players/types";

const INITIAL_STATE = {
    currentPlayersColor: '',
    currentPlayersName: '',
    playerNamesOrder: [],
}

export const useSubscribeToPlayersState = (id: string): tPlayersState => {
    const [state, setState] = useState(Players?.instance?.state || INITIAL_STATE)
    useEffect(() => {
        const subscribion = {
            callback: setState,
            id,
            messageType: Messages.stateChanged
        }
        if (Players?.instance) {
            Players.instance.subscribeWithInformation(subscribion);
        }
        return (() => {
            if (Players.instance) {
                Players.instance.unsubscribe(Messages.stateChanged, id)
            }
        })
    }, [Players.instance])
    return {...state}
}
