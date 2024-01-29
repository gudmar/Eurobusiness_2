import { useThemesAPI } from "../../Contexts/ThemeContext";
import { useStyles } from "./styles";
import { tStateEditorEntryArgs } from "./types"
import { Children, ReactNode } from "react";
import ReactDOMServer from 'react-dom/server';

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

export const CollapsedEditorEntry = ({children, title, currentValue}: tStateEditorEntryArgs) => {
    const { theme, setThemeName } = useThemesAPI();
    console.log('Children', children)
    const classes = useStyles(theme as any);
    return (
        <tr>
            <td className={classes.contentRight}>
                <span className={classes.bold}>{title}:</span>
            </td>
            <td className={classes.editor}>{children ? children : currentValue}</td>
            
        </tr>
    )
}
