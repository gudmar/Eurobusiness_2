import { getInput } from "../Input/Input";
import { iNumberInput } from "../types";

export const NumberInput = ({
    value, label, onChange, id, isRequired, min, max, step
}: iNumberInput ) => {
    const NumberInputComponent = getInput('number', {min, max, step})
    return (
        <NumberInputComponent
            id={id || label}
            label={label}
            value={value}
            isRequired={isRequired}
            onChange={onChange}
        />
    )
}

