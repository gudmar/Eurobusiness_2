import { useRef } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { useStyles } from "./styles";
import { iItemProps, iSelectFromListProps } from "./types";
import { useSelectFromLogic } from "./useSelectFromLogic";

const Item = ({value, selectedValue, select}:iItemProps) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const isSelected = selectedValue === value;
    return (
        <div 
            className={`${classes.itemWrapper} ${isSelected ? classes.selected : classes.notSelected}`}
            onClick={() => {select(value)}}
        >
            {value}
        </div>
    )
}

export const SelectFromList = ({id, label, items, defaultValue='', onClick}: iSelectFromListProps) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const textBoxReference = useRef<HTMLInputElement>(null);
    const {
        isSearchListExpanded,
        selected,
        valueInTextBox,
        visibleItems,
        selectItem,
        clearSelection,
        search,
        close,
        open
    } = useSelectFromLogic({textBoxReference, items, defaultSelection: defaultValue, onClick})
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
                {/* <div className={classes.inputWrapper}> */}
                    <input
                        autoComplete={'off'}
                        type="text"
                        id={id || label}
                        ref={textBoxReference}
                        value={valueInTextBox}
                        onChange={(e)=>{
                            search(e?.target?.value)
                            console.log(e)
                        }}
                    />
                {/* </div> */}

            <div className={`${classes.listWrapper} ${isSearchListExpanded ? classes.visible : classes.hidden}`}>
                <div className={classes.scrollable}>
                    {visibleItems.map((value: string) => 
                        <Item
                            value={value}
                            select={selectItem}
                            selectedValue={selected}
                            key={value}
                        />
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}
