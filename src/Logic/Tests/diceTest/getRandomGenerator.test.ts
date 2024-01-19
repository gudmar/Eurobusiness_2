import { getRandomGenerator } from "../../Dice/Dice"

describe('Testing getRandomGenerator', () => {
    describe('Min value of dice', () => {
        beforeEach(() => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0)
        })
        afterEach(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        })
        it('Should return 1 when min value is randomly selected', () => {
            const testedFunction = getRandomGenerator(1, 6);
            const randomlySelected = testedFunction();
            expect(randomlySelected).toBe(1);
        })
    })
    describe('Max value of dice', () => {
        beforeEach(() => {
            jest.spyOn(global.Math, 'random').mockReturnValue(1);
        });
        afterEach(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        })
        it('Should return 6 when max value is randomlySelected', () => {
            const  testedFunction = getRandomGenerator(1, 6);
            const randomlySelected = testedFunction();
            expect(randomlySelected).toBe(6)
        })
    })
})