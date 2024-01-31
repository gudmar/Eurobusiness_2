import { useThemesAPI } from "../../Contexts/ThemeContext";
import { useStyles } from "./styles";
import { tStateEditorArgs } from "./types"

export const StateEditorForm = ({children, headline, logAction, formName}: tStateEditorArgs) => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    
    return (
        <div className={classes.scrollArea}>
            <form className={classes.center} autoComplete="off" name={formName || headline}>
                <div className={`${classes.container} ${classes.center}`}>
                    <h1 className={classes.title}>{headline}</h1>
                    {
                        logAction &&
                            <div className={classes.logPanel}>
                                <div className={classes.logButton} onClick={logAction} role={'button'}>Log state in console</div>
                                <div className={classes.logButton} onClick={() => setTimeout(() => console.clear())}>Clear console</div>
                            </div>
                    }
                        <table className={classes.entriesContainer}>
                            <tbody>
                                {children}
                            </tbody>
                        </table>
                </div>
            </form>
        </div>
    )
}
