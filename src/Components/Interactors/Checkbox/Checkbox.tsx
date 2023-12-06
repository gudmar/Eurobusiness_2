import { useEffect } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { tCheckEventType } from "../types";
import { useStyles } from "./styles";

interface iCheckboxProps {
    id?: string,
    label: string,
    onChange: (val: any) => void,
    checked: boolean,
    isLeftVersion?: boolean
}

export const Checkbox = ({id, label, onChange, checked, isLeftVersion=false}: iCheckboxProps) => {
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
            />
        </div>}
        <div className={classes.label}>
            <label
                htmlFor={id || label}
            >
                {label}
            </label>
        </div>
        {!isLeftVersion && <div className={classes.input}>
            <input
                type="checkbox"
                id={id || label}
                onChange={changeHandler}
                checked={checked}
            />
        </div>}

    </div>
    )
}
