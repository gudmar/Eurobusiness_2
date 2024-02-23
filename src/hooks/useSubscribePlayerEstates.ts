import { useEffect, useState } from "react";
import { CITY, PLANT, RAILWAY } from "../Data/const";
import { tEstateTypes } from "../Data/types";
import { getEstateSubscribtion } from "../Functions/getEstateSubscribtion";
import { getBoard } from "../Logic/BoardCaretaker";
import { tEstateField } from "../Logic/boardTypes";
import { Player } from "../Logic/Player/Player";
import { Players } from "../Logic/Players/Players";
import { useEstateOwners } from "./useEstateOwners";

const getEstatesOwnedByPlayerNamed = (ownerName: string) => {
    const boardEndpoint = getBoard();
    const estates = boardEndpoint.estates.filter(({type}) => [CITY, PLANT, RAILWAY].includes(type)) as tEstateField[];
    const ownerColor = Players.playerNameToPlayerColor(ownerName);
    console.log(ownerColor)
    const ownedEstates = estates.filter(({owner}) => owner === ownerColor)
    console.log('Estates getter', ownedEstates)
    return ownedEstates;
}

const useSubscribeToEachEstate = (callback: (state: any) => void) => {
    const boardEndpoint = getBoard();
    const estates = boardEndpoint.estates.filter(({type}) => [CITY, PLANT, RAILWAY].includes(type)) as tEstateField[];
    useEffect(() => {
        const unsubscribtions = estates.map((estate) => {
            const {subscribe, unsubscribe} = getEstateSubscribtion({estateInstance: estate, callback, subscribtionId: 'useSubscribeToEachEstate'})
            subscribe();
            return unsubscribe
        })
        return () => unsubscribtions.forEach((unsubscribe) => unsubscribe())
    }, [callback])
}

export const useGetPlayerEstates = (ownerName: string) => {
    const [ownedEstates, setOwnedEstates] = useState(getEstatesOwnedByPlayerNamed(ownerName));
    const updateEstatesData = () => {
        setOwnedEstates(getEstatesOwnedByPlayerNamed(ownerName));
    };
    useSubscribeToEachEstate(updateEstatesData)
    console.log('Owned estates by player', ownerName, ownedEstates)
    return ownedEstates
}

export const useGetPlayerEstatesNames = (ownerName: string) => {
    const estates = useGetPlayerEstates(ownerName);
    const names = estates.map(({name}) => name);
    return names;
}
