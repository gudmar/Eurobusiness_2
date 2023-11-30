import { useEffect, useRef } from "react";
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

interface iSquareButtonArgs {
    label: string,
    disabled: boolean,
    onClick: () => void,
    ariaLabel: string,
}

const SquareButton = ({label, disabled, onClick, ariaLabel}: iSquareButtonArgs) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const conditionalyDisabledOnclick = () => { if (!disabled) onClick()}
    return (
        <div
            role='button'
            aria-label={ariaLabel}
            className={`${classes.squareButton} ${classes.squareButtonDisabled}`}
            aria-hidden = {!disabled}
            onClick = {conditionalyDisabledOnclick}
        >
            {label}
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
    } = useSelectFromLogic({ textBoxReference: textBoxReference.current, items, defaultSelection: defaultValue, onClick})
    useEffect(()=> console.log(textBoxReference.current), [textBoxReference.current])
    return (
            <div className={classes.selectFromList}>
                <fieldset className={classes.container}>
                    <legend>{label}</legend>
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
                            <SquareButton
                                label="&times;"
                                disabled = {!valueInTextBox}
                                onClick={clearSelection}
                                ariaLabel={`clear ${label} selection`}
                            />
                        {/* </div> */}
                    </div>
                </fieldset>
                <div 
                    className={`${classes.listWrapper} ${isSearchListExpanded ? classes.visible : classes.hidden}`}
                    aria-hidden={!isSearchListExpanded}
                >
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
    )
}
