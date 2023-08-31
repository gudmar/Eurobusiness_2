import { useEffect, useState } from "react"
import { iCityField, tCity } from "../Data/types";
import { CityField } from "../Logic/FieldCreators";
import { useBoardFields } from "./useBoardFields"

const getCityStateFromCityInstance = (instance: CityField) => ({
    name: instance.name,
    type: instance.type,
    country: instance.country,
    price: instance.price,
    mortage: instance.mortage,
    housePrice: instance.housePrice,
    hotelPrice: instance.hotelPrice,
    visit: instance.visit,
    owner: instance.owner,
    nrOfHouses: instance.nrOfHouses,
    isPlegded: instance.isPlegded,
    color: instance.color,
})

export const useCityField = (name: tCity) => {
    const { caretaker } = useBoardFields();
    const ID: tCity = name;
    const thisCity = caretaker.getFieldByName(name)
    const [{
        type, country, price, mortage, housePrice, hotelPrice, visit, owner, nrOfHouses, color
    }, setState]: [iCityField, any] = useState(getCityStateFromCityInstance(thisCity))
    
    
    useEffect(() => {
        thisCity.subscribe({
            callback: setState,
            id: ID,
            messageType: name
        })
        return thisCity.unsubscribe(name, ID)
    }, [])

    return ({
        type, country, price, mortage, housePrice, hotelPrice, visit, owner, nrOfHouses, color
    })
}
