const NR_SYMBOLS = 10;
const LEVEL_OF_SIGNIFICANCE = 0.1

const removeZeros = (n: number): number => {
    if (n >= LEVEL_OF_SIGNIFICANCE)  return n;
    return removeZeros(n * 10);
}

export const getUuid = () => {
    const firstRandom = Math.random();
    const secondRandom = Math.random();
    const randomFactor = firstRandom * secondRandom;
    const normalizedFactor = removeZeros(randomFactor);
    const multipliedFactor = NR_SYMBOLS * normalizedFactor;
    const roundedFactor = Math.ceil(multipliedFactor);
    const factorAsTriginaSex = roundedFactor.toString(36);
    return factorAsTriginaSex;
}
