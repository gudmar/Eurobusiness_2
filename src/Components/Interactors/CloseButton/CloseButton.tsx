import { ReactComponent as CloseIcon } from "../../../Icons/close.svg";
import { SquareButton } from "../SquareButton/SquareButton";
import { useStyles } from "./styles";
import { iCloseButtonArgs } from "./types";

export const CloseButton = ({onClick, isDisabled, ariaLabel}: iCloseButtonArgs) => {
    const classes: {[key:string]: string} = useStyles();
    return (
        <SquareButton
            ariaLabel={ariaLabel}
            disabled={isDisabled}
            onClick={onClick}
        >
            <span>
                <CloseIcon className={`${classes.icon} ${isDisabled ? classes.disabled : classes.enabled}`}/>
            </span>
        </SquareButton>
    )
}
