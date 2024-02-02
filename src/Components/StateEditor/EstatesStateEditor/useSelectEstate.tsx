import { useReducer, useState } from "react";
import { CITY, PLANT, RAILWAY } from "../../../Data/const";
import { tColors, tEstateTypes, tOwner } from "../../../Data/types";
import { getReducer } from "../../../Functions/reducer";
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
    estateTypesFilter: [CITY, PLANT, RAILWAY],
}

enum SelectEstateActions {
    searchByName = 'searchByName',
    filterOwners = 'fliter by owners',
    filterTypes = 'filter by estate types'
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

const REDUCER = {
    [SelectEstateActions.searchByName]: applySearchByName,
    [SelectEstateActions.filterOwners]: applySearchByOwner,
    [SelectEstateActions.filterTypes]: applySearchByType,
}

const reducer = getReducer(REDUCER);

export const useSelectEstate = () => {
    const estateTypes = [
        {type: CITY},
        {type: PLANT},
        {type: RAILWAY},
    ]
    const boardEndpoint = getBoard();
    
    const estates = boardEndpoint.estates.filter(({type}) => [CITY, PLANT, RAILWAY].includes(type)) as tEstateField[];
    const playersColors = usePlayersColors();
    const [state, dispatch] = useReducer( reducer, { ...initialState, estates });
    const {
        filteredEstates,
        searchPattern,
        ownersFilter,
        estateTypesFilter,
    } = state;

    const [selectedEstate, setSelectedEstate] = useState<tSelectedEstate>(null);
    const selectEstate = (estate: tSelectedEstate) => estate?.name ? setSelectedEstate(estate) : null;
    const setSearchPattern = (pattern:string) => {};
    const togglePlayerColorForFilter = (color: tColors) => {}
    const toggleEstatesTypeForFilter = (estateType: tEstateTypes) => {}
    return {
        estateTypes,
        selectEstate,
        selectedEstate,
        selectedEstateName: selectEstate?.name || '',
        filteredEstates: estates,
        playersColors,
        setSearchPattern,
        toggleEstatesTypeForFilter,
        togglePlayerColorForFilter,
    }
}
