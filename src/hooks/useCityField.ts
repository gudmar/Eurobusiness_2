import { useEffect, useState } from "react"
import { iCityField, tCity } from "../Data/types";
import { useBoardFields } from "./useBoardFields"

export const useCityField = (name: tCity) => {
    const { caretaker } = useBoardFields();
    const ID: tCity = name;
    const thisCity = caretaker.getFieldByName(name)
    const [{
        type, country, price, mortgage, housePrice, hotelPrice, visit, owner, nrOfHouses, color
    }, setState]: [iCityField, any] = useState(thisCity.state)
    
    
    useEffect(() => {
        thisCity.subscribe({
            callback: setState,
            id: ID,
            messageType: name
        })
        return thisCity.unsubscribe(name, ID)
    }, [])

    return ({
        type, country, price, mortgage, housePrice, hotelPrice, visit, owner, nrOfHouses, color
    })
}
