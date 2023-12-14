import { range } from "../createRange";
import { shuffle } from "../shuffle";
import { mockMathRandom, zeroRandomGenerator } from "../testUtils";

describe('Testing shuffle array of items', () => {
    it('Should put each element of an array to the first element of the new array (invert the array) when math.random is mocked to return always 0', () => {
        const arr = range(5);
        const result = mockMathRandom(zeroRandomGenerator, () => {
            const shuffledArray = shuffle(arr);
            return shuffledArray;
        })
        const expected = [5,4,3,2,1,0];
        expect(result).toEqual(expected)
    })
})