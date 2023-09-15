import { useEffect, useState } from "react"
import { iNamedChance, iNamedCityField, iNamedNonCityEstates, iNamedOtherField, iNonCityEstates, iOtherFieldTypes, tChanceType, tCity, tNonCityEstates, tOtherTypes } from "../Data/types";
import { getBoardCaretaker } from "../Functions/getBoardCaretaker";

type tFieldName = tCity | tNonCityEstates | tOtherTypes | tChanceType

export const getFieldState = (name: tFieldName) => {
    const caretaker = getBoardCaretaker();
    const thisField = caretaker.getFieldByName(name)
    return (thisField)
}    

export const useAbstractField = <FieldType>(name: tFieldName) => {
    const ID: tFieldName = name;
    const caretaker = getBoardCaretaker();
    const thisField = caretaker.getFieldByName(name)
    const [state, setState]: [FieldType, any] = useState(thisField.state)
    useEffect(() => {
        thisField.subscribe({
            callback: setState,
            id: ID,
            messageType: name
        })
        return thisField.unsubscribe(name, ID)
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
