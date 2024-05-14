import { useCallback, useEffect, useReducer, useRef } from "react";
import { Informator } from "../../Components/Information/Infromator";
import { PRISON_FIELD_NR_INDEXED_FROM_0 } from "../../Constants/constants";
import { tColors } from "../../Data/types";
import { clearArray } from "../../Functions/clearArray";
import { ANY_CHANGE } from "../../Logic/Messages/constants";
import { PassStartPayments } from "../../Logic/Player/types";
import { Players } from "../../Logic/Players/Players";
import { iPlayer } from "../../Logic/Players/types";
import { iSubscription, tSubscription } from "../../Types/types";
import { changeStateAction, getUpdateFieldNr, getUpdateGameLost, getUpdateIsInPrison, getUpdateMoney, getUpdateName, getUpdateShouldPayForPassingStart, getUpdateSpecialCards, getUpdateState, getUpdateTurnsToWait, reducer,} from "./utils";

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
    {propName: 'shouldPayForPassingStart', callback: getUpdateShouldPayForPassingStart}
]

export const getUseEditPlayer = (instanceId: string) => (wantedColor: tColors) => {
    const infromator = new Informator();
    const players = Players.players
    const player = Players.getPlayerByColor(wantedColor);
    const specialCards = player.specialCards;
    const initialState = {...player.state }
    const [{
        name, money, color, fieldNr, isInPrison, nrTurnsToWait, isGameLost, lastFieldNr, shouldPayForPassingStart
    }, dispatch ] = useReducer(reducer, initialState)
    useEffect(() => {
        const subscribtions: (()=>void)[] = [];
        const unsubscribtions: (()=>void)[] = [];
        const fillSubscribtions = () => {
            subscribtionsStructure.forEach(({propName, callback}) => {
                if (player) {
                    const {subscribe, unsubscribe} = getSubscribtions({propName, callback: callback(dispatch), playerInstance: player, instanceId})
                    subscribtions.push(subscribe);
                    unsubscribtions.push(unsubscribe);
                }
                
            })
        }
        const subscribeAll = () => subscribtions?.forEach((cb) => cb());
        const unsubscribeAll = () => unsubscribtions?.forEach((cb) => cb());
        const clearSubscribtions = () => { clearArray(subscribtions); clearArray(unsubscribtions) }
        // player = getPlayerInstance(players, wantedColor)
        if (player) { 
            fillSubscribtions(); subscribeAll(); 
        }
        const newPlayerState = player?.state;
        dispatch(changeStateAction(newPlayerState))
        return () => { unsubscribeAll(); clearSubscribtions(); }
    }, [player]
    )


    const setName = useCallback((val: string) => {
        if (player ) {
            player.name = val
        }
    }, [wantedColor])
    const setFieldNr = useCallback((val: string) => {
        if (player  && !player.isInPrison) {
            player.setLastFieldNrForTestingPurposes(parseInt(val))
            player.fieldNr = parseInt(val)
        } else {
            infromator.displayError(
                {
                    title: 'Operation not allowed',
                    message: 'Player cannot be moved as long as he is in prison'
                }
            )
        }
    }, [wantedColor])

    const setLastFieldNr = useCallback((val: string) => {
        if (player) {
            player.setLastFieldNrForTestingPurposes(parseInt(val))
        } else {
            infromator.displayError(
                {
                    title: 'Operation not allowed',
                    message: 'Player does not exist'
                }
            )
        }
    }, [wantedColor])

    // const setMoney = useCallback((val: string) => {
    //     if (player && player) {
    //         player.money = parseInt(val)
    //     }
    // }, [wantedColor])
    const setMoney = (val: string) => player.money = val;

    const setNrTurnsToWait = useCallback((val: string) => {
        if (player) {
            player.nrTurnsToWait = parseInt(val)
        }
    }, [wantedColor])
    const setIsInPrison = useCallback((val: boolean) => {
        if (player && player.fieldNr === PRISON_FIELD_NR_INDEXED_FROM_0) {
            player.isInPrison = val
        } else {
           infromator.displayError({title: 'Operation not allowed', message: 'Player may be marked as prisoner, only when he is on the "Jail" field (nr 11)'})
        }
    }, [wantedColor])
    const setIsGameLost = useCallback((val: boolean) => {
        if (player) {
            player.isGameLost = val
        }
    }, [wantedColor])
    const setShouldPayForPassingStart = useCallback((val: PassStartPayments) => {
        if(player) player.shouldPayForPassingStart = val;
    }, [wantedColor]);

    return {
        name, setName, setMoney, money, 
        specialCards, color, fieldNr, setFieldNr, 
        isInPrison, setIsInPrison, nrTurnsToWait, 
        setNrTurnsToWait, isGameLost, setIsGameLost, setLastFieldNr, lastFieldNr, shouldPayForPassingStart,
        setShouldPayForPassingStart,
    }
}

export const useEditPlayer = getUseEditPlayer('player');
export const usePlayerInfo = getUseEditPlayer('player-info')
