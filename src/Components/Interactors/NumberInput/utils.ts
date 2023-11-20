import { iNumberInputSpecialProps } from "./types";

export const floorValue = (val: number, min: number) => val >= min ? val : min;
function* stepValues({ min, max, step }: iNumberInputSpecialProps) {
    const getCurrentValue = () => min + i * step
    const getNextValue = () => min + (i + 1) * step
    let i = -1;
    while (getCurrentValue() < max) {
        i++;
        yield getCurrentValue();
        if (getNextValue() > max) return getCurrentValue();
    }
    return max;
}

export const ceilValue = (val: number, max: number) => val <= max ? val : max;

export const getAllowedValues = ({min, max, step}: iNumberInputSpecialProps) => {
    const stepValuesGetter = stepValues({min, max, step})
    const allowed = [];
    for (let val of stepValuesGetter) { allowed.push(val) };
    return allowed;
}

const throwIfArgsNotValid = (val: number, {min, max, step}: iNumberInputSpecialProps) => {
    if (max < min || step < 0) throw new Error('min should be < max and step > 0')
}

export const approximateValueToStep = (val: number, specificProps: iNumberInputSpecialProps) => {
    throwIfArgsNotValid(val, specificProps)
    if (val < specificProps.min) return specificProps.min
    const allowedValues = getAllowedValues(specificProps);
    const firstBiggerValueIndex = allowedValues.findIndex((allowedVal) => allowedVal > val)
    if (firstBiggerValueIndex < 0) return allowedValues[allowedValues.length - 1];
    const result = allowedValues[firstBiggerValueIndex - 1];
    return  result;
}
