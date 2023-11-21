import { useMemo } from "react";
import { getInput } from "../Input/Input";
import { iNumberInput, tTextEventType } from "../types";
import { iTernaryNumberInputSpecificProps } from "./types";
import { approximateValueToStep } from "./utils";

const getApporximatedValue = ( val: string, {min, max, step}: iTernaryNumberInputSpecificProps) => {
    if (!min || !max || !step) return val;
    return approximateValueToStep(parseInt(val), {min, max, step})
}

export const NumberInput = ({
    value, label, onChange, id, isRequired, min, max, step
}: iNumberInput ) => {
    const NumberInputComponent = useMemo( () => getInput('number', {min, max, step}), [])
    const approximatedValue = getApporximatedValue(value, {min, max, step});
    return (
        <NumberInputComponent
            id={id || label}
            label={label}
            value={approximatedValue}
            isRequired={isRequired}
            onChange={(e:tTextEventType) => onChange(e?.target?.value)}
        />
    )
}

