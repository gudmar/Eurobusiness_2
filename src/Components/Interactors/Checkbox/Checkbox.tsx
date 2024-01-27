import { useEffect } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { tCheckEventType } from "../types";
import { useStyles } from "./styles";

interface iCheckboxProps {
    id?: string,
    label: string,
    onChange: (val: any) => void,
    checked: boolean,
    isLeftVersion?: boolean,
    enableConditionFunction?: () => boolean,
    disabledTooltip?: string,
}

export const Checkbox = (
        {
            id, label, onChange, checked, isLeftVersion=false, enableConditionFunction=(() => true), disabledTooltip='Disabled for some reason'
        }: iCheckboxProps
    ) => {
    const isEnabled = enableConditionFunction();
    const changeHandler = (e:tCheckEventType) => {
        const val = e?.target?.checked;
        onChange(val)
    }
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);    

    return (
        <div className={classes.container}>
        {isLeftVersion && <div className={classes.input}>
            <input
                type="checkbox"
                id={id || label}
                onChange={changeHandler}
                checked={checked}
                disabled={!isEnabled}
            />
            { !isEnabled && <div className={classes.tooltip}>{disabledTooltip}</div> }
        </div>}
        <div className={classes.label}>
            <label
                htmlFor={id || label}
            >
                {label}
            </label>
        </div>
        {!isLeftVersion && <div className={classes.input}>
            { !isEnabled && <div className={classes.tooltip}>{disabledTooltip}</div> }
            <input
                type="checkbox"
                id={id || label}
                onChange={changeHandler}
                checked={checked}
                disabled={!isEnabled}
            />
            
        </div>}

    </div>
    )
}
