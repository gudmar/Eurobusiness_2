import { useThemesAPI } from "../../Contexts/ThemeContext";
import { clearConsole } from "../../Functions/clearConsole";
import { deleteGame } from "../../Functions/PersistRetrieveGameState/localStorageOperations";
import { saveCurrentGameState } from "../../Functions/PersistRetrieveGameState/PersistGame";
import { loadGameStateFromLocalStorage } from "../../Functions/PersistRetrieveGameState/RetrieveGame";
import { Button } from "../Button/Button";
import { TextAreaInput } from "../Interactors/TextArea/TextArea";
import { TextInput } from "../Interactors/TextInput/TextInput";
import { useStyles } from "./styles";
import { tSavedGame } from "./types";
import { useSaveLoadGameLogic } from "./useSaveGameLogic";
import { getDefaultName } from "./utils";



export const SaveLoadGameWindow = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {name, setDescriptionAsString, setDescription, setName, setNameAsString, description, isSetDefault, savedGames, selectedGame, searchFilter, filteredGames, setSelectedGame, logState} = useSaveLoadGameLogic();
    
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
                {/* <fieldset id={'Description'} className={classes.description}>
                    <legend>Description</legend> */}
                    {/* <article className={classes.descriptionText}>
                        {description}
                    </article> */}
                    <div className={classes.description}>
                        <TextAreaInput
                            value={description}
                            setValue={setDescriptionAsString}
                            isEnabled={name !==''}
                            label={description}
                        />
                    </div>
                {/* </fieldset> */}
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
