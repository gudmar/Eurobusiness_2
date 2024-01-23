import { getShiftIndex, shiftBoardIndexBy1 } from "../shiftIndex";



describe('Testign shiftIndex function used to translate index starting from 0 to index starting from 1 in arrays', () => {
    it('Should throw error in case delivered index is < 0', () => {
        const throwingFunction = () => getShiftIndex(0, 10)(-1);
        expect(throwingFunction).toThrow()
    })
    it('Should throw in case arr length <= 0', () => {
        const throwingFunctionLessZero = () => getShiftIndex(0, -1)(1);
        const throwingFunctionEqZero = () => getShiftIndex(0, 0)(1);
        expect(throwingFunctionLessZero).toThrow()
        expect(throwingFunctionEqZero).toThrow();
    })
    it('Should throw in case offset >= arrLength', () => {
        const throwingFunctionGreater = () => getShiftIndex(11, 10)(1);
        const throwingFunctionEq = () => getShiftIndex(10, 10)(1);
        expect(throwingFunctionGreater).toThrow()
        expect(throwingFunctionEq).toThrow();
    })
    it('Should return the same index in case offset is 0', () => {
        const testedFunction = getShiftIndex(0, 32);
        const tests = [
            {input: 0, output: 0},
            {input: 31, output: 31},
            {input: 32, output: 32},
            {input: 1, output: 1},
        ]
        tests.forEach(({input, output}) => expect(testedFunction(input)).toBe(output));
    })

    it('Should return 1 when offset is 1, size is 40 and index is 0', () => {
        const result = shiftBoardIndexBy1(0);
        expect(result).toBe(1);
    })
    it('Should return 40 when offset is 1 and index is 39 and size is 40', () => {
        const result = shiftBoardIndexBy1(39);
        expect(result).toBe(40);
    })
    it('Should return 1 when offset is 1 and index is 40 and size is 40', () => {
        const result = shiftBoardIndexBy1(40);
        expect(result).toBe(1);
    })
    it('Should return 1 when offset is 1 and index is 80 and size is 40', () => {
        const result = shiftBoardIndexBy1(80);
        expect(result).toBe(1);
    })

    it('Should throw in case offset + index < 0', () => {
        const throwingFunction1 = () => getShiftIndex(-1, 10)(0);
        const throwingFunction2 = () => getShiftIndex(-2, 10)(1);
        const notThrowingFunction = () => getShiftIndex(-1, 10)(1);

        expect(throwingFunction1).toThrow()
        expect(throwingFunction2).toThrow()
        expect(notThrowingFunction).not.toThrow()

    })
})