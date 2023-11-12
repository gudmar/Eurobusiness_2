import { getInput } from "../Input/Input";
import { iTextInput } from "../types";

export const TextInput = ({
    value, label, onChange, id, isRequired, minLength, maxLength, size
}: iTextInput ) => {
    const TextInputComponent = getInput('text', {minLength, maxLength, size})
    return (
        <TextInputComponent
            id={id || label}
            label={label}
            value={value}
            isRequired={isRequired}
            onChange={onChange}
        />
    )
}
