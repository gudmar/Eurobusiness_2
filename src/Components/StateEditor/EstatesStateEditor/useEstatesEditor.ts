import { useEffect, useState } from "react"
import { tSelectedEstate } from "./types"

// type tStateProperty = boolean | number | string | null | undefined | number[] | string [] | tEstateTypes
type tStateProperty = any

interface iEstatesState {
    [key: string | symbol | number]: tStateProperty
}

const initialState: iEstatesState = {
    estateColor: null,
    country: null,
    hotelPrice: null,
    housePrice: null,
    index: null,
    isPlegded: null,
    mortgage: null,
    name: null,
    nrOfHouses:null,
    nrOfHotels: null,
    owner: null,
    price: null,
    type: null,
    visit: null,
}

export const useEstatesEditor = (editedEstate: tSelectedEstate) => {
    useEffect(() => {
        console.error('FieldCreators need runAllSubscribtions implementation')
    }, [])
    const [etatesState, setEstatesState] = useState<iEstatesState>(initialState)
    useEffect(() => {
        const newState: iEstatesState = editedEstate?.state || initialState;
        setEstatesState(newState);

    }, [editedEstate])
    const setIsPlegded = (newValue: boolean) => editedEstate?.isPlegded

    return {
        ...editedEstate,

    }
}
