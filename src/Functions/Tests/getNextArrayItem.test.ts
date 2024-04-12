import { Errors, getNextArrayItem } from "../getNextArrayItem"

describe('Testing getNextArrayItem', () => {
    it('Should throw error when array has 2 same elemnets', () => {
        const arr = [0,1,2,3,4,2]
        const throwingFunction = () => getNextArrayItem(arr, 3)
        expect(throwingFunction).toThrow(Errors.noRepetingElements);
    })
    it('Should throw error when element does not exist in array', () => {
        const arr = [0,1,2,3,4]
        const throwingFunction = () => getNextArrayItem(arr, 8)
        expect(throwingFunction).toThrow(Errors.noGivenElement);
    })
    it('Should return next index in case item is in the middle of the array', () => {
        const arr = ['a', 'b', 'c', 'd', 'e']
        const nextElement = getNextArrayItem(arr, 'c')
        expect(nextElement).toBe('d')
    })
    it('Should return first index in case item is the last array element', () => {
        const arr = ['a', 'b', 'c', 'd', 'e']
        const nextElement = getNextArrayItem(arr, 'e')
        expect(nextElement).toBe('a')
    })
    it('Should thorw in case arr is empty and element is undefined', () => {
        const arr: any[] = []
        const throwingFunction = () => getNextArrayItem(arr as unknown[], undefined)
        expect(throwingFunction).toThrow(Errors.arrayNotEmpty);
    })
})