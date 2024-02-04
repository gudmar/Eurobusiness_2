import { useState } from "react";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { Button, ButtonColorScheme } from "../Button/Button";
import { Checkbox } from "../Interactors/Checkbox/Checkbox";
import { TextInput } from "../Interactors/TextInput/TextInput";
import { useStyles } from "./styles";

const getDefaultName = () => {
    const date = new Date();
    const name = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getMilliseconds()}`
    return name;
}

const useSaveLoadGameLogic = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSetDefault, setIsSetDefault] = useState(false)
    return {
        name,
        setName: ((e: React.ChangeEvent<HTMLInputElement>) => setName(e?.target?.value)),
        toggleSetDefault: () => {
            setIsSetDefault(!isSetDefault)
            setName(!isSetDefault ? getDefaultName() : '')
        },
        isSetDefault,
        description,
        setDescription:  ((e: React.ChangeEvent<HTMLInputElement>) => setDescription(e?.target?.value)),
    }
}

export const SaveGameWindow = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {name, setName, description, setDescription, isSetDefault, toggleSetDefault} = useSaveLoadGameLogic();
    return (
        <>
            <h1 className={classes.headline}>Save Game</h1>
            <div className={classes.savedGames}>

            </div>
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
                action={() => {}}
                disabled={name === ''}
                disabledTooltip={'Name cannot be empty'}
            />
            <Button
                label={'Load'}
                action={() => {}}
                disabled={name === ''}
                disabledTooltip={'Name cannot be empty, and must exist'}
            />
        </>
        
    )
}
