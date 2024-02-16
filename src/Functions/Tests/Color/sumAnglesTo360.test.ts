import { sumAnglesUpTo360 } from "../../Color/Color"

const testCases = [
    {a: 10, b: 10, result: 20},
    {a: 20, b: -10, result: 10},
    {a: 20, b: -20, result: 0},
    {a: 180, b: 180, result: 0},
    {a: 360, b: 1, result: 1},
    {a: 0, b: -1, result: 359},
    {a: 180, b: 725, result: 185}
]

describe('Test summed angles are between 0 to 360', () => {
    testCases.forEach(({a, b, result}) => {
        it(`Should return ${result} when given [${a}] + [${b}]`, () => {
                const r = sumAnglesUpTo360(a, b);
                expect(r).toBe(result);
            })
        })
    })