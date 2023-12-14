const getRandomIntegerToMax = (maxValue: number) => {
    const rand = Math.random();
    const result = Math.floor(rand * maxValue);
    return result;
}

export const shuffle = (arr: unknown[]): unknown[] => {
    const result = arr.reduce((acc: unknown[], item: unknown, index: number) => {
        const plannedIndex = getRandomIntegerToMax(index);
        acc.splice(plannedIndex, 0, item);
        return acc;
    }, [])
    return result;
}