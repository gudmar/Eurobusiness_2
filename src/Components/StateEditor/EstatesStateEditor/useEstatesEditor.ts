import { useEffect, useReducer, useState } from "react"
import { CITY, UK, YELLOW } from "../../../Data/const"
import { tColors, tCountries, tEstateTypes, tOwner, tVisitPayment } from "../../../Data/types"
import { getReducer } from "../../../Functions/reducer"
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

type tSetter = (val: unknown) => void

interface iEstatesEditorState extends iEstatesState {
    setIsPlegded: tSetter,
    setNrOfHotels: tSetter,
    setNrOfHouses: tSetter,
    setOwner: tSetter,
    estateColor: string,
    country: tCountries,
    hotelPrice: number,
    housePrice: number,
    index: number,
    isPlegded: boolean,
    mortgage: number,
    name: string,
    nrOfHouse: number,
    nrOfHotels: number,
    owner: tOwner,
    price: number,
    type: tEstateTypes,
    visit: tVisitPayment,
}

const initialEstatesEditorState: iEstatesEditorState = {
    ...initialState,
    setIsPlegded: () => {},
    setNrOfHotels: () => {},
    setNrOfHouses: () => {},
    setOwner: () => {},
    estateColor: '#fff',
    country: UK,
    hotelPrice: 0,
    housePrice: 0,
    index: 0,
    isPlegded: false,
    mortgage: 0,
    name: '',
    nrOfHouse: 0,
    nrOfHotels: 0,
    owner: YELLOW,
    price: 0,
    type: CITY,
    visit: [0],
}

enum ActionTypes {
    newState = 'New state'
}

type tStateHandler = {
    type: ActionTypes,
    payload: tSelectedEstate,
}

type tActions = {
    type: ActionTypes.newState,
    payload: tSelectedEstate,
}

type tPropName = 'color' | 'country' |'hotelPrice'|'housePrice'|'index'|'isPlegded'|'mortgage'|'name'|'nrOfHouses'|'nrOfHotels'|'owner'|
    'price'|'type'|'visit'

const getProperty = (payload: CityField, propName: tPropName) => {
    const initialValue = initialState[`${propName}`];
    // console.log('Payload in getProperty', payload)
    if (!payload) return initialValue ?? null;
    return payload?.[`${propName}`]
}

