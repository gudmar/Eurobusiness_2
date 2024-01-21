import { range } from "../../../Functions/createRange";
import { Dice, DiceTestModeDecorator } from "../../Dice/Dice";
import { TestModes } from "../../Dice/types";

class MockRandom {
    static throwNr = 0;
    static reset() { MockRandom.throwNr = 0;}
    static random() {
        MockRandom.throwNr++;
        return MockRandom.throwNr % 2 === 0 ? 1 : 0
    }
}

class MockNotSymetricalRandom {
    static throwNr = 0;
    static reset() { MockNotSymetricalRandom.throwNr = 0;}
    static random() {
        MockNotSymetricalRandom.throwNr++;
        return MockNotSymetricalRandom.throwNr % 4 === 0 ? 1 : 0
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
        const r = MockNotSymetricalRandom.random;
        jest.spyOn(global.Math, 'random').mockImplementation(r)
        const dice = new Dice();
        const result = dice.throwToMove();
        const expected = {
            throws: [[1, 1], [1, 6]],
            sum: 9, 
            doublets: 1
        }
        jest.spyOn(global.Math, 'random').mockRestore();
        MockNotSymetricalRandom.reset();
        expect(result).toEqual(expected)


    })
    it('Should return result [1, 1], [1, 1] sum 4, doublets: 2 when thrown 1, 1, ,1 ,1', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0);
        const dice = new Dice();
        const result = dice.throwToMove();
        const expected = {
            throws: [[1, 1], [1, 1]],
            sum: 4,
            doublets: 2,
        }
        jest.spyOn(global.Math, 'random').mockRestore();
        expect(result).toEqual(expected);
    })
})

describe('Testing DiceTestModeDecorator', () => {
    afterEach(() => DiceTestModeDecorator.delete())
    it ('Should return the same instance when constructor called twice' , () => {
        const testDice1 = new DiceTestModeDecorator();
        const testDice2 = new DiceTestModeDecorator();
        const isTheSame = testDice1 === testDice2;
        expect(isTheSame).toBeTruthy();
    })
    it('Should use Math.random in case TestMode is set to none', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0);
        const dice = new DiceTestModeDecorator();
        const result = dice.throwToMove(0);
        const expected = {
            throws: [[1, 1], [1, 1]],
            sum: 4,
            doublets: 2,
        }
        jest.spyOn(global.Math, 'random').mockRestore();
        expect(result).toEqual(expected);
    })
    it('Should always return the same number in case test mode is set to constantNumber', () => {
        const dice = new DiceTestModeDecorator();
        dice.testingMode = TestModes.constantNumber;
        dice.nrThatDiceWillSelectInTestMode = 2;
        const hundretTestResults = range(100).map(() => dice.throwToMove(0).sum);
        const isEveryResult2 = hundretTestResults.every((result) => result === 2);
        expect(isEveryResult2).toBeTruthy();
    })
    it('Should always return sum of dots on dices needed to get to tax field when TestMode is set to TAX_FIELD', () => {
        const dice = new DiceTestModeDecorator();
        dice.testingMode = TestModes.taxField;
        dice.nrThatDiceWillSelectInTestMode = 2;
        const startPositions = [0, 10, 15, 39];
        const expectedSums = [38, 28, 23, 39];
        const results = startPositions.map((startFieldIndex) => dice.throwToMove(startFieldIndex).sum);
        expect(results).toEqual(expectedSums);
    })
    it('Should return 2 doublets of nrThatDiceWillSelectInTestMode when dice test mode is set to dubletTwice', () => {
        const dice = new DiceTestModeDecorator();
        dice.testingMode = TestModes.dubletTwice;
        dice.nrThatDiceWillSelectInTestMode = 2;
        const expected = {
            throws: [[2, 2], [2, 2]],
            sum: 8,
            doublets: 2,
        }
        const result = dice.throwToMove(9);
        expect(result).toEqual(expected);
    })

type tGetVisitAllFieldsFromListArgs = { startFromField: number, listToVisit: string[], nrOfMoves: number, dice: DiceTestModeDecorator, nrOfMove: number, result: number[]}

    const visitAllFieldsFromList = (args: tGetVisitAllFieldsFromListArgs) => {
        const {listToVisit, nrOfMoves, dice, nrOfMove, result, startFromField} = args;
        if (nrOfMove > nrOfMoves - 1) return args;
        const nextIndex = nrOfMove % listToVisit.length;
        const currentIndex = nextIndex === 0 ? listToVisit.length - 1 : nextIndex - 1
        const currentFieldIndex = nrOfMove === 0 ? startFromField : parseInt(listToVisit[currentIndex])
        const {sum} = dice.throwToMove(currentFieldIndex);
        result.push(sum);
        visitAllFieldsFromList({...args, nrOfMove: nrOfMove + 1})
        return args;

    } 

    it('Should visit all fields specified in a list of fields in given order when set to visitFieldsFromList', () => {
        const dice = new DiceTestModeDecorator();
        dice.testingMode = TestModes.visitFieldsFromList;
        const toVisit = ['13', '24', '33', '32'];
        dice.fieldsToVisit = toVisit;
        const expectedSums = [13, 11, 9, 39, 21];
        const { result } = visitAllFieldsFromList({
            listToVisit: dice.fieldsToVisit, nrOfMoves: 5, dice, nrOfMove: 0, result: [], startFromField: 0
        })
        expect(result).toEqual(expectedSums);
    })
    it('Should visit 3, 2, 4 felds if they are specified in visitFieldsFromList', () => {
        const dice = new DiceTestModeDecorator();
        dice.testingMode = TestModes.visitFieldsFromList;
        const toVisit = ['3', '2', '4'];
        dice.fieldsToVisit = toVisit;
        const expectedSums = [3, 39, 2, 39];
        const { result } = visitAllFieldsFromList({
            listToVisit: dice.fieldsToVisit, nrOfMoves: 4, dice, nrOfMove: 0, result: [], startFromField: 0
        })
        expect(result).toEqual(expectedSums);
    })
})

describe('Testing shouldPlayerLeaveJail functionality', () => {
    it('Should return true when in getAwayFromJailPass mode', () => {
        const dice = new DiceTestModeDecorator();
        dice.testingMode = TestModes.getGetAwayFromJailPass;
        const {result} = dice.shouldPlayerLeaveJail();
        expect(result).toBeTruthy()
    })
    it('Should return false when in getAwayFromJailPass mode', () => {
        const dice = new DiceTestModeDecorator();
        dice.testingMode = TestModes.getGetAwayFromJailFail;
        const {result} = dice.shouldPlayerLeaveJail();
        expect(result).toBeFalsy()
    })
    it('Should return true when not in test mode and dice result is a doublet', () => {
        const dice = new DiceTestModeDecorator();
        jest.spyOn(global.Math, 'random').mockReturnValue(1);
        dice.testingMode = TestModes.getGetAwayFromJailPass;
        const {result} = dice.shouldPlayerLeaveJail();
        jest.spyOn(global.Math, 'random').mockRestore();
        expect(result).toBeTruthy()
    })
    it('Sould return false when not in test mode and dice result is not a doublet', () => {
        MockRandom.reset();
        const r = MockRandom.random;
        jest.spyOn(global.Math, 'random').mockImplementation(r)
        const dice = new DiceTestModeDecorator();
        const {result} = dice.shouldPlayerLeaveJail();
        MockRandom.reset();
        jest.spyOn(global.Math, 'random').mockRestore();
        expect(result).toBeFalsy();

    })




})

