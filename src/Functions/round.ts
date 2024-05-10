export const round = (nr: number, precision: number) => {
    const decimals = Math.pow(10, precision);
    const multiplied  = nr * decimals;
    const rounded = Math.round(multiplied);
    const result = rounded / decimals;
    return result;
}

export enum RoundToMultiplicityErrors {
    IllegalBase = 'Illegal base',
}

const isBaseIllegal = (base:number) => {
    const conditions = [
        (base % 1) !== 0,
        base < 1,
    ];
    const result = conditions.some((condition) => condition);
    return result;
}

const throwIfBaseIllegal = (base: number) => {
    if (isBaseIllegal(base)) throw new Error(RoundToMultiplicityErrors.IllegalBase)
}

export const roundToMultiplicity = (nr: number, base: number) => {
    // roundToInteger(46, 5) should return 46, as this is nearest multiplicity
    throwIfBaseIllegal(base);
    const rest = nr % base;
    const floor = Math.round(nr - rest); // 0.00000000000000002 cases
    const distanceToNext = base - rest;
    if (distanceToNext <= rest) return floor + base;
    return floor
}

