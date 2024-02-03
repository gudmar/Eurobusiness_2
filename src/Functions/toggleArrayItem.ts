export const toggleArrayItem = (arr: unknown[], item: unknown, isAEqualB = (a: unknown, b: unknown) => a === b) => {
    const index = arr.findIndex((arrItem: unknown) => isAEqualB(item, arrItem));
    if (index === -1) return [...arr, item]
    const newArr = [...arr];
    newArr.splice(index, 1);
    return newArr;
}