import { useThemesAPI } from "../../Contexts/ThemeContext";
import { useStyles } from "./styles";
import { tStateEditorArgs } from "./types"

export const StateEditorForm = ({children, headline, logAction, formName}: tStateEditorArgs) => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    
    return (
        <div className={classes.scrollArea}>
            <form className={classes.container} autoComplete="off" name={formName || headline}>
                <h1 className={classes.title}>{headline}</h1>
                {logAction && <div className={classes.logButton} onClick={logAction} role={'button'}>Log state in console</div>}
                {/* <button className={classes.logButton} onClick={logHandler}>Log state in console</button> */}
                    <table className={classes.entriesContainer}>
                        <tbody>
                            {children}
                        </tbody>
                    </table>
            </form>
        </div>
    )
}
