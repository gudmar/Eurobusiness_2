import { ArrayElementsCounter } from "../countArrayElements";

describe('ArrayElementsCounter tests', () => {
    it('Should count elements when they do not repeat', () => {
        const arr = [1,2,3,4,5,6,7,8,9]
        const expected = [1,1,1,1,1,1,1,1,1];
        const counter = new ArrayElementsCounter(arr);
        const result = counter.repetitions;
        expect(result).toEqual(expected);
    })
    it('Should count primiteives when they repeat', () => {
        const arr = [1,2,3,1,2,3,4,5,6,4]
        const expected = [2,2,2,2,1,1];
        const counter = new ArrayElementsCounter(arr);
        const result = counter.repetitions;
        expect(result).toEqual(expected);
    })
    it('Should count complext objects when they repeat', () => {
        const arr = [0,'asdf', 9, {a: 0, b: 1}, 'asdf', 8, {a: 0, b: 1}]
        const expected = [1, 2,1,2,1];
        const counter = new ArrayElementsCounter(arr);
        const result = counter.repetitions;
        expect(result).toEqual(expected);
    })
    it('Should return false if elements do not repeat', () => {
        const arr = [0,1,2,3,4,5,'wert',{a:1}]
        const counter = new ArrayElementsCounter(arr);
        const result = counter.isRepetition;
        expect(result).toBeFalsy();
    })
    it('Should return true if elements repeat', () => {
        const arr = [0,1, {a:1},2,3,4,5,'wert',{a:1}]
        const counter = new ArrayElementsCounter(arr);
        const result = counter.isRepetition;
        expect(result).toBeTruthy();
    })
})