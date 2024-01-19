import { DiceTestModeDecorator } from "./Dice";
import { TestModes } from "./types";

const START_INDEX = 1;

const testData = [
    {
        expected: 2,
        currentPlayerPosition: START_INDEX,
        testMode: TestModes.chanceFields
    },
    {
        expected: 2,
        currentPlayerPosition: 17,
        testMode: TestModes.cityFields
    },
    {
        expected: 10,
        currentPlayerPosition: 36,
        testMode: TestModes.railways
    },

]

describe('Testing Dice wrapper, to be sure dice result is calculated properly', () => {
    beforeAll(() => {
        new DiceTestModeDecorator()
    })    
    it('Should return 2 if player is on start field and is in CHANCE test mode', () => {
        const {expected, currentPlayerPosition, testMode} = testData[0];
        const diceDecorator: DiceTestModeDecorator = new DiceTestModeDecorator();
        diceDecorator.testingMode = testMode;
        const { sum } = diceDecorator.throwToMove(currentPlayerPosition);
        expect(sum).toBe(expected);
    })
    it('Should return 2 if player is on 17 field and CITY_FIELD test mode is activated', () => {
        const {expected, currentPlayerPosition, testMode} = testData[1];
        const diceDecorator: DiceTestModeDecorator = new DiceTestModeDecorator();
        diceDecorator.testingMode = testMode;
        const { sum } = diceDecorator.throwToMove(currentPlayerPosition);
        expect(sum).toBe(expected);
    })
    it('Should return 10 if player is on field 36 and is in RAILWAYS test mode', ()=>{
        const {expected, currentPlayerPosition, testMode} = testData[2];
        const diceDecorator: DiceTestModeDecorator = new DiceTestModeDecorator();
        diceDecorator.testingMode = testMode;
        const { sum } = diceDecorator.throwToMove(currentPlayerPosition);
        expect(sum).toBe(expected);
    })
})