export const round = (nr: number, precision: number) => {
    const decimals = Math.pow(10, precision);
    const multiplied  = nr * decimals;
    const rounded = Math.round(multiplied);
    const result = rounded / decimals;
    return result;
}