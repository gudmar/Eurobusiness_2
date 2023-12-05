import { useRef } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { Checkbox } from "../Checkbox/Checkbox";
import { SearchButton } from "../SearchButton/SearchButton";
import { SquareButton } from "../SquareButton/SquareButton";
import { useStyles } from "./styles";
import { iItemProps, iSelectFromListProps } from "./types";
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
    return result;
}

const runCallbackOnAsString = (callback: (arg: string) => void, val: any) => {
    if (!isSingleConvertableToString(val)) throw new Error('Value not convertable to a string')
    if (typeof val === 'string') { callback(val)}
    else { callback(val.toString())}
}

const getAsString = (val:any) => typeof val === 'string' ? val : val.toString();

const Item = ({value, selectedValues, toggleSelection}:iItemProps) => {
    // const { theme } = useThemesAPI();
    // const classes: {[key:string]: string} = useStyles(theme as any);
    const isSelected = doesSelectedContainValue(selectedValues, value);
    const valAsString = getAsString(value);
    return (
        <Checkbox
            label = {valAsString}
            onChange = {toggleSelection}
            checked = {isSelected}
        />
    )
}

export const MultiSelectFromList = ({id, label, items, defaultValues=[], onClick}: iSelectFromListProps) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const focusRef = useRef<HTMLInputElement>(null);
    const blurRef = useRef<HTMLInputElement>(null);
    const {
        isSearchListExpanded,
        valueInTextBox,
        selectItem,
        clearSelection,
        search,
        close,
        open,
        selected,
        visibleItems,
    } = useMultiSelectFromLogic({ focusRef, blurRef,  items, defaultSelection: defaultValues, onClick})
    // useEffect(()=> console.log(textBoxReference.current), [])
    console.log('State', selected, typeof selected)
    return (
            <div className={classes.selectFromList} ref={blurRef} tabIndex={0}>
                <fieldset className={classes.container}>
                    <legend>{label}</legend>
                    <div className={classes.input}>
                        {/* <div className={classes.inputWrapper}> */}
                            <input
                                autoComplete={'off'}
                                type="text"
                                id={id || label}
                                ref={focusRef}
                                value={valueInTextBox}
                                onChange={(e)=>{
                                    search(e?.target?.value)
                                    console.log(e)
                                }}
                            />
                            <SearchButton
                                isDisabled={false}
                                onClick={() => {}}
                                ariaLabel={'Search multiselection'}
                            />
                            <SquareButton
                                children="&times;"
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
                                toggleSelection={selectItem}
                                selectedValues={selected}
                                key={value}
                            />
                        )}
                    </div>
                </div>
        </div>
    )
}
