import { useEffect, useReducer } from "react";
import { getAllSavedGames } from "../../Functions/PersistRetrieveGameState/PersistGame";
import { getReducer } from "../../Functions/reducer";
import { SaveLoadGameTypes, tActions, tPayloadTypes, tSavedGame, tSaveLoadGameState } from "./types";
import { getDefaultName } from "./utils";

const setName = (state: tSaveLoadGameState, payload: string) => {
    const newState = {...state ,name: payload};
    return newState
}

const setDescription = (state: tSaveLoadGameState, payload: string) => {
    const newState = {...state, description: payload}
    return newState
}

const toggleIsDefault = (state: tSaveLoadGameState) => {
    const isDefault = state.isSetDefault;
    if (isDefault) {
        const newState = {...state, isDefault: false}
        return newState
    } 
    const newState = {...state, isDefault: true, name: getDefaultName()}
    return newState
}

const search = (state: tSaveLoadGameState, payload: string) => {
    const filtered = state.savedGames.filter(({name, description}) => name.toLocaleLowerCase().includes(payload.toLocaleLowerCase()) || description.includes(payload))
    const newState = {...state, searchFilter: payload, filteredGames: filtered}
    return newState
}

const setSavedGames = (state: tSaveLoadGameState, payload: string[]) => {
    const newState = {...state, savedGames: payload.sort()}
    return newState
}

const setFilteredGames = (state: tSaveLoadGameState, payload: string[]) => {
    const newState = {...state, filteredGames: payload.sort()}
    return newState
}

const logState = (state: tSaveLoadGameState) => {console.log(state); return state}

const setSelectedGame = (state: tSaveLoadGameState, payload: tSavedGame) => {
    const game = state.savedGames.find(({name}) => name === payload.name)
    const newState = {...state, selectedGame: game, name: game?.name, description: game?.description}
    return newState
}

const dropSelection = (state: tSaveLoadGameState) => {
    const newState = {...state, selectedGame: '', name: '', description: ''}
    return newState
}


const initialState = {
    name: '', description: '', isSetDefault: false, savedGames: [], selectedGame: '', searchFilter: '', filteredGames: []
}

const REDUCER = {
    [SaveLoadGameTypes.setName]: setName,
    [SaveLoadGameTypes.setDescription]: setDescription,
    [SaveLoadGameTypes.toggleIsDefault]: toggleIsDefault,
    [SaveLoadGameTypes.setSavedGames]: setSavedGames,
    [SaveLoadGameTypes.setSelectedGame]: setSelectedGame,
    [SaveLoadGameTypes.search]: search,
    [SaveLoadGameTypes.setFilteredGames]: setFilteredGames,
    [SaveLoadGameTypes.log]: logState,
    [SaveLoadGameTypes.dropSelection]: dropSelection,
}

const reducer = getReducer<tSaveLoadGameState, SaveLoadGameTypes, tPayloadTypes>(REDUCER);

const setNameAction = (payload: string): tActions => ({type: SaveLoadGameTypes.setName, payload});
const setDescriptionAction = (payload: string): tActions => ({type: SaveLoadGameTypes.setDescription, payload});
const toggleIsDefaultAction = (): tActions => ({type: SaveLoadGameTypes.toggleIsDefault });
const setSavedGamesAction = (payload: tSavedGame[]): tActions => ({type: SaveLoadGameTypes.setSavedGames, payload});
const setSelectedGameAction = (payload: tSavedGame): tActions => ({type: SaveLoadGameTypes.setSelectedGame, payload});
const setFilteredGameAction = (payload: tSavedGame[]): tActions => ({type: SaveLoadGameTypes.setFilteredGames, payload});
const logAction = (): tActions => ({type: SaveLoadGameTypes.log});
const dropSelectionAction = (): tActions => ({type: SaveLoadGameTypes.dropSelection});
const searchAction = (payload: string): tActions => ({type: SaveLoadGameTypes.search, payload})


const getSaveLoadGamesActions = (dispatch: (args: tActions) => void) => ({
    setName: (payload: string) => dispatch(setNameAction(payload)),
    setDescription: (payload: string) => dispatch(setDescriptionAction(payload)),
    toggleIsDefault: () => dispatch(toggleIsDefaultAction()),
    setSavedGames: (payload: tSavedGame[]):void => dispatch(setSavedGamesAction(payload)),
    setSelectedGame: (payload: tSavedGame):void => dispatch(setSelectedGameAction(payload)),
    setFilteredGames: (payload: tSavedGame[]): void => dispatch(setFilteredGameAction(payload)),
    log: () => dispatch(logAction()),
    dropSelection: () => dispatch(dropSelectionAction()),
    search: (payload: string) => dispatch(searchAction(payload))
})

export const useSaveLoadGameLogic = (savedGamesGetter = getAllSavedGames) => {
    const [
        {name, description, isSetDefault, savedGames, filteredGames, selectedGame, searchFilter}, dispatch
    ] = useReducer( reducer, initialState );
    const {
        setName, setDescription,
        toggleIsDefault, setSavedGames,
        setSelectedGame, setFilteredGames, log, dropSelection, search
    } = getSaveLoadGamesActions(dispatch);

    const setGamesFromLocalStorage = () => {
        const allGames = savedGamesGetter();
        setSavedGames(savedGamesGetter());
        setFilteredGames(allGames);
    }
    useEffect(() => {
        setGamesFromLocalStorage();
    }, [])
    useEffect(() => console.log(dropSelection), [dropSelection])

    return {
        name,
        setName: ((e: React.ChangeEvent<HTMLInputElement>) => setName(e?.target?.value)),
        toggleIsDefault,
        savedGames,
        isSetDefault,
        description,
        selectedGame,
        setSelectedGame,
        searchFilter,
        filteredGames,
        logState: log,
        search: ((e: React.ChangeEvent<HTMLInputElement>) => search(e?.target?.value)),
        setDescription:  ((e: React.ChangeEvent<HTMLInputElement>) => setDescription(e?.target?.value)),
        setDescriptionAsString: (val: string) => setDescription(val),
        setNameAsString: setName,
        reloadGames: setGamesFromLocalStorage,
        dropSelection,
    }
}
