import { useEffect, useRef } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { CloseButton } from "../CloseButton/CloseButton";
import { ExpandButton } from "../ExpandButton/ExpandButton";
import { SquareButton } from "../SquareButton/SquareButton";
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

export const SingleSelectFromList = ({id, label, items, onSelect, defaultValue='', disabledTooltip='Input disabled for some reason', enableConditionFunction=()=>true, small=false}: iSelectFromListProps) => {
    useEffect(() => console.log(defaultValue), [defaultValue])
    const { theme } = useThemesAPI();
    const isEnabled = enableConditionFunction();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const focusRef = useRef<HTMLInputElement>(null);
    const blurRef = useRef<HTMLInputElement>(null);
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
    } = useSelectFromLogic({ focusRef, blurRef,  items, isEnabled, defaultSelection: defaultValue, onSelect })
    useEffect(() => console.log('Selected in SSFormList', selected), [selected])
    return (
            <div className={`${classes.selectFromList}`} ref={blurRef} tabIndex={0}>
                <fieldset className={`${classes.container}  ${!isEnabled ? classes.disabledFieldset : ''} ${small ? classes.smallContainer : ''}`}>
                    {!small ?? <legend>{label}</legend>}
                    <div className={`${classes.input} ${isEnabled?'':classes.disabledInput}`}>
                            { !isEnabled && <div className={classes.tooltip}>{disabledTooltip}</div> }
                            <input
                                autoComplete={'off'}
                                type="text"
                                id={id || label}
                                ref={focusRef}
                                value={valueInTextBox}
                                disabled={!isEnabled}
                                onChange={(e)=>{
                                    search(e?.target?.value)
                                }}
                            />
                            <CloseButton
                                isDisabled = {valueInTextBox === ''}
                                onClick={clearSelection}
                                ariaLabel={`clear ${label} selection`}
                            />
                            <ExpandButton
                                isExpanded={isSearchListExpanded}
                                onClick={() => {isSearchListExpanded ? close() : open()}}
                            />
                            
                    </div>
                </fieldset>
                <div 
                    className={`${classes.listWrapper} ${small ? classes.listWrapperSmall : ''} ${isSearchListExpanded ? classes.visible : classes.hidden}`}
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
