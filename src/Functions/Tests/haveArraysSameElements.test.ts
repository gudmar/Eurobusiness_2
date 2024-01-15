import { haveArraysSameElements } from "../haveArraysSameElements";

describe('Testing have arrays same elements function', () => {
    it('Sould return false in case one of items is not an array', () => {
        const A = undefined;
        const arrB: number[] = [];
        const C = null;
        const resultUndef = haveArraysSameElements(A, arrB);
        const resultNull =  haveArraysSameElements(C, arrB);
        expect(resultUndef).toBeFalsy();
        expect(resultNull).toBeFalsy();

    })
    it('Should return true when 2 empty arrays given for comparation', () => {
        const arrA: number[] = [];
        const arrB: number[] = [];
        const result = haveArraysSameElements(arrA, arrB);
        expect(result).toBeTruthy();
    });
    it('Should return false when 2 arrays have different nr of items', () => {
        const arrA: number[] = [1];
        const arrB: number[] = [];
        const result = haveArraysSameElements(arrA, arrB);
        expect(result).toBeFalsy();
    });
    it('Shold return true in case 2 arrays have the same items in the same order', () => {
        const arrA: number[] = [1, 2, 3, 4, 5];
        const arrB: number[] = [1, 2, 3, 4, 5];
        const result = haveArraysSameElements(arrA, arrB);
        expect(result).toBeTruthy();
    });
    it('Should return false when one item in second array is different', () => {
        const arrA: number[] = [1, 2, 3, 4, 5];
        const arrB: number[] = [1, 6, 3, 4, 5];
        const result = haveArraysSameElements(arrA, arrB);
        expect(result).toBeFalsy();
    });
    it('Should return true when one item in second array has switchdd position with some else item, but both arrays have the same items', () => {
        const arrA: number[] = [1, 4, 5, 2, 3];
        const arrB: number[] = [1, 2, 3, 4, 5];
        const result = haveArraysSameElements(arrA, arrB);
        expect(result).toBeTruthy();
    })
    it('Sould  return true when there are the same items in arrays, items repeat, and have different order. Number of each item type is the same in both arrays', () => {
        const arrA: number[] = [1, 4, 5, 2, 3, 4, 3];
        const arrB: number[] = [1, 2, 4, 3, 3, 4, 5];
        const result = haveArraysSameElements(arrA, arrB);
        expect(result).toBeTruthy();
    })
    it('Should return fase when there are the same items in both arrays, itmes repeat, but number of some items is different', () => {
        const arrA: number[] = [1, 4, 5, 2, 3, 4, 4, 3];
        const arrB: number[] = [1, 2, 4, 3, 3, 3, 4, 5];
        const result = haveArraysSameElements(arrA, arrB);
        expect(result).toBeFalsy();
    })
})