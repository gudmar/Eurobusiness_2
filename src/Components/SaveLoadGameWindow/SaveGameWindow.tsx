import { useEffect, useState } from "react";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { clearConsole } from "../../Functions/clearConsole";
import { getGames, getSavedGameNames } from "../../Functions/PersistRetrieveGameState/localStorageOperations";
import { getAllSavedGameNames, saveCurrentGameState } from "../../Functions/PersistRetrieveGameState/PersistGame";
import { loadGameStateFromLocalStorage } from "../../Functions/PersistRetrieveGameState/RetrieveGame";
import { Button, ButtonColorScheme } from "../Button/Button";
import { Checkbox } from "../Interactors/Checkbox/Checkbox";
import { TextInput } from "../Interactors/TextInput/TextInput";
import { useStyles } from "./styles";

const getDefaultName = () => {
    const date = new Date();
    const name = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getMilliseconds()}`
    return name;
}

const useSaveLoadGameLogic = (savedGamesGetter = getAllSavedGameNames) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSetDefault, setIsSetDefault] = useState(false);
    const [savedGameNames, setSavedGameNames] = useState<string[]>([])
    const [selectedGame, setSelectedGame] = useState<string>('');
    const refreshSavedGamesList = () => { setSavedGameNames(savedGamesGetter()) };
    useEffect(() => {refreshSavedGamesList()}, [])
    useEffect(() => {setName(selectedGame)}, [selectedGame, setName])

    return {
        name,
        setName: ((e: React.ChangeEvent<HTMLInputElement>) => setName(e?.target?.value)),
        toggleSetDefault: () => {
            setIsSetDefault(!isSetDefault)
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

export const SaveGameWindow = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {name, selectedGame, setSelectedGame, savedGamesList, setName, description, setDescription, isSetDefault, toggleSetDefault} = useSaveLoadGameLogic();
    
    return (
        <>
            <h1 className={classes.headline}>Save Game</h1>
            <button onClick={clearConsole}>Clear console</button>
            <ul className={classes.savedGames}>
                {
                    savedGamesList.map((game) => <li key={game} className={`${classes.savedGameEntry} ${selectedGame === game ? classes.chosenOne : ''}`} onClick={() => setSelectedGame(game)}>
                        {game}
                    </li>)
                }
                
            </ul>
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
