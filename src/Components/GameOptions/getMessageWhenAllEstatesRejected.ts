import { isDefinedNotEmptyString } from "../../Functions/isDefined";
import { tObject } from "../../Logic/types";

const isOnlySingleRejectionKey = (obj: tObject<any>) => {
    const keys = Object.keys(obj);
    if (keys.length === 1 && keys[0] === 'reason') return true;
    return false;
}
const areRejections = (values: tObject<any>[]) => {
    const result = values.every(isOnlySingleRejectionKey);
    return result;
}
const areSameRejections = (rejectionValues: tObject<any>[]) => {
    if (!areRejections(rejectionValues)) return false;
    const referentialRejection = rejectionValues?.[0]?.reason;
    if (!referentialRejection) return false;
    const result = rejectionValues.every((rejection) => {
        if (rejection?.reason === referentialRejection)  return true;
        return false;
    })
    return result;
}
const concatenateReasons = (country: tObject<any>) => {
    const entries = Object.entries(country);
    const result = entries.reduce((acc, [key, value]) => {
        const reason = value?.reason;
        const separator = acc === '' ? '' : '; '
        const newAcc = `${acc}${separator}${key}: ${reason}`;
        return newAcc;
    }, '')
    return result;
}

export const getMessageWhenAllEstatesRejected = (country: tObject<any>) => {
    const isCollapsedRejection = isDefinedNotEmptyString(country?.reason);
    if (isCollapsedRejection) return country.reason;

    const countryValues = Object.values(country);

    if (areSameRejections(countryValues)) return countryValues[0].reason;

    if (areRejections(countryValues)) {
        const result = concatenateReasons(country);
        return result;
    }
    const someEstatesAreNotRejectedReturnValue = '';
    return someEstatesAreNotRejectedReturnValue;
}
