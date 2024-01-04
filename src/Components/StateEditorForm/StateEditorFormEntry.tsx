import { useThemesAPI } from "../../Contexts/ThemeContext";
import { useStyles } from "./styles";
import { tStateEditorEntryArgs } from "./types"

export const StateEditorEntry = ({children, title, currentValue}: tStateEditorEntryArgs) => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <tr>
            <td className={classes.contentRight}>
                <span className={classes.bold}>{title}:</span>
            </td>
            <td className={classes.currentValue}>
                {currentValue}
            </td>
            <td className={classes.editor}>{children}</td>
        </tr>
    )
}
