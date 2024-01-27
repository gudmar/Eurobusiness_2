import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iInputProps, tGenericInputTypes, tInputHOFProps, tProbableInputTypes } from "../types";
import { useStyles } from "./styles.js";



export const getInput = <InputType extends tProbableInputTypes>(type: tGenericInputTypes, props: tInputHOFProps) => 
        ({id, label, value, onChange, disabledTooltip="Input disabled for some reason", enableConditionFunction=() => true, isRequired=false}: iInputProps<InputType>) => 
{
    const isEnabled = enableConditionFunction();
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
                        disabled={!isEnabled}
                        {...props}
                    />
                    { !isEnabled && <div className={classes.tooltip}>{disabledTooltip}</div> }
                </div>

        </div>
    )
}
