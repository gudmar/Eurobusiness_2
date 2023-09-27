import { useEffect, useState } from "react"
import { iNamedChance, iNamedCityField, iNamedNonCityEstates, iNamedOtherField, iNonCityEstates, iOtherFieldTypes, tChanceType, tCity, tNonCityEstates, tOtherTypes } from "../Data/types";
import { getBoardCaretaker } from "../Functions/getBoardCaretaker";
import { tField } from "../Logic/boardTypes";
import { iSubscription } from "../Types/types";

type tFieldName = tCity | tNonCityEstates | tOtherTypes | tChanceType

export const getFieldState = (name: tFieldName) => {
    const caretaker = getBoardCaretaker();
    const thisField = caretaker.getFieldByName(name)
    return (thisField)
}

const A = 'A';
const B = 'B';
const C = 'C';
const D = 'D';
type AB = typeof A | typeof B;
type CD = typeof C | typeof D;

type ABCD1 = AB | CD;

const av: ABCD1 = 'A'
const d = av;

type tMessageType = tCity | tNonCityEstates | tOtherTypes | tChanceType
type tConbineUnions<T> = T extends string ? T : never;
type tMessageTypes = tConbineUnions<tMessageType> 
// type tSubscriptionArgs = iSubscription<tCity> | iSubscription<tNonCityEstates> | iSubscription<tOtherTypes> | iSubscription<tChanceType>
type tSubscriptionArgs = iSubscription<tMessageTypes>

type tExtendSubscription<T> = T extends tMessageType ? iSubscription<T> : never
type tSubscriptionArgs1 = tExtendSubscription<tMessageType>;

type tStateType = iNamedChance | iNamedCityField | iNamedNonCityEstates | iNamedOtherField

type tExtractName<Field> = Field extends tField ? Field['name'] : never

export const useAbstractField = <StateType>(name: tMessageTypes) => {
    const ID: tMessageTypes = name;
    const caretaker = getBoardCaretaker();
    const thisField = caretaker.getFieldByName(name)
    type T = tExtractName<tField>
    const [state, setState]: [StateType, (arg0: StateType) => void] = useState<any>(thisField!.state)
    // const [state, setState]: [tStateType, (arg0: tStateType)=>void] = useState<any>(thisField!.state)
    useEffect(() => {
        const subscribeArgs: tSubscriptionArgs = {
            callback: setState,
            id: ID,
            messageType: name as tExtractName<T>
        }
        thisField!.subscribe(subscribeArgs)
        thisField!.subscribeDebug(
            setState,
            ID,
            name as tExtractName<T>
        )

        // thisField!.subscribe({
        //     callback: setState,
        //     id: ID,
        //     messageType: name
        // })
        return thisField!.unsubscribe(name, ID)
    }, [])
    return (state)
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


// export const useCityField = (name: tFieldName) => {
//     const { caretaker } = useBoardFields();
//     const ID: tFieldName = name;
//     const thisCity = caretaker.getFieldByName(name)
//     const [{
//         type, country, price, mortage, housePrice, hotelPrice, visit, owner, nrOfHouses, color
//     }, setState]: [iCityField, any] = useState(thisCity.state)
    
    
//     useEffect(() => {
//         thisCity.subscribe({
//             callback: setState,
//             id: ID,
//             messageType: name
//         })
//         return thisCity.unsubscribe(name, ID)
//     }, [])

//     return ({
//         type, country, price, mortage, housePrice, hotelPrice, visit, owner, nrOfHouses, color
//     })
// }
