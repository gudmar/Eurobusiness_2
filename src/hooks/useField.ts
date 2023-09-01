import { useEffect, useState } from "react"
import { iNamedChance, iNamedCityField, iNamedNonCityEstates, iNamedOtherField, iNonCityEstates, iOtherFieldTypes, tChanceType, tCity, tNonCityEstates, tOtherTypes } from "../Data/types";
import { useBoardFields } from "./useBoardFields"

type tFieldName = tCity | tNonCityEstates | tOtherTypes | tChanceType

export const useAbstractField = <FieldType>(name: tFieldName) => {
    const { caretaker } = useBoardFields();
    const ID: tFieldName = name;
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

    return ({...state})
}

export const useCityField = (name: tCity) => useAbstractField<iNamedCityField>(name)
export const useNonCityEstatesField = (name: tNonCityEstates) => useAbstractField<iNamedNonCityEstates>(name);
export const useOtherField = (name: tOtherTypes) =>  useAbstractField<iNamedOtherField>(name);
export const useChanceField = (name: tChanceType) => useAbstractField<iNamedChance>(name)


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
