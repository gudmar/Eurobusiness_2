import { useEffect, useReducer, useState } from "react";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { clearConsole } from "../../Functions/clearConsole";
import { deleteGame } from "../../Functions/PersistRetrieveGameState/localStorageOperations";
import { getAllSavedGameNames, getAllSavedGames, saveCurrentGameState } from "../../Functions/PersistRetrieveGameState/PersistGame";
import { loadGameStateFromLocalStorage } from "../../Functions/PersistRetrieveGameState/RetrieveGame";
import { tSavedGameDescriptor } from "../../Functions/PersistRetrieveGameState/types";
import { getReducer } from "../../Functions/reducer";
import { Button } from "../Button/Button";
import { Checkbox } from "../Interactors/Checkbox/Checkbox";
import { TextInput } from "../Interactors/TextInput/TextInput";
import { useStyles } from "./styles";

type tSavedGame = tSavedGameDescriptor

const getDefaultName = () => {
    const date = new Date();
    const name = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getMilliseconds()}`
    return name;
}

type tSaveLoadGameState = {
    name: string, description: string, isSetDefault: boolean, savedGames: tSavedGame[], selectedGame: tSavedGame, searchFilter: string, filteredGames: string[]
}

type tPayloadTypes = string | boolean | tSavedGame | string[] | tSavedGame[]

enum SaveLoadGameTypes {
    setName = 'setName',
    setDescription = 'setDescription',
    toggleIsDefault = 'toggleIsDefault',
    setSavedGames = 'setSavedGames',
    setSelectedGame = 'setSelectedGame',
    setFilteredGames = 'setFilteredGames',
    search = 'search',
    log = 'log'
}

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
    const filtered = state.savedGames.filter(({name, description}) => name.includes(payload) || description.includes(payload))
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
    const game = state. savedGames.find(({name}) => name === payload.name)
    const newState = {...state, selectedGame: game, name: game?.name, description: game?.description}
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
}

type tActions = {
        type: SaveLoadGameTypes.search, payload: string 
    } | {
        type: SaveLoadGameTypes.setName, payload: string
    } | {
        type: SaveLoadGameTypes.setDescription, payload: string
    } | {
        type: SaveLoadGameTypes.toggleIsDefault
    } | {
        type: SaveLoadGameTypes.setSavedGames, payload: tSavedGame[]
    } | {
        type: SaveLoadGameTypes.setSelectedGame, payload: tSavedGame
    } | {
        type: SaveLoadGameTypes.setFilteredGames, payload: tSavedGame[]
    } | {
        type: SaveLoadGameTypes.log
    }

const reducer = getReducer<tSaveLoadGameState, SaveLoadGameTypes, tPayloadTypes>(REDUCER);

const setNameAction = (payload: string): tActions => ({type: SaveLoadGameTypes.setName, payload});
const setDescriptionAction = (payload: string): tActions => ({type: SaveLoadGameTypes.setDescription, payload});
const toggleIsDefaultAction = (): tActions => ({type: SaveLoadGameTypes.toggleIsDefault });
const setSavedGamesAction = (payload: tSavedGame[]): tActions => ({type: SaveLoadGameTypes.setSavedGames, payload});
const setSelectedGameAction = (payload: tSavedGame): tActions => ({type: SaveLoadGameTypes.setSelectedGame, payload});
const setFilteredGameAction = (payload: tSavedGame[]): tActions => ({type: SaveLoadGameTypes.setFilteredGames, payload});
const logAction = (): tActions => ({type: SaveLoadGameTypes.log})


const getSaveLoadGamesActions = (dispatch: (args: tActions) => void) => ({
    setName: (payload: string) => dispatch(setNameAction(payload)),
    setDescription: (payload: string) => dispatch(setDescriptionAction(payload)),
    toggleIsDefault: () => dispatch(toggleIsDefaultAction()),
    setSavedGames: (payload: tSavedGame[]):void => dispatch(setSavedGamesAction(payload)),
    setSelectedGame: (payload: tSavedGame):void => dispatch(setSelectedGameAction(payload)),
    setFilteredGames: (payload: tSavedGame[]): void => dispatch(setFilteredGameAction(payload)),
    log: () => dispatch(logAction())
})

const useSaveLoadGameLogic = (savedGamesGetter = getAllSavedGames) => {
    const [
        {name, description, isSetDefault, savedGames, filteredGames, selectedGame, searchFilter}, dispatch
    ] = useReducer( reducer, initialState );
    const {
        setName, setDescription,
        toggleIsDefault, setSavedGames,
        setSelectedGame, setFilteredGames, log
    } = getSaveLoadGamesActions(dispatch);
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [isSetDefault, setIsSetDefault] = useState(false);
    // const [savedGameNames, setSavedGameNames] = useState<string[]>([])
    // const [selectedGame, setSelectedGame] = useState<string>('');
    // const refreshSavedGamesList = () => { setSavedGames(savedGamesGetter()) };
    useEffect(() => {
        const allGames = savedGamesGetter();
        // refreshSavedGamesList()},
        setSavedGames(savedGamesGetter())
        setFilteredGames(allGames)}, 
    [])
    // useEffect(() => {setName(selectedGame)}, [selectedGame, setName])

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
        setDescription:  ((e: React.ChangeEvent<HTMLInputElement>) => setDescription(e?.target?.value)),
        setNameAsString: setName,
    }
}

export const SaveLoadGameWindow = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {name, setDescription, setName, setNameAsString, description, isSetDefault, savedGames, selectedGame, searchFilter, filteredGames, setSelectedGame, logState} = useSaveLoadGameLogic();
    
    return (
        <>
            <h1 className={classes.headline}>Save Game</h1>
            <button onClick ={logState}>Log state</button>
            <button onClick={clearConsole}>Clear console</button>
            <section className={classes.content}>
                <ul className={classes.savedGames}>
                    {
                        filteredGames.map(({name, description}: tSavedGame) => <li key={name} className={`${classes.savedGameEntry} ${selectedGame.name === name ? classes.chosenOne : ''}`} onClick={() => setSelectedGame({ name, description })}>
                            {name}
                        </li>)
                    }
                    
                </ul>
                <fieldset id={'Description'} className={classes.description}>
                    <legend>Description</legend>
                    <article className={classes.descriptionText}>
                        {description}
                    </article>
                </fieldset>
            </section>
            <div className={classes.row}>
                <TextInput
                    value={name}
                    label={'Name:'}
                    onChange={setName}
                    minLength={1}
                    enableConditionFunction={ () => !isSetDefault}
                    disabledTooltip={"Cannot set name if name is default"}
                />
                <TextInput
                    value={description}
                    label={'Description:'}
                    onChange={setDescription}
                />
                <Button
                    label={'Propose default name'}
                    action={() => setNameAsString(getDefaultName())}
                />
            </div>
            <Button
                label={'Save'}
                action={() => {
                    saveCurrentGameState({name, description})
                }}
                disabled={name === ''}
                disabledTooltip={'Name cannot be empty'}
            />
            <Button
                label={'Load'}
                action={() => {
                    loadGameStateFromLocalStorage(name)
                }}
                disabled={name === ''}
                disabledTooltip={'Name cannot be empty, and must exist'}
            />
            <Button
                label={'Delete'}
                action = {() => deleteGame(name)}
                disabled={!savedGames.map(({name}: tSavedGame)=>name).some((savedName: string) => savedName === name)}
            />
        </>
        
    )
}
