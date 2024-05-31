export const isDefined = (val: unknown) => {
    if (val === undefined || val === null) return false
    return true;
}

export const areDefined = (arr: any[]) => {
    const result = arr.reduce((acc: boolean, {item}: {item: any}) => {
        const partial = isDefined(item);
        if (!partial) return false;
        return acc;
    }, true)
    return result;
}

export const isDefinedNotEmptyString = (val: unknown) => {
    if (!isDefined(val)) return false;
    const result = val !== '';
    return result;
}