const newState = (oldState: tSelectedEstate, payload: tSelectedEstate) => {
    // const estateColor = (payload as CityField).color;
    // const country =     (payload as CityField).country;
    // const hotelPrice =  (payload as CityField).hotelPrice;
    // const housePrice =  (payload as CityField).housePrice;
    // const index =       (payload as CityField).index;
    // const isPlegded =   (payload as CityField).isPlegded;
    // const mortgage =    (payload as CityField).mortgage;
    // const name =        (payload as CityField).name;
    // const nrOfHouse =   (payload as CityField).nrOfHouses;
    // const nrOfHotels =  (payload as CityField).nrOfHotels;
    // const owner =       (payload as CityField).owner;
    // const price =       (payload as CityField).price;
    // const type =        (payload as CityField).type;
    // const visit =       (payload as CityField).visit;
    const estateColor = getProperty(payload as CityField, 'color');
    const country =     getProperty(payload as CityField, 'country');
    const hotelPrice =  getProperty(payload as CityField, 'hotelPrice');
    const housePrice =  getProperty(payload as CityField, 'housePrice');
    const index =       getProperty(payload as CityField, 'index');
    const isPlegded =   getProperty(payload as CityField, 'isPlegded');
    const mortgage =    getProperty(payload as CityField, 'mortgage');
    const name =        getProperty(payload as CityField, 'name');
    const nrOfHouse =   getProperty(payload as CityField, 'nrOfHouses');
    const nrOfHotels =  getProperty(payload as CityField, 'nrOfHotels');
    const owner =       getProperty(payload as CityField, 'owner');
    const price =       getProperty(payload as CityField, 'price');
    const type =        getProperty(payload as CityField, 'type');
    const visit =       getProperty(payload as CityField, 'visit');
    const setIsPlegded = (newValue: boolean) => payload?.isPlegded
    const setNrOfHouses = (newValue: number) => {
        if (Object.values(payload || {}).includes('nrOfHouses')){
            (payload as CityField)!.nrOfHouses = newValue;
        }
    }
    const setNrOfHotels = (newValue: number) => {
        if (Object.values(payload || {}).includes('nrOfHotels')){
            (payload as CityField)!.nrOfHotels = newValue;
        }
    }
    const setOwner = (owner: tOwner) => {
        if (payload) payload.owner = owner
    }
    console.log('New name', name, owner, payload)
    return {
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

const newStateAction = (payload: tSelectedEstate) => {
    // const a = {type: ActionTypes.newState, payload};
    // return a
    return {type: ActionTypes.newState, payload}
};

const getEstatesEditorActions = (dispatch: (args: tActions) => void) => ({
    setNewState: (payload: tSelectedEstate) => {
        // console.log('In dispatch', payload, dispatch)
        dispatch(newStateAction(payload))
    }
})

const REDUCER = {
    [ActionTypes.newState]: newState,
}

export const useEstatesEditor = (editedEstate: tSelectedEstate) => {
    const reducer = getReducer<tSelectedEstate, string, tSelectedEstate>(REDUCER);
    const [{
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
    }, dispatch] = useReducer(reducer, initialEstatesEditorState);
    const {setNewState} = getEstatesEditorActions(dispatch);
    useEffect(() => {
        setNewState(editedEstate)
        // console.log('Edited estate changed', editedEstate)
    }, [editedEstate, dispatch] )
    useEffect(() => {
        console.error('FieldCreators need runAllSubscribtions implementation')
    }, [])
    const [etatesState, setEstatesState] = useState<iEstatesState>(initialState)
    // useEffect(() => {
    //     const newState: iEstatesState = editedEstate?.state || initialState;
    //     console.log('Are states equal', newState === etatesState)
    //     setEstatesState(newState);
    //     console.log('Edited estate changed', newState)

    // }, [editedEstate])
    useEffect(() => console.log('name', name), [name])
    const logState = () => {
        const state = editedEstate?.state;
        console.log(state)
    }

    // const owner = ((editedEstate as CityField) || {}).owner;

    useEffect(() => console.log('Owner', owner), [owner])
    if (!editedEstate) {
        return {
            ...initialState,
        }
    }
    // const setIsPlegded = (newValue: boolean) => editedEstate?.isPlegded
    // const setNrOfHouses = (newValue: number) => {
    //     if (Object.values(editedEstate || {}).includes('nrOfHouses')){
    //         (editedEstate as CityField)!.nrOfHouses = newValue;
    //     }
    // }
    // const setNrOfHotels = (newValue: number) => {
    //     if (Object.values(editedEstate || {}).includes('nrOfHotels')){
    //         (editedEstate as CityField)!.nrOfHotels = newValue;
    //     }
    // }
    // const setOwner = (owner: tOwner) => {
    //     if (editedEstate) editedEstate.owner = owner
    // }
    // const estateColor = (editedEstate as CityField).color;
    // const country = (editedEstate as CityField).country;
    // const hotelPrice = (editedEstate as CityField).hotelPrice;
    // const housePrice = (editedEstate as CityField).housePrice;
    // const index = (editedEstate as CityField).index;
    // const isPlegded = (editedEstate as CityField).isPlegded;
    // const mortgage = (editedEstate as CityField).mortgage;
    // const name = (editedEstate as CityField).name;
    // const nrOfHouse = (editedEstate as CityField).nrOfHouses;
    // const nrOfHotels = (editedEstate as CityField).nrOfHotels;
    
    // const price = (editedEstate as CityField).price;
    // const type = (editedEstate as CityField).type;
    // const visit = (editedEstate as CityField).visit;


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
        logState,
    }
}


