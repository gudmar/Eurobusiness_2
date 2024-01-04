import { useThemesAPI } from "../../Contexts/ThemeContext";
import { useStyles } from "./styles";
import { tStateEditorArgs } from "./types"

export const StateEditorForm = ({children, headline, logAction, formName}: tStateEditorArgs) => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <div className={classes.scrollArea}>
            <form className={classes.container} autoComplete="off" name={formName || headline}>
                <h1>{headline}</h1>
                {logAction && <button className={classes.logButton} onClick={logAction}>Log state in console</button>}
                    <table className={classes.entriesContainer}>
                        {children}
                    </table>
            </form>
        </div>
    )
}
