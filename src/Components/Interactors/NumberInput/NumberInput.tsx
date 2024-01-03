import { useMemo } from "react";
import { getInput } from "../Input/Input";
import { iNumberInput, tTextEventType } from "../types";
import { iTernaryNumberInputSpecificProps } from "./types";
import { approximateValueToStep } from "./utils";

const getApporximatedValue = ( val: string, {min, max, step}: iTernaryNumberInputSpecificProps): number => {
    if (min === undefined || max === undefined || step === undefined) return parseInt(val);
    return approximateValueToStep(parseInt(val), {min, max, step})
}

export const NumberInput = ({
    value, label, onChange, id, isRequired, min, max, step
}: iNumberInput ) => {
    const NumberInputComponent = useMemo( () => getInput('number', {min, max, step}), [])
    const approximatedValue = getApporximatedValue(value, {min, max, step});
    const changeHandler = (e:tTextEventType) => {
        const val = e?.target?.value;
        const approximated = getApporximatedValue(val, {min, max, step})
        onChange(approximated)
    }
    return (
        <NumberInputComponent
            id={id || label}
            label={label}
            value={approximatedValue}
            isRequired={isRequired}
            onChange={changeHandler}
        />
    )
}

