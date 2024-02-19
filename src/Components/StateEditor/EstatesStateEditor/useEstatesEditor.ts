import { useEffect, useReducer } from "react"
import { CITY, UK, YELLOW } from "../../../Data/const"
import { tCountries, tEstateTypes, tFlattenedFieldTypes, tOwner, tVisitPayment } from "../../../Data/types"
import { getReducer } from "../../../Functions/reducer"
import { tEstateField } from "../../../Logic/boardTypes"
import { CityField } from "../../../Logic/FieldCreators"
import { tSubscription } from "../../../Types/types"
import { tSelectedEstate } from "./types"

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

type tActions = {
    type: ActionTypes.newState,
    payload: tSelectedEstate,
}

type tPropName = 'color' | 'country' |'hotelPrice'|'housePrice'|'index'|'isPlegded'|'mortgage'|'name'|'nrOfHouses'|'nrOfHotels'|'owner'|
    'price'|'type'|'visit'

const getProperty = (payload: CityField, propName: tPropName) => {
    const initialValue = initialState[`${propName}`];
    if (!payload) return initialValue ?? null;
    return payload?.[`${propName}`]
}

const newState = (oldState: tSelectedEstate, payload: tSelectedEstate) => {
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
    const setIsPlegded = (newValue: boolean) => {
        if (payload) payload.isPlegded = newValue;
    }
    const setNrOfHouses = (newValue: number) => {
        
        if ((payload || {}).type === CITY){
            console.log('Setting nr of housese', newValue, payload);
            (payload as CityField)!.nrOfHouses = newValue;
        }
    }
    const setNrOfHotels = (newValue: number) => {
        if ((payload || {}).type === CITY){
            (payload as CityField)!.nrOfHotels = newValue;
        }
    }
    const setOwner = (owner: tOwner) => {
        if (payload) payload.owner = owner
    }
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
    return {type: ActionTypes.newState, payload}
};

const getEstatesEditorActions = (dispatch: (args: tActions) => void) => ({
    setNewState: (payload: tSelectedEstate) => {
        dispatch(newStateAction(payload))
    }
})

const REDUCER = {
    [ActionTypes.newState]: newState,
}

type tGetSubscribtionType = {
    callback: tSubscription,
    estateInstance: tSelectedEstate,
}

const getSubscribtion = ({callback, estateInstance}: tGetSubscribtionType) => {
    const name = estateInstance?.name;
    const messageType = name as tFlattenedFieldTypes
    const id = `edited-estate-${name}`;
    const decoratedCb = (args: unknown) => { callback(args) }
    const subscribtion = {callback: decoratedCb, id, messageType};
    const subscribe = () => ((estateInstance as tEstateField)?.subscribe(subscribtion));
    const unsubscribe = () => ((estateInstance as tEstateField)?.unsubscribe(messageType, id));
    return {subscribe, unsubscribe};
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
        const {subscribe, unsubscribe} = getSubscribtion({
            callback: () => setNewState(editedEstate),
            estateInstance: editedEstate,
        })
        subscribe();
        return unsubscribe;
    }, [editedEstate, setNewState])
    useEffect(() => {
        setNewState(editedEstate)
    }, [editedEstate, dispatch] )

    const logState = () => {
        const state = editedEstate?.state;
        console.log(state)
    }

    if (!editedEstate) {
        return {
            ...initialState,
        }
    }

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


