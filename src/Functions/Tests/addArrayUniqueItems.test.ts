import { addUniqueArrayItems } from "../addArrayUniqueItems"

describe('Testing addUniqueArrayItems', () => {
    it('Should return empty array if both arrays are empty', () => {
        const output = addUniqueArrayItems([], []);
        const expectedResult: string[] = [];
        expect(output).toEqual(expectedResult);
    })
    it('Should return the same array in case arrayFrom has items, but arrayTo is empty', () => {
        const output = addUniqueArrayItems([1, 2, 3, 3, 4], []);
        const expectedResult: number[] = [1, 2, 3, 3, 4];
        expect(output).toEqual(expectedResult);
    })
    it('Should return arrayFrom in case arrayFrom has elements but arrayTo is empty', () => {
        const output = addUniqueArrayItems([], [1, 2, 3, 4]);
        const expectedResult: number[] = [1, 2, 3, 4];
        expect(output).toEqual(expectedResult);
    })
    it('Should return only arrayFrom unique items in case some of them repeat, but arrayTo is empty', () => {
        const output = addUniqueArrayItems([], [1, 2, 3, 3, 4]);
        const expectedResult: number[] = [1, 2, 3, 4];
        expect(output).toEqual(expectedResult);
    })
    it('Should return only items that do not accure in arrayTo', () => {
        const output = addUniqueArrayItems([1, 9 ,9 , 4], [1, 2, 3, 4]);
        const expectedResult: number[] = [1, 9, 9, 4, 2, 3];
        expect(output).toEqual(expectedResult);
    })

    it('Should add only unique items', () => {
        const output = addUniqueArrayItems([1, 9 ,9 , 4], [1, 2, 3, 3, 4]);
        const expectedResult: number[] = [1, 9, 9, 4, 2, 3];
        expect(output).toEqual(expectedResult);
    })

})