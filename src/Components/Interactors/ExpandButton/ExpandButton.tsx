import { ReactComponent as ExpandIcon } from "../../../Icons/expand.svg";
import { SquareButton } from "../SquareButton/SquareButton";
import { useStyles } from "./styles";
import { iExpandButtonArgs } from "./types";

export const ExpandButton = ({onClick, isExpanded}: iExpandButtonArgs) => {
    const classes: {[key:string]: string} = useStyles();
    return (
        <SquareButton
            ariaLabel="expand button"
            disabled={false}
            onClick={onClick}
        >
            <span>
                <ExpandIcon className={`${classes.icon} ${isExpanded ? classes.expanded : classes.notExpanded}`}/>
            </span>
        </SquareButton>
    )
}
