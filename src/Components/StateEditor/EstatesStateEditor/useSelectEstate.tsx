import { useEffect, useReducer, useState } from "react";
import { CITY, PLANT, RAILWAY } from "../../../Data/const";
import { tColors, tEstateTypes, tFieldTypes, tOwner } from "../../../Data/types";
import { getReducer } from "../../../Functions/reducer";
import { toggleArrayItem } from "../../../Functions/toggleArrayItem";
import { useEstateOwners } from "../../../hooks/useEstateOwners";
import { usePlayersColors } from "../../../hooks/usePlayersColors";
import { getBoard } from "../../../Logic/BoardCaretaker";
import { tEstateField } from "../../../Logic/boardTypes";
import { tSelectedEstate } from "./types";



type tUseSelectEstateState = {
    estates: tEstateField[],
    filteredEstates: tEstateField[],
    searchPattern: string,
    ownersFilter: tOwner[],
    estateTypesFilter: tEstateTypes[]
}

const initialState: tUseSelectEstateState = {
    estates: [],
    filteredEstates: [],
    searchPattern: '',
    ownersFilter: [],
    estateTypesFilter: []
    // estateTypesFilter: [CITY, PLANT, RAILWAY],
}

enum SelectEstateActions {
    searchByName = 'searchByName',
    filterOwners = 'fliter by owners',
    filterTypes = 'filter by estate types',
    toggleType = 'toggle type',
    toggleOwner = 'toggle owner'
}

