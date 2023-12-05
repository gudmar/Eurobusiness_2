import { ReactComponent as SearchIcon } from "../../../Icons/search.svg";
import { SquareButton } from "../SquareButton/SquareButton";
import { useStyles } from "./styles";
import { iSearchButtonArgs } from "./types";

export const SearchButton = ({onClick, isDisabled, ariaLabel}: iSearchButtonArgs) => {
    const classes: {[key:string]: string} = useStyles();
    return (
        <SquareButton
            ariaLabel={ariaLabel}
            disabled={isDisabled}
            onClick={() => { if (!isDisabled) onClick()}}
        >
            <div className={classes.shutterParent}>
                <SearchIcon className={`${classes.icon}`}/>
                <div className={`${isDisabled ? classes.disabled : classes.endabled}`}></div>
            </div>
        </SquareButton>
    )
}
