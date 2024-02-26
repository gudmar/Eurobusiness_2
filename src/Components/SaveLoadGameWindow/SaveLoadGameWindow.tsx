import { useLanguage } from "../../Contexts/CurrentLanguage/CurrentLanguage";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { deleteGame, renameGame } from "../../Functions/PersistRetrieveGameState/localStorageOperations";
import { saveCurrentGameState } from "../../Functions/PersistRetrieveGameState/PersistGame";
import { loadGameStateFromLocalStorage } from "../../Functions/PersistRetrieveGameState/RetrieveGame";
import { Button } from "../Button/Button";
import { TextAreaInput } from "../Interactors/TextArea/TextArea";
import { TextInput } from "../Interactors/TextInput/TextInput";
import { TEXT } from "./languages";
import { useStyles } from "./styles";
import { tSavedGame } from "./types";
import { useSaveLoadGameLogic } from "./useSaveGameLogic";
import { getDefaultName } from "./utils";

const doesGameAlreadyExist = (savedGames: tSavedGame[], gameName: string) => savedGames.some(({ name }) => name === gameName)


export const SaveLoadGameWindow = () => {
    const { languageKey } = useLanguage();
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {
        name, setDescriptionAsString, dropSelection, setDescription,
        setName, setNameAsString, description, isSetDefault,
        savedGames, selectedGame, searchFilter,
        filteredGames, setSelectedGame, logState, reloadGames, search
    } = useSaveLoadGameLogic();
    
    return (
        <>
            <h1 className={classes.headline}>{TEXT.title[languageKey]}</h1>
            {/* <button onClick ={logState}>Log state</button>
            <button onClick={clearConsole}>Clear console</button> */}
            <section className={classes.content}>
                <fieldset className={classes.savedGames}>
                    <legend>{TEXT.savedGamesListLabel[languageKey]}</legend>
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
                    label={`${TEXT.name[languageKey]}:`}
                    onChange={setName}
                    minLength={1}
                    enableConditionFunction={ () => !isSetDefault}
                    disabledTooltip={TEXT.disabledNameTooltip[languageKey]}
                />
                <TextInput
                    value={searchFilter}
                    label={TEXT.search[languageKey]}
                    onChange={search}
                />
                <Button
                    label={TEXT.proposeDefaultName[languageKey]}
                    action={
                        () => setNameAsString(getDefaultName())
                    }
                />
                <Button
                    label={TEXT.dropSelection[languageKey]}
                    action={ dropSelection }
                    disabled={!selectedGame}
                    disabledTooltip={TEXT.dropSelectionTooltip[languageKey]}
                />

            </div>
            <nav className={classes.buttonGroup}>
                <Button
                    label={TEXT.save[languageKey]}
                    action={() => {
                        saveCurrentGameState({name, description});
                        reloadGames();
                    }}
                    disabled={name === '' || doesGameAlreadyExist(savedGames, name)}
                    disabledTooltip={TEXT.saveTooltip[languageKey]}
                />
                <Button
                    label={TEXT.load[languageKey]}
                    action={() => {
                        loadGameStateFromLocalStorage(name)
                    }}
                    disabled={name === ''}
                    disabledTooltip={TEXT.loadTooltip[languageKey]}
                />
                <Button
                    label={TEXT.rename[languageKey]}
                    action = {
                        () => {
                            renameGame({originalName: selectedGame.name, newName: name, newDescription: description});
                            reloadGames();
                        }
                    }
                    disabled={
                        !selectedGame || (selectedGame.name === name && selectedGame.description === description)
                    }
                    disabledTooltip={TEXT.rename[languageKey]}
                />
                <Button
                    label={TEXT.delete[languageKey]}
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
