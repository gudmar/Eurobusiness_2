import { useEffect } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { useStyles } from "./styles";
import { tTextAreaProps } from "./types";

export const TextAreaInput = (props: tTextAreaProps) => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const { value, setValue, isEnabled, label } = props
    const interior = (
        <textarea
            className={classes.textInput}
            autoComplete = {'false'}
            disabled={!isEnabled}
            spellCheck={'true'}
            wrap={'true'}
            onChange={(event) => {setValue(event.target.value)}}
            value={value}
        />
    )
    if (label) return (
        <section className={classes.textAreaWrapper}>
            <fieldset id={'value'} className={classes.fieldset}>
                <legend>Description</legend>
                {interior}
            </fieldset>
        </section>        
    )
    return (
        <section className={classes.textAreaWrapper}>
            {interior}
        </section>
    )
}
