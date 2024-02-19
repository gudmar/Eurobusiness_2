import { useEffect, useState } from "react"
import { iNamedChance, iNamedCityField, iNamedNonCityEstates, iNamedOtherField, tChanceType, tCity, tFlattenedFieldTypes, tNonCityEstates, tOtherTypes } from "../Data/types";
import { getBoardCaretaker } from "../Functions/getBoardCaretaker";
import { tField } from "../Logic/boardTypes";
import { iSubscription } from "../Types/types";

type tFieldName = tCity | tNonCityEstates | tOtherTypes | tChanceType

export const getFieldState = (name: tFieldName) => {
    const caretaker = getBoardCaretaker();
    const thisField = caretaker.getFieldByName(name)
    return (thisField)
}

type tSubscriptionArgs = iSubscription<tFlattenedFieldTypes>

export const useAbstractField = <StateType>(name: tFlattenedFieldTypes) => {
    const ID: tFlattenedFieldTypes = name;
    const caretaker = getBoardCaretaker();
    const thisField = caretaker.getFieldByName(name)
    const [state, setState]: [StateType, (arg0: StateType) => void] = useState<any>(thisField!.state)
    const setNewState = (val: StateType) => {
        setState({...val})
    }
    useEffect(() => {
        const subscribeArgs: tSubscriptionArgs = {
            callback: setNewState,
            id: ID,
            messageType: name
        }
        thisField!.subscribe(subscribeArgs)
        return () => thisField!.unsubscribe(name, ID)
    }, [setNewState, thisField])
    return ({...state, logSubscribtions: () => thisField?.logSubscribtions()})
}


export const useCityField = (name: tCity) => {
    const state = useAbstractField<iNamedCityField>(name)
    return state
}
export const useNonCityEstatesField = (name: tNonCityEstates) => {
    const state = useAbstractField<iNamedNonCityEstates>(name);
    return state
}
export const useOtherField = (name: tOtherTypes) => {
    const state = useAbstractField<iNamedOtherField>(name);
    return state
}
export const useChanceField = (name: tChanceType) => {
    const state = useAbstractField<iNamedChance>(name)
    return state;
}
