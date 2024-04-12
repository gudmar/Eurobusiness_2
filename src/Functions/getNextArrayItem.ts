import { ArrayElementsCounter } from "./countArrayElements";

const defaultCompare = (a: unknown, b: unknown) => a === b;

export enum Errors {
    noRepetingElements = 'getNextArrayItem: No element in given array should repeat',
    noGivenElement = 'getNextArrayItem: given element does not exist in array',
    arrayNotEmpty = 'getNextArrayItem: array should not be empty'
}

const throwIfRepetiton = (arr: unknown[]) => {
    const counter = new ArrayElementsCounter(arr);
    if (counter.isRepetition) throw new Error(Errors.noRepetingElements)
}

const getIndex = (arr: unknown[], element: unknown) => {
    const elementAsString = JSON.stringify(element);
    const index = arr.findIndex((item) => {
        const itemAsString = JSON.stringify(item);
        return elementAsString === itemAsString
    })
    if (index === -1) throw new Error(Errors.noGivenElement)
    return index;
}

const throwIfEmpty = (arr: unknown[]) => {
    if (arr.length === 0) throw new Error(Errors.arrayNotEmpty)
}

export const getNextArrayItem = (arr: unknown[], currentElement: unknown, compareMethod = defaultCompare) => {
    throwIfEmpty(arr)
    throwIfRepetiton(arr);
    const index = getIndex(arr, currentElement);
    const nextIndex = index + 1;
    const isCurrentLastElement = arr.length <= nextIndex;
    const result = isCurrentLastElement ? arr[0] : arr[nextIndex];
    return result
}
