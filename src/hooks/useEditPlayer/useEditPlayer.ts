import { useCallback, useEffect, useReducer, useRef } from "react";
import { tColors } from "../../Data/types";
import { clearArray } from "../../Functions/clearArray";
import { ANY_CHANGE } from "../../Logic/Messages/constants";
import { Player } from "../../Logic/Player/Player";
import { Players } from "../../Logic/Players/Players";
import { iPlayer } from "../../Logic/Players/types";
import { iSubscription, tSubscription } from "../../Types/types";
import { changeStateAction, getUpdateFieldNr, getUpdateGameLost, getUpdateIsInPrison, getUpdateMoney, getUpdateName, getUpdateSpecialCards, getUpdateState, getUpdateTurnsToWait, reducer,} from "./utils";

const getPlayerInstance = (instances: iPlayer[], color: tColors) => (instances.find((instance: iPlayer) => instance.color === color) || null)

interface iSubscribeArgs {
    propName: string,
    callback: tSubscription,
    playerInstance: iPlayer,
}

const getSubscribtions = ({ propName, callback, playerInstance }: iSubscribeArgs) => {
    const id = `player-${playerInstance.color}-${propName}`;
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

export const useEditPlayer = (wantedColor: tColors) => {
    const players = Players.players
    const [{
        name, money, specialCards, color, fieldNr, isInPrison, nrTurnsToWait, isGameLost
    }, dispatch ] = useReducer(reducer, Player.initialState)
    const player = useRef<null | iPlayer>(null)
    console.log(wantedColor)
    useEffect(() => {
        const subscribtions: (()=>void)[] = [];
        const unsubscribtions: (()=>void)[] = [];
        console.log('Changing subscribtions', players)
        const fillSubscribtions = () => {
            subscribtionsStructure.forEach(({propName, callback}) => {
                if (player.current) {
                    const {subscribe, unsubscribe} = getSubscribtions({propName, callback: callback(dispatch), playerInstance: player.current})
                    subscribtions.push(subscribe);
                    unsubscribtions.push(unsubscribe);
                }
                
            })
        }
        const subscribeAll = () => subscribtions?.forEach((cb) => cb());
        const unsubscribeAll = () => unsubscribtions?.forEach((cb) => cb());
        const clearSubscribtions = () => { clearArray(subscribtions); clearArray(unsubscribtions) }
        player.current = getPlayerInstance(players, wantedColor)
        if (player.current) { fillSubscribtions(); subscribeAll(); }
        const newPlayerState = player?.current?.state;
        dispatch(changeStateAction(newPlayerState))
        return () => { unsubscribeAll(); clearSubscribtions(); }
    }, [players, wantedColor])
    const setName = useCallback((val: string) => {
        if (player && player.current) {
            player.current.name = val
        }
    }, [wantedColor])
    const setFieldNr = useCallback((val: string) => {
        if (player && player.current) {
            player.current.fieldNr = parseInt(val)
        }
    }, [wantedColor])
    const setMoney = useCallback((val: string) => {
        if (player && player.current) {
            player.current.money = parseInt(val)
        }
    }, [wantedColor])
    const setNrTurnsToWait = useCallback((val: string) => {
        if (player && player.current) {
            player.current.nrTurnsToWait = parseInt(val)
        }
    }, [wantedColor])
    const setIsInPrison = useCallback((val: boolean) => {
        if (player && player.current) {
            player.current.isInPrison = val
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
