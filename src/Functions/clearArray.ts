export const clearArray = (arr: any[]) => {
    if (arr.length) { arr.pop(); clearArray(arr) }
    return arr;
}
