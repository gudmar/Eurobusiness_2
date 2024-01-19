import { Dice } from "../../Dice/Dice";

class MockRandom {
    static throwNr = 0;
    static reset() { MockRandom.throwNr = 0;}
    static random() {
        MockRandom.throwNr++;
        return MockRandom.throwNr % 2 === 0 ? 1 : 0
    }
}

describe('Testing dice throw with getThrowForGetOutOfPrisonResult', () => {
        
    it('Should return throws: [1, 6], result: fail, when randomly selected 1 and 6', () => {
        const r = MockRandom.random;
        jest.spyOn(global.Math, 'random').mockImplementation(r)

        const dice = new Dice();
        const result = dice.getThrowForGetOutOfPrisonResult();
        MockRandom.reset();
        const expected = {
            throws: [1, 6],
            result: false,
        }
        jest.spyOn(global.Math, 'random').mockRestore();
        expect(result).toEqual(expected);
    })
    it('Should return throws: [5, 5], result: true when randomly selected 0.85 two times', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.85);
        const dice = new Dice();
        const result = dice.getThrowForGetOutOfPrisonResult();
        const expected = {
            throws: [5, 5],
            result: true,
        }
        jest.spyOn(global.Math, 'random').mockRestore();
        expect(result).toEqual(expected);
    })
})

describe('Testing dice throwToMove', () => {
    it('Should return result [[1,6]] sum: 7 doublets: 0 when thrown 1 and 6', () => {
        const r = MockRandom.random;
        jest.spyOn(global.Math, 'random').mockImplementation(r)

        const dice = new Dice();
        const result = dice.throwToMove();
        MockRandom.reset();
        const expected = {
            throws: [[1, 6]],
            doublets: 0,
            sum: 7,
        }
        jest.spyOn(global.Math, 'random').mockRestore();
        expect(result).toEqual(expected);

    })
    it('Should return result [[1, 1][1, 6]] sum 9, doublets: 1 when thrown 1, 1, 1, 6', () => {

    })
    it('Should return result [1, 1], [1, 1] sum 4, doublets: 2 when thrown 1, 1, ,1 ,1', () => {

    })
})
