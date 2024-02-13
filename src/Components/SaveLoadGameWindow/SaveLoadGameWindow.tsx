import { useThemesAPI } from "../../Contexts/ThemeContext";
import { clearConsole } from "../../Functions/clearConsole";
import { deleteGame, renameGame } from "../../Functions/PersistRetrieveGameState/localStorageOperations";
import { saveCurrentGameState } from "../../Functions/PersistRetrieveGameState/PersistGame";
import { loadGameStateFromLocalStorage } from "../../Functions/PersistRetrieveGameState/RetrieveGame";
import { Button } from "../Button/Button";
import { TextAreaInput } from "../Interactors/TextArea/TextArea";
import { TextInput } from "../Interactors/TextInput/TextInput";
import { useStyles } from "./styles";
import { tSavedGame } from "./types";
import { useSaveLoadGameLogic } from "./useSaveGameLogic";
import { getDefaultName } from "./utils";

const doesGameAlreadyExist = (savedGames: tSavedGame[], gameName: string) => savedGames.some(({ name }) => name === gameName)

export const SaveLoadGameWindow = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {
        name, setDescriptionAsString, dropSelection, setDescription,
        setName, setNameAsString, description, isSetDefault,
        savedGames, selectedGame, searchFilter,
        filteredGames, setSelectedGame, logState, reloadGames, search
    } = useSaveLoadGameLogic();
    
    return (
        <>
            <h1 className={classes.headline}>Persist Game Operations</h1>
            {/* <button onClick ={logState}>Log state</button>
            <button onClick={clearConsole}>Clear console</button> */}
            <section className={classes.content}>
                <fieldset className={classes.savedGames}>
                    <legend>Saved games</legend>
                    <ul className={classes.savedGamesList}>
                        {
                            filteredGames.map(({name, description}: tSavedGame) => <li key={name} className={`${classes.savedGameEntry} ${selectedGame.name === name ? classes.chosenOne : ''}`} onClick={() => setSelectedGame({ name, description })}>
                                {name}
                            </li>)
                        }
                        
                    </ul>
                </fieldset>
                <div className={classes.description}>
                    <TextAreaInput
                        value={description}
                        setValue={setDescriptionAsString}
                        isEnabled={name !==''}
                        label={description}
                    />
                </div>
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
                    value={searchFilter}
                    label={'Search names:'}
                    onChange={search}
                />
                <Button
                    label={'Propose default name'}
                    action={
                        () => setNameAsString(getDefaultName())
                    }
                />
                <Button
                    label={'Drop selection'}
                    action={ dropSelection }
                    disabled={!selectedGame}
                    disabledTooltip={'Game has to be selected'}
                />

            </div>
            <nav className={classes.buttonGroup}>
                <Button
                    label={'Save'}
                    action={() => {
                        saveCurrentGameState({name, description});
                        reloadGames();
                    }}
                    disabled={name === '' || doesGameAlreadyExist(savedGames, name)}
                    disabledTooltip={'Name cannot be empty, cannot save existing game'}
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
                    label={'Rename'}
                    action = {
                        () => {
                            renameGame({originalName: selectedGame.name, newName: name, newDescription: description});
                            reloadGames();
                        }
                    }
                    disabled={
                        !selectedGame || (selectedGame.name === name && selectedGame.description === description)
                    }
                    disabledTooltip={'Game has to be selected, and description or name has to be changed'}
                />
                <Button
                    label={'Delete'}
                    action = {
                        () => {
                            deleteGame(name);
                            reloadGames();
                        }
                    }
                    disabled={!savedGames.map(({name}: tSavedGame)=>name).some((savedName: string) => savedName === name)}
                />
            </nav>
        </>
        
    )
}
