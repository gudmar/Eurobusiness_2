import { useEffect, useRef } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { Checkbox } from "../Checkbox/Checkbox";
import { CloseButton } from "../CloseButton/CloseButton";
import { ExpandButton } from "../ExpandButton/ExpandButton";
import { SearchButton } from "../SearchButton/SearchButton";
import { useStyles } from "./styles";
import { iItemProps, iSelectFromListProps, iTagProps } from "./types";
import { useMultiSelectFromLogic } from "./useMultiSelectFromLotic";

const isSingleConvertableToString = (val: any) => {
    if (typeof val === 'string') return true;
    if (val.toString) return true;
    return false;
}

const isConvertableToString = (values: any[]) => {
    const areConvertable = values.every(isSingleConvertableToString);
    return areConvertable;
}

const areEqual = (val1: any, val2: any) => {
    const val1AsString = typeof val1 === 'string' ? val1 : val1.toString();
    const val2AsString = typeof val2 === 'string' ? val2 : val2.toString();
    return val1AsString === val2AsString;
}

const doesSelectedContainValue = (selected: any[], value: any) => {
    if (!isConvertableToString(selected)) throw new Error('Some items in selected are not string convertable')
    if (!isSingleConvertableToString(value)) throw new Error('Selected item is not convertable to a string')
    const result = selected.find((item: any) =>areEqual(item, value));
    return !!result;
}

const runCallbackOnAsString = (callback: (arg: string) => void, val: any) => {
    if (!isSingleConvertableToString(val)) throw new Error('Value not convertable to a string')
    if (typeof val === 'string') { callback(val)}
    else { callback(val.toString())}
}

const getAsString = (val:any) => typeof val === 'string' ? val : val.toString();

const Item = ({value, selectedValues, toggleSelection}:iItemProps) => {
    const isSelected = doesSelectedContainValue(selectedValues, value);
    const valAsString = getAsString(value);
    return (
        <Checkbox
            label = {valAsString}
            onChange = {() => toggleSelection(value)}
            checked = {isSelected}
            isLeftVersion={true}
        />
    )
}

const Tag = ({value, toggleSelection}: iTagProps) => {
    const onClose = () => toggleSelection(value)
    const classes: {[key:string]: string} = useStyles();
    return (
        <div className={classes.tagWrapper}>
            <span className={classes.tagLabel}>{value}</span>
            <div className={classes.close}>
                <CloseButton
                    onClick={onClose}
                    ariaLabel={`remove ${value}`}
                    isDisabled={false}
                />
            </div>
        </div>
    )
}

export const MultiSelectFromList = ({
    id, label, items, defaultValues=[], onClick, onSelected, onUnselected, disabledTooltip='Input disabled for some reason', enableConditionFunction=()=>true
}: iSelectFromListProps) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const isEnabled = enableConditionFunction();
    const focusRef = useRef<HTMLInputElement>(null);
    const keepFocusRef = useRef<HTMLInputElement>(null);
    const toggleExpandRef = useRef<HTMLInputElement>(null);
    const {
        isSearchListExpanded,
        valueInTextBox,
        toggleSelection,
        search,
        close,
        open,
        selected,
        visibleItems,
        clearSearchResult,
    } = useMultiSelectFromLogic({ isEnabled, keepFocusRef, dontLoseFocusRefs: [toggleExpandRef],  items, defaultSelection: defaultValues, onSelected, onUnselected})
    useEffect(() => console.log(items), [items])
    useEffect(() => console.log(visibleItems), [visibleItems])
    const toggleExpand = () => {
        if (isSearchListExpanded) {close()} else {open()}
    }
    return (
            <div className={classes.selectFromList}  tabIndex={0}>
                <fieldset className={`${classes.container} ${ isEnabled?'':classes.disabledFieldset}`}>
                    { !isEnabled && <div className={classes.tooltip}>{disabledTooltip}</div> }
                    <legend>{label}</legend>
                    
                    <div className={`${classes.tags} ${isEnabled?'':classes.disabledTags}`}>
                        {selected.length === 0 && <div className={`${classes.placeholderContainer} ${isEnabled?'':classes.disabledTags}`}><span>No tags</span></div>}
                        {selected.map((item:string) => 
                            <Tag
                                value={item}
                                toggleSelection={toggleSelection}
                                key={item}
                            />)
                        }
                    </div>
                    <div
                        ref={toggleExpandRef}
                    >
                        <ExpandButton
                            onClick={toggleExpand}
                            isExpanded={isSearchListExpanded}
                        />
                    </div>
                </fieldset>
                <div 
                    className={`${classes.listWrapper} ${isSearchListExpanded ? classes.visible : classes.hidden}`}
                    aria-hidden={!isSearchListExpanded}
                    ref={keepFocusRef}
                >
                    <div className={`${classes.input} ${isEnabled?'':classes.disabledInput}`}>
                        
                        <SearchButton
                            isDisabled={false}
                            onClick={() => {}}
                            ariaLabel={'Search multiselection'}
                        />
                        <input
                            autoComplete={'off'}
                            type="text"
                            id={id || label}
                            ref={focusRef}
                            value={valueInTextBox}
                            onChange={(e)=>{
                                search(e?.target?.value)
                            }}
                        />
                        <CloseButton
                            isDisabled={valueInTextBox===''}
                            ariaLabel={`Clear ${label} search result`}
                            onClick={clearSearchResult}
                        />
                </div>

                    <div className={classes.scrollable}>
                        {visibleItems.map((value: string) => 
                            <div className={classes.notSelected} key={value}>
                                <Item
                                    value={value}
                                    toggleSelection={toggleSelection}
                                    selectedValues={selected}
                                />
                            </div>
                        )}
                    </div>
                </div>
        </div>
    )
}
