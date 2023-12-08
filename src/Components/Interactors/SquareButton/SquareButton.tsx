import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { useStyles } from "./styles";
import { iSquareButtonArgs } from "./types";

export const SquareButton = ({children, disabled, onClick, ariaLabel}: iSquareButtonArgs) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const conditionalyDisabledOnclick = () => { if (!disabled) onClick()}
    return (
        <div
            role='button'
            aria-label={ariaLabel}
            className={`${classes.squareButton} ${disabled ? classes.squareButtonDisabled : ''}`}
            aria-hidden = {!disabled}
            onMouseDown = {conditionalyDisabledOnclick}
        >
            {children}
        </div>
    )
}
