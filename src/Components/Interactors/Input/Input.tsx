import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iInputProps, tGenericInputTypes, tInputHOFProps, tProbableInputTypes } from "../types";
import { useStyles } from "./styles.js";



export const getInput = <InputType extends tProbableInputTypes>(type: tGenericInputTypes, props: tInputHOFProps) => 
        ({id, label, value, onChange, isRequired=false}: iInputProps<InputType>) => 
{
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);    
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
                    value={value}
                    type={type}
                    id={id || label}
                    required={isRequired}
                    onChange={onChange}
                    {...props}
                />
            </div>
        </div>
    )
}
