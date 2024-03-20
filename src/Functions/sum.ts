export const sum = (arr: number[]) => {
    const result = arr.reduce((acc, item) => {
        const next = acc + item;
        return next
    }, 0)
    return result;
}
