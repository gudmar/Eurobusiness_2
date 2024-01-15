
const countItems = (arr: unknown[]) => { 
    const items = new Map<unknown, number>();
    arr.forEach((item) => {
        if (items.has(item)) {
            const currentVal = items.get(item);
            items.set(item, currentVal! + 1);
        } else {
            items.set(item, 1);
        }
    })
    return items;
}

const areMapsSame = (map1: Map<unknown, number>, map2: Map<unknown, number>) => {
    const keysOf1 = Array.from(map1.keys());
    const result = keysOf1.every((key: unknown) => {
        const val1 = map1.get(key);
        const val2 = map2.get(key);
        return val1 === val2;
    })
    return result;
}

export const haveArraysSameElements = (arrA: unknown[] | unknown, arrB: unknown[] | unknown) => {
    if (!Array.isArray(arrA) || !Array.isArray(arrB)) {
        return false
    }
    const areLengthsEqual = arrA.length === arrB.length;
    if (!areLengthsEqual) return false;
    const countedItems1 = countItems(arrA);
    const countedItems2 = countItems(arrB);
    const result = areMapsSame(countedItems1, countedItems2);
    return result;
}