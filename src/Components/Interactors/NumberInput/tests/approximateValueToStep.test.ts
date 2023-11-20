import { approximateValueToStep } from "../utils";

describe('Testing NumberInput approximateValueToStep', () => {
    it('Should throw if step < 0', () => {
        const args = {min: 0, max: 5, step: -1};
        const getResult = () => approximateValueToStep(5, args);
        expect(getResult).toThrow();
    })
    it('Should throw if min > max', () => {
        const args = {min: 10, max: 5, step: 1}
        const getResult = () => approximateValueToStep(5, args);
        expect(getResult).toThrow();
    })
    it('Should return min when given val < min', () => {
        const args = {min: 0, max: 5, step: 1}
        const result = approximateValueToStep(-6, args);
        expect(result).toBe(0);
    })
    it('Should return max when given val > max', () => {
        const args = {min: 0, max: 5, step: 1}
        const result = approximateValueToStep(6, args);
        expect(result).toBe(5);
    })
    it('Should return min value if val matches min value', () => {
        const args = {min: -2, max: 5, step: 1}
        const result = approximateValueToStep(-2, args);
        expect(result).toBe(-2);
    })
    it('Should return max value if val matches max value and step allows this', () => {
        const args = {min: -20, max: -5, step: 1}
        const result = approximateValueToStep(-5, args);
        expect(result).toBe(-5);
    })
    it('Should return third value (3) when given min: 1, max: 5, step: 1, val: 3', () => {
        const args = {min: 1, max: 5, step: 1}
        const result = approximateValueToStep(3, args);
        expect(result).toBe(3);
    })
    it('Should return third (3) value when given min: 1, max: 5, step: 1, val: 3.4', () => {
        const args = {min: 1, max: 5, step: 1}
        const result = approximateValueToStep(3.4, args);
        expect(result).toBe(3);
    })
    it('Should  return -0.5 when given min: -5, max: 5, step: 1.5, val: 0', () => {
        const args = {min: -5, max: 5, step: 1.5}
        const result = approximateValueToStep(0, args);
        expect(result).toBe(-0.5);
    })
    it('Should return 4 when given min: -5, max: 5, step: 1.5, val: 5', () => {
        const args = {min: -5, max: 5, step: 1.5}
        const result = approximateValueToStep(5, args);
        expect(result).toBe(4);
    })
    it('Should return 4 when given min: -5, max: 5, step: 1.5, val: 50', () => {
        const args = {min: -5, max: 5, step: 1.5}
        const result = approximateValueToStep(50, args);
        expect(result).toBe(4);
    })

})