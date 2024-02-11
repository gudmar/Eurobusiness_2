import { useEffect, useReducer, useState } from "react";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { clearConsole } from "../../Functions/clearConsole";
import { getAllSavedGameNames, saveCurrentGameState } from "../../Functions/PersistRetrieveGameState/PersistGame";
import { loadGameStateFromLocalStorage } from "../../Functions/PersistRetrieveGameState/RetrieveGame";
import { getReducer } from "../../Functions/reducer";
import { Button } from "../Button/Button";
import { Checkbox } from "../Interactors/Checkbox/Checkbox";
import { TextInput } from "../Interactors/TextInput/TextInput";
import { useStyles } from "./styles";

type tSavedGame = {
    name: string,
    description: string,
}

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
    search = 'search',
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
    const newState = {...state, savedGameNames: payload.sort()}
    return newState
}

const setSelectedGame = (state: tSaveLoadGameState, payload: string) => {
    const game = state. savedGames.find(({name}) => name === payload)
    const newState = {...state, selectedGame: game}
    return newState
}


const initialState = {
    name: '', description: '', isSetDefault: false, savedGameNames: [], selectedGame: '', searchFilter: '', filteredGameNames: []
}

const REDUCER = {
    [SaveLoadGameTypes.setName]: setName,
    [SaveLoadGameTypes.setDescription]: setDescription,
    [SaveLoadGameTypes.toggleIsDefault]: toggleIsDefault,
    [SaveLoadGameTypes.setSavedGames]: setSavedGames,
    [SaveLoadGameTypes.setSavedGames]: setSelectedGame,
    [SaveLoadGameTypes.search]: search,
}

type tAction = {
    type: SaveLoadGameTypes, payload?: tPayloadTypes
}

const reducer = getReducer<tSaveLoadGameState, SaveLoadGameTypes, tPayloadTypes>(REDUCER);

const setNameAction = (payload: string) => ({type: SaveLoadGameTypes.setName, payload});
const setDescriptionAction = (payload: string) => ({type: SaveLoadGameTypes.setDescription, payload});
const toggleIsDefaultAction = () => ({type: SaveLoadGameTypes.toggleIsDefault });
const setSavedGamesAction = (payload: tSavedGame[]) => ({type: SaveLoadGameTypes.setSavedGames, payload});
const setSelectedGameAction = (payload: tSavedGame) => ({type: SaveLoadGameTypes.setSelectedGame, payload});


const getSaveLoadGamesActions = (dispatch: (args?: tAction) => void) => ({
    setName: (payload: string) => dispatch(setNameAction(payload)),
    setDescription: (payload: string) => dispatch(setDescriptionAction(payload)),
    toggleIsDefault: () => dispatch(toggleIsDefaultAction()),
    setSavedGames: (payload: tSavedGame[]) => dispatch(setSavedGamesAction(payload)),
    setSelectedGame: (payload: tSavedGame) => dispatch(setSelectedGameAction(payload)),
})

const useSaveLoadGameLogic = (savedGamesGetter = getAllSavedGameNames) => {
    const [
        {name, description, isSetDefault, savedGames, selectedGame}, dispatch
    ] = useReducer( reducer, initialState );
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [isSetDefault, setIsSetDefault] = useState(false);
    // const [savedGameNames, setSavedGameNames] = useState<string[]>([])
    // const [selectedGame, setSelectedGame] = useState<string>('');
    const refreshSavedGamesList = () => { setSavedGameNames(savedGamesGetter()) };
    // useEffect(() => {refreshSavedGamesList()}, [])
    // useEffect(() => {setName(selectedGame)}, [selectedGame, setName])

    return {
        name,
        setName: ((e: React.ChangeEvent<HTMLInputElement>) => setName(e?.target?.value)),
        toggleSetDefault: () => {
            setIsSetDefault(!isSetDefault)
            setSelectedGame('')
            setName(!isSetDefault ? getDefaultName() : '')
            
        },
        savedGameNames,
        isSetDefault,
        description,
        selectedGame,
        setSelectedGame,
        savedGamesList: savedGameNames,
        setDescription:  ((e: React.ChangeEvent<HTMLInputElement>) => setDescription(e?.target?.value)),
    }
}

export const SaveLoadGameWindow = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {name, selectedGame, setSelectedGame, savedGamesList, setName, description, setDescription, isSetDefault, toggleSetDefault} = useSaveLoadGameLogic();
    
    return (
        <>
            <h1 className={classes.headline}>Save Game</h1>
            <button onClick={clearConsole}>Clear console</button>
            <section className={classes.content}>
                <ul className={classes.savedGames}>
                    {
                        savedGamesList.map((game) => <li key={game} className={`${classes.savedGameEntry} ${selectedGame === game ? classes.chosenOne : ''}`} onClick={() => setSelectedGame(game)}>
                            {game}
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
                <Checkbox
                    label={'Set default name:'}
                    checked={isSetDefault}
                    onChange={toggleSetDefault}
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
        </>
        
    )
}
