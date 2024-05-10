import { roundToMultiplicity, RoundToMultiplicityErrors } from "../round"

describe('Testing roundToMultiplicity', () => {
    it('Should throw when base is a fraction', () => {
        const thrownigFunction = () => roundToMultiplicity(4, 4.32);
        expect(thrownigFunction).toThrow(RoundToMultiplicityErrors.IllegalBase)

    })
    it('Should throw when base is < 1', () => {
        const thrownigFunction_0 = () => roundToMultiplicity(4, 0);
        const thrownigFunction_neg1 = () => roundToMultiplicity(4, -1);
        expect(thrownigFunction_0).toThrow(RoundToMultiplicityErrors.IllegalBase)
        expect(thrownigFunction_neg1).toThrow(RoundToMultiplicityErrors.IllegalBase)
    })
    it('Should return nr when base is 1 and nr is an integer', () => {
        const result = roundToMultiplicity(7, 1)
        expect(result).toBe(7)
    })
    it('Should reutrn nr rounded to integer in case base is 1 and nr is a fraction', () => {
        const result = roundToMultiplicity(7.62, 1)
        expect(result).toBe(8)
    })
    it('Should return 8 when nr is 7 and base is 2', () => {
        const result = roundToMultiplicity(7, 2)
        expect(result).toBe(8)
    })
    it('Should return 6 when nr is 6.75 and base is 2', () => {
        const result = roundToMultiplicity(6.75, 2)
        expect(result).toBe(6)
    })

})