const getSearchByName = (filter: string) => (estates: tEstateField[]): tEstateField[] => {
    const result = estates.filter(({name}) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
    return result;
}

const getFilterByOwner = (ownersListFilter: tOwner[]) => (estates: tEstateField[]) => {
    const result = estates.filter(({owner}) => ownersListFilter.includes(owner));
    return result;
}

const getFilterByType =  (typesListFilter: tEstateTypes[]) => (estates: tEstateField[]) => {
    const result = estates.filter(({type}) => typesListFilter.includes(type));
    return result;
}

type tFilteringFunction = (setates: tEstateField[]) => tEstateField[]

const applyFiltersInOrder = (filters: tFilteringFunction[], estates: tEstateField[]) => {
    const result = filters.reduce((acc: tEstateField[], filteringFunction: tFilteringFunction) => {
        const nextEstates = filteringFunction(acc);
        return nextEstates;
    }, estates)
    return result;
}

const applySearchByName = (state: tUseSelectEstateState, payload: string ): tUseSelectEstateState => {
    const {estates, searchPattern, ownersFilter, estateTypesFilter} = state;
    const filterByOwner = getFilterByOwner(ownersFilter);
    const filterByType = getFilterByType(estateTypesFilter);
    const filterByName = getSearchByName(payload);
    const filters = [filterByName, filterByOwner, filterByType];
    const filteredEstates = applyFiltersInOrder(filters, estates);
    return {...state, filteredEstates, searchPattern: payload}
}

const applySearchByType = (state: tUseSelectEstateState, payload: tEstateTypes[] ): tUseSelectEstateState => {
    const {estates, searchPattern, ownersFilter, estateTypesFilter} = state;
    const filterByOwner = getFilterByOwner(ownersFilter);
    const filterByType = getFilterByType(payload);
    const filterByName = getSearchByName(searchPattern);
    const filters = [filterByName, filterByOwner, filterByType];
    const filteredEstates = applyFiltersInOrder(filters, estates);
    return {...state, filteredEstates, estateTypesFilter: payload}
}

const applySearchByOwner = (state: tUseSelectEstateState, payload: tOwner[] ): tUseSelectEstateState => {
    const {estates, searchPattern, ownersFilter, estateTypesFilter} = state;
    const filterByOwner = getFilterByOwner(payload);
    const filterByType = getFilterByType(estateTypesFilter);
    const filterByName = getSearchByName(searchPattern);
    const filters = [filterByName, filterByOwner, filterByType];
    const filteredEstates = applyFiltersInOrder(filters, estates);
    return {...state, filteredEstates, ownersFilter: payload}
}

const applySearchAfterOwnerToggle = (state: tUseSelectEstateState, payload: tOwner): tUseSelectEstateState => {
    const owners = state.ownersFilter;
    const newOwners = toggleArrayItem(owners, payload) as tOwner[];
    const newState = applySearchByOwner(state, newOwners)
    return newState;
}

const applySearchAfterTypeToggle = (state: tUseSelectEstateState, payload: tEstateTypes): tUseSelectEstateState => {
    const types = state.estateTypesFilter;
    const newTypes = toggleArrayItem(types, payload) as tEstateTypes[];
    const newState = applySearchByType(state, newTypes)
    return newState;
}

const ACTIONS = {
    [SelectEstateActions.searchByName]: (payload: string) => ({type: SelectEstateActions.searchByName, payload}),
    [SelectEstateActions.filterOwners]: (payload: tOwner[]) => ({type: SelectEstateActions.filterOwners, payload}),
    [SelectEstateActions.filterTypes] : (payload: tEstateTypes[]) => ({type: SelectEstateActions.filterTypes, payload}),
    [SelectEstateActions.toggleOwner] : (payload: tOwner) => ({type: SelectEstateActions.toggleOwner, payload}),
    [SelectEstateActions.toggleType]  : (payload: tEstateTypes) => ({type: SelectEstateActions.toggleType, payload}),
}

const REDUCER = {
    [SelectEstateActions.searchByName]: applySearchByName,
    [SelectEstateActions.filterOwners]: applySearchByOwner,
    [SelectEstateActions.filterTypes]: applySearchByType,
    [SelectEstateActions.toggleOwner]: applySearchAfterOwnerToggle,
    [SelectEstateActions.toggleType]: applySearchAfterTypeToggle,
}
type tPayload = string | tOwner[] | tEstateTypes[]
type tActionType = {type: SelectEstateActions, payload: tPayload}

const getThingsDone = (dispatch: ({type, payload}: tActionType) => void) => {
    const setSearchPattern = (pattern: string) => {
        const action = ACTIONS[SelectEstateActions.searchByName](pattern);
        dispatch(action);
    }
    const setEstatesTypeForFilter = (typesFilter: tEstateTypes[]) => {
        const action = ACTIONS[SelectEstateActions.filterTypes](typesFilter);
        dispatch(action)
    }
    const toggleEstateType = (estateType: tEstateTypes) => {
        const action = ACTIONS[SelectEstateActions.toggleType](estateType);
        dispatch(action)
    }

    const setOwnersForFilter = (ownersFilter: tOwner[]) => {
        const action = ACTIONS[SelectEstateActions.filterOwners](ownersFilter);
        dispatch(action)
    }
    const toggleOwner = (owner: tOwner) => {
        const action = ACTIONS[SelectEstateActions.toggleOwner](owner);
        dispatch(action)
    }

    return {
        setSearchPattern, toggleEstateType, toggleOwner, setOwnersForFilter,setEstatesTypeForFilter
    }
}

const reducer = getReducer(REDUCER);

export const useSelectEstate = () => {
    const estateTypes: tEstateTypes[] = [ CITY, PLANT, RAILWAY ]
    const boardEndpoint = getBoard();
    
    const estates = boardEndpoint.estates.filter(({type}) => [CITY, PLANT, RAILWAY].includes(type)) as tEstateField[];
    const estateOwners = useEstateOwners();
    const [state, dispatch] = useReducer( reducer, { ...initialState, estates, ownersFilter:  estateOwners, estateTypesFilter: estateTypes});
    const { setSearchPattern, toggleEstateType, toggleOwner, setOwnersForFilter,setEstatesTypeForFilter } = getThingsDone(dispatch);
    useEffect(() => {
        setSearchPattern('')
    }, [])
    const {
        filteredEstates,
        searchPattern,
        ownersFilter,
        estateTypesFilter,
    } = state;

    const [selectedEstate, setSelectedEstate] = useState<tSelectedEstate>(null);
    const selectEstate = (estate: tSelectedEstate) => estate?.name ? setSelectedEstate(estate) : null;
    
    return {
        estateTypes,
        selectEstate,
        selectedEstate,
        selectedEstateName: selectEstate?.name || '',
        filteredEstates,
        searchPattern,
        ownersFilter,
        estateTypesFilter,
        // playersColors,
        estateOwners,
        setSearchPattern,
        toggleEstateType,
        toggleOwner,
    }
}
