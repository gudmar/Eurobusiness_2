import { useMemo } from "react";
import { getInput } from "../Input/Input";
import { iTextInput } from "../types";

export const TextInput = ({
    value,
    label,
    onChange,
    id,
    isRequired,
    minLength,
    maxLength,
    size,
    disabledTooltip = 'Text input is disabled for some reason',
    enableConditionFunction = () => true,
    
}: iTextInput ) => {
    const TextInputComponent = useMemo(() => getInput('text', {minLength, maxLength, size}), [])
    return (
        <TextInputComponent
            id={id || label}
            label={label}
            value={value}
            isRequired={isRequired}
            onChange={onChange}
            enableConditionFunction = {enableConditionFunction}
            disabledTooltip = {disabledTooltip}
        />
    )
}
