import { useEffect } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { useStyles } from "./styles";
import { iSelectFromListProps } from "./types";

export const Checkbox = ({id, label, items, defaultValue, onClick}: iSelectFromListProps) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const {
        isSearchListExpanded,
        // selected,
        valueInTextBox,
        selectItem,
        clearSelection,
        search,
    } = useSelectFromLogic({textBoxReference, items, defaultSelection, onClick})

    return (
        <div className={classes.container}>

        <div className={classes.label}>
            <label
                htmlFor={id || label}
            >
                {label}
            </label>
        </div>
        <div className={classes.input}>
            <input
                type="text"
                id={id || label}
                
                
            />
        </div>

    </div>
    )
}
