import { range } from "../createRange";

describe('Create range', () => {
    it('Should return a [0] when called range(0)', () => {
        const result = range(0);
        expect(result).toEqual([0]);
    });
    it('Should return a [-1, 0] when called range(-1)', () => {
        const result = range(-1);
        expect(result).toEqual([-1, 0]);
    })
    it('Shold return a [-5, -4, -3, -2, -1, 0] when called range(-5)', () => {
        const result = range(-5);
        expect(result).toEqual([-5,-4,-3,-2,-1, 0]);
    })
    it('Should return [0, 1, 2, 3, 4, 5] when called range(5)', () => {
        const result = range(5);
        expect(result).toEqual([0,1,2,3,4,5]);
    })
    it('Should return [3, 4, 5] when called range(3, 5)', () => {
        const result = range(3, 5);
        expect(result).toEqual([3,4,5]);
    })
    it('Should return [5, 3, 2] when called range(5, 3)', () => {
        const result = range(5, 3);
        expect(result).toEqual([5, 4, 3]);
    })
    it('Should return [-3, -4, -5] when called range(-3, -5)', () => {
        const result = range(-3, -5);
        expect(result).toEqual([-3, -4, -5]);
    })
    it('Should return [-2, -1, 0, 1, 2, 3] when called range(-2, 3)', () => {
        const result = range(-2, 3);
        expect(result).toEqual([-2, -1, 0, 1, 2, 3]);
    })
    it('Should return [2, 1, 0, -1, -2] when called range(2, -2)', () => {
        const result = range(2, -2);
        expect(result).toEqual([2, 1, 0, -1, -2]);
    })

    it('Should return [0, 2, 4, 6] when called range(0, 6, 2)', () => {
        const result = range(0, 6, 2);
        expect(result).toEqual([0, 2, 4, 6]);
    })
    it('Should return [0, 2, 4, 6] when called range(0, 7, 2)', () => {
        const result = range(0, 7, 2);
        expect(result).toEqual([0, 2, 4, 6]);
    })
    it('Should return [-1, 1, 3, 5] when called range(-1, 6, 2)', () => {
        const result = range(-1, 6, 2);
        expect(result).toEqual([-1, 1, 3, 5]);
    })
    it('Should return [4, 2, 0, -2] when called range(4, -2, -2)', () => {
        const result = range(4, -2, -2);
        expect(result).toEqual([4,2,0,-2]);
    })
    it('Should throw an execption when called range(4, -2, 2)', () => {
        const result = () => range(4, -2, 2);
        expect(result).toThrow('It is not possible to create a range from 4 to -2 with step 2');
    })
    it('Should throw an execption when called range(-4, -2, -1)', () => {
        const result = () => range(-4, -2, -1);
        expect(result).toThrow('It is not possible to create a range from -4 to -2 with step -1');
    })
    it('Should throw that step should be !==0 if it is 0', () => {
        const result = () => range(0, 0, 0);
        expect(result).toThrow('Step should be !== 0');
    })
    it('Sould return [] in case range(0,0)', () => {
        const result = range(0,0);
        expect(result).toEqual([])
    })
    it('Should produce [0, 0.5, 1, 1.5] when range(0, 1.5, 0.5)', () => {
        const result = range(0, 1.5, 0.5);
        expect(result).toEqual([0, 0.5, 1, 1.5])
    })
})