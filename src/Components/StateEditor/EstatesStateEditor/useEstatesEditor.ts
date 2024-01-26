import { useEffect, useState } from "react"
import { tOwner } from "../../../Data/types"
import { CityField } from "../../../Logic/FieldCreators"
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
    if (!editedEstate) {
        return {
            ...initialState,
        }
    }
    useEffect(() => {
        console.error('FieldCreators need runAllSubscribtions implementation')
    }, [])
    const [etatesState, setEstatesState] = useState<iEstatesState>(initialState)
    useEffect(() => {
        const newState: iEstatesState = editedEstate?.state || initialState;
        setEstatesState(newState);

    }, [editedEstate])
    const setIsPlegded = (newValue: boolean) => editedEstate?.isPlegded
    const setNrOfHouses = (newValue: number) => {
        if (Object.values(editedEstate || {}).includes('nrOfHouses')){
            (editedEstate as CityField)!.nrOfHouses = newValue;
        }
    }
    const setNrOfHotels = (newValue: number) => {
        if (Object.values(editedEstate || {}).includes('nrOfHotels')){
            (editedEstate as CityField)!.nrOfHotels = newValue;
        }
    }
    const setOwner = (owner: tOwner) => {
        if (editedEstate) editedEstate.owner = owner
    }
    const estateColor = (editedEstate as CityField).color;
    const country = (editedEstate as CityField).country;
    const hotelPrice = (editedEstate as CityField).hotelPrice;
    const housePrice = (editedEstate as CityField).housePrice;
    const index = (editedEstate as CityField).index;
    const isPlegded = (editedEstate as CityField).isPlegded;
    const mortgage = (editedEstate as CityField).mortgage;
    const name = (editedEstate as CityField).name;
    const nrOfHouse = (editedEstate as CityField).nrOfHouses;
    const nrOfHotels = (editedEstate as CityField).nrOfHotels;
    const owner = (editedEstate as CityField).owner;
    const price = (editedEstate as CityField).price;
    const type = (editedEstate as CityField).type;
    const visit = (editedEstate as CityField).visit;


    return {
        ...editedEstate,
        setIsPlegded,
        setNrOfHotels,
        setNrOfHouses,
        setOwner,
        estateColor,
        country,
        hotelPrice,
        housePrice,
        index,
        isPlegded,
        mortgage,
        name,
        nrOfHouse,
        nrOfHotels,
        owner,
        price,
        type,
        visit,
    }
}
