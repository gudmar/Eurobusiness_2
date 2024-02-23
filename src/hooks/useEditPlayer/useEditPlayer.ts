import { useCallback, useEffect, useReducer, useRef } from "react";
import { Informator } from "../../Components/Information/Infromator";
import { PRISON_FIELD_NR_INDEXED_FROM_0 } from "../../Constants/constants";
import { tColors } from "../../Data/types";
import { clearArray } from "../../Functions/clearArray";
import { ANY_CHANGE } from "../../Logic/Messages/constants";
import { Players } from "../../Logic/Players/Players";
import { iPlayer } from "../../Logic/Players/types";
import { iSubscription, tSubscription } from "../../Types/types";
import { changeStateAction, getUpdateFieldNr, getUpdateGameLost, getUpdateIsInPrison, getUpdateMoney, getUpdateName, getUpdateSpecialCards, getUpdateState, getUpdateTurnsToWait, reducer,} from "./utils";

const getPlayerInstance = (instances: iPlayer[], color: tColors) => (instances.find((instance: iPlayer) => instance.color === color) || null)

interface iSubscribeArgs {
    propName: string,
    callback: tSubscription,
    playerInstance: iPlayer,
    instanceId: string,
}

const getSubscribtions = ({ propName, callback, playerInstance, instanceId }: iSubscribeArgs) => {
    const id = `${instanceId}-${playerInstance.color}-${propName}`;
    const messageType = ANY_CHANGE;
    const subscribtion: iSubscription<string> = { callback, id, messageType }
    const subscribe = () => { playerInstance.subscribe(subscribtion) };
    const unsubscribe = () => { playerInstance.unsubscribe(messageType, id) }
    return { subscribe, unsubscribe }
}

const subscribtionsStructure = [
    {propName: 'name',         callback: getUpdateName},
    {propName: 'money',        callback: getUpdateMoney},
    {propName: 'specialCards', callback: getUpdateSpecialCards},
    {propName: 'fieldNr',      callback: getUpdateFieldNr},
    {propName: 'isInPrison',   callback: getUpdateIsInPrison},
    {propName: 'turnsToWait',  callback: getUpdateTurnsToWait},
    {propName: 'gameLost',     callback: getUpdateGameLost},
    {propName: 'state',        callback: getUpdateState},
]

export const getUseEditPlayer = (instanceId: string) => (wantedColor: tColors) => {
    const infromator = new Informator();
    const players = Players.players
    const thisPlayer = Players.getPlayerByColor(wantedColor);
    const initialState = {...thisPlayer.state }
    const [{
        name, money, specialCards, color, fieldNr, isInPrison, nrTurnsToWait, isGameLost
    }, dispatch ] = useReducer(reducer, initialState)
    const player = useRef<null | iPlayer>(null)

    useEffect(() => {
        const subscribtions: (()=>void)[] = [];
        const unsubscribtions: (()=>void)[] = [];
        const fillSubscribtions = () => {
            subscribtionsStructure.forEach(({propName, callback}) => {
                if (player.current) {
                    const {subscribe, unsubscribe} = getSubscribtions({propName, callback: callback(dispatch), playerInstance: player.current, instanceId})
                    subscribtions.push(subscribe);
                    unsubscribtions.push(unsubscribe);
                }
                
            })
        }
        const subscribeAll = () => subscribtions?.forEach((cb) => cb());
        const unsubscribeAll = () => unsubscribtions?.forEach((cb) => cb());
        const clearSubscribtions = () => { clearArray(subscribtions); clearArray(unsubscribtions) }
        player.current = getPlayerInstance(players, wantedColor)
        if (player.current) { 
            fillSubscribtions(); subscribeAll(); 
        }
        const newPlayerState = player?.current?.state;
        dispatch(changeStateAction(newPlayerState))
        return () => { unsubscribeAll(); clearSubscribtions(); }
    }, []
    )


    const setName = useCallback((val: string) => {
        if (player && player.current) {
            player.current.name = val
        }
    }, [wantedColor])
    const setFieldNr = useCallback((val: string) => {
        if (player && player.current && !player.current.isInPrison) {
            player.current.fieldNr = parseInt(val)
        } else {
            infromator.displayError(
                {
                    title: 'Operation not allowed',
                    message: 'Player cannot be moved as long as he is in prison'
                }
            )
        }
    }, [wantedColor])

    // const setMoney = useCallback((val: string) => {
    //     if (player && player.current) {
    //         player.current.money = parseInt(val)
    //     }
    // }, [wantedColor])
    const setMoney = (val: string) => thisPlayer.money = val;

    const setNrTurnsToWait = useCallback((val: string) => {
        if (player && player.current) {
            player.current.nrTurnsToWait = parseInt(val)
        }
    }, [wantedColor])
    const setIsInPrison = useCallback((val: boolean) => {
        if (player && player.current && player.current.fieldNr === PRISON_FIELD_NR_INDEXED_FROM_0) {
            player.current.isInPrison = val
        } else {
           infromator.displayError({title: 'Operation not allowed', message: 'Player may be marked as prisoner, only when he is on the "Jail" field (nr 11)'})
        }
    }, [wantedColor])
    const setIsGameLost = useCallback((val: boolean) => {
        if (player && player.current) {
            player.current.isGameLost = val
        }
    }, [wantedColor])

    return {
        name, setName, setMoney, money, 
        specialCards, color, fieldNr, setFieldNr, 
        isInPrison, setIsInPrison, nrTurnsToWait, 
        setNrTurnsToWait, isGameLost, setIsGameLost,
    }
}

export const useEditPlayer = getUseEditPlayer('player');
export const usePlayerInfo = getUseEditPlayer('player-info')
