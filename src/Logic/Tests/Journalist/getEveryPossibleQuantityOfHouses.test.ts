import { NrOfHouses } from "../../Journalist/utils/getBuildingPermits";
import { getAllFeasableBuildingLocations, getAllFeasableHouseLocations, getEveryPossibleQuantityOfHouses } from "../../Journalist/utils/getEveryPossibleQuantityOfHouses";
import { shortTestNotationToJsObject, tTestCityInputNotation } from "../../Journalist/utils/sellingPermitsShortNotation"

describe('Testing every possible quantity of houses', () => {
    describe('Single array', () => {
        it('Should return the same array when received a single 0 locations', () => {
            const input = [0];
            const expected = [[0]]
            const result = getEveryPossibleQuantityOfHouses(input);
            expect(result).toEqual(expected);
        })
        it('Should decrement array element until reaches 0', () => {
            const input = [4];
            const expected = [[4], [3], [2], [1], [0]]
            const result = getEveryPossibleQuantityOfHouses(input);
            console.log('RESULT', result)
            expect(result).toEqual(expected);
        })
    })
    describe('Double array', () => {
        const testCases = [
            {
                input: [0, 0],
                expected: [
                    [0, 0]
                ],
                description: 'Should return the same array when received zeros'
            },
            {
                input: [2, 0],
                expected: [
                    [2, 0],
                    [1, 0],
                    [0, 0],
                ],
                description: 'Should return decreasing arrays when first field has more houses, and last 0'
            },
            {
                input: [0, 3],
                expected: [
                    [0, 3],
                    [0, 2],
                    [0, 1],
                    [0, 0],
                ],
                description: 'Should return decreasing arrays when last field has more houses, and first 0'
            },
            {
                input: [2, 2],
                expected: [
                    [2, 2],
                    [2, 1],
                    [2, 0],
                    [1, 2],
                    [1, 1],
                    [1, 0],
                    [0, 2],
                    [0, 1],
                    [0, 0],
                ],
                description: 'Should return all decreased possiblities when given array of 2 non zero numbers'
            },
            {
                input: [0, 0, 1],
                expected: [
                    [0, 0, 1],
                    [0, 0, 0]
                ],
                description: 'Should return only 2 solutions when a single house is on last field'
            },
            {
                input: [0, 1, 0],
                expected: [
                    [0, 1, 0],
                    [0, 0, 0]
                ],
                description: 'Should return only 2 solutions when a single house is on middle field'
            },
            {
                input: [1, 0, 0],
                expected: [
                    [1, 0, 0],
                    [0, 0, 0]
                ],
                description: 'Should return only 2 solutions when a single house is on first field'
            },
            {
                input: [4, 3, 2],
                expected: [
                    [4, 3, 2],
                    [4, 3, 1],
                    [4, 3, 0],
                    [4, 2, 2],
                    [4, 2, 1],
                    [4, 2, 0],
                    [4, 1, 2],
                    [4, 1, 1],
                    [4, 1, 0],
                    [4, 0, 2],
                    [4, 0, 1],
                    [4, 0, 0],
                    [3, 3, 2],
                    [3, 3, 1],
                    [3, 3, 0],
                    [3, 2, 2],
                    [3, 2, 1],
                    [3, 2, 0],
                    [3, 1, 2],
                    [3, 1, 1],
                    [3, 1, 0],
                    [3, 0, 2],
                    [3, 0, 1],
                    [3, 0, 0],
                    [2, 3, 2],
                    [2, 3, 1],
                    [2, 3, 0],
                    [2, 2, 2],
                    [2, 2, 1],
                    [2, 2, 0],
                    [2, 1, 2],
                    [2, 1, 1],
                    [2, 1, 0],
                    [2, 0, 2],
                    [2, 0, 1],
                    [2, 0, 0],
                    [1, 3, 2],
                    [1, 3, 1],
                    [1, 3, 0],
                    [1, 2, 2],
                    [1, 2, 1],
                    [1, 2, 0],
                    [1, 1, 2],
                    [1, 1, 1],
                    [1, 1, 0],
                    [1, 0, 2],
                    [1, 0, 1],
                    [1, 0, 0],
                    [0, 3, 2],
                    [0, 3, 1],
                    [0, 3, 0],
                    [0, 2, 2],
                    [0, 2, 1],
                    [0, 2, 0],
                    [0, 1, 2],
                    [0, 1, 1],
                    [0, 1, 0],
                    [0, 0, 2],
                    [0, 0, 1],
                    [0, 0, 0],
                ],
                description: 'Should correctly list all possible not filtered house combinations for 3 fields'
            }
        ]
        testCases.forEach(({input, expected, description}) => {
            it(description, () => {
                const result = getEveryPossibleQuantityOfHouses(input);
                console.log('Result', result)
                expect(result).toEqual(expected)
            })
        })
    }),
    describe('Testing filtering of house locations to only feasable ones', () => {
        const testCases = [
            {
                input: [4, 3, 2],
                expected: [
                    [3, 3, 2],
                    [3, 2, 2],
                    [2, 3, 2],
                    [2, 2, 2],
                    [2, 2, 1],
                    [2, 1, 2],
                    [2, 1, 1],
                    [1, 2, 2],
                    [1, 2, 1],
                    [1, 1, 2],
                    [1, 1, 1],
                    [1, 1, 0],
                    [1, 0, 1],
                    [1, 0, 0],
                    [0, 1, 1],
                    [0, 1, 0],
                    [0, 0, 1],
                    [0, 0, 0],
                ],
                description: 'Should return only feasable house combinations when given 3 fields'
            }
        ]
        testCases.forEach(({input, expected, description}) => {
            it(description, () => {
                const result = getAllFeasableHouseLocations(input);
                expect(result).toEqual(expected)
            })
        })
    }),
    describe('Testing getAllFeasableBuildingLocations', () => {
        const testCases = [
            {
                input: '2h_2h',
                expected: [
                    '2h_2h',
                    `2h_1h`,
                    '1h_2h',
                    '1h_1h',
                    '1h_0h',
                    '0h_1h',
                    '0h_0h'
                ],
                description: 'Should process when given 2h_2h'
            },
            {
                input: '1H_4h',
                expected: [
                    '1H_4h',
                    '4h_4h',
                    '4h_3h',
                    '3h_4h',
                    '3h_3h',
                    '3h_2h',
                    '2h_3h',
                    '2h_2h',
                    '2h_1h',
                    '1h_2h',
                    '1h_1h',
                    '1h_0h',
                    '0h_1h',
                    '0h_0h',
                ],
                description: 'Should process when given a single hotel and 2 fields'
            },
            {
                input: '1H_4h_1H',
                expected: [
                    '1H_4h_1H',
                    '1H_4h_4h',
                    '4h_4h_1H',
                    '4h_4h_4h',
                    '4h_4h_3h',
                    '4h_3h_4h',
                    '4h_3h_3h',
                    '3h_4h_4h',
                    '3h_4h_3h',
                    '3h_3h_4h',
                    '3h_3h_3h',
                    '3h_3h_2h',
                    '3h_2h_3h',
                    '3h_2h_2h',
                    '2h_3h_3h',
                    '2h_3h_2h',
                    '2h_2h_3h',
                    '2h_2h_2h',
                    '2h_2h_1h',
                    '2h_1h_2h',
                    '2h_1h_1h',
                    '1h_2h_2h',
                    '1h_2h_1h',
                    '1h_1h_2h',
                    '1h_1h_1h',
                    '1h_1h_0h',
                    '1h_0h_1h',
                    '1h_0h_0h',
                    '0h_1h_1h',
                    '0h_1h_0h',
                    '0h_0h_1h',
                    '0h_0h_0h',
                ],
                description: 'Should process when given a single hotel and 2 fields'
            },

            {
                input: '1H_4h_1H__L4h',
                expected: [
                    '1H_4h_1H',
                    '1H_4h_4h',
                    '4h_4h_1H',
                    '3h_3h_2h',
                    '3h_2h_3h',
                    '3h_2h_2h',
                    '2h_3h_3h',
                    '2h_3h_2h',
                    '2h_2h_3h',
                    '2h_2h_2h',
                    '2h_2h_1h',
                    '2h_1h_2h',
                    '2h_1h_1h',
                    '1h_2h_2h',
                    '1h_2h_1h',
                    '1h_1h_2h',
                    '1h_1h_1h',
                    '1h_1h_0h',
                    '1h_0h_1h',
                    '1h_0h_0h',
                    '0h_1h_1h',
                    '0h_1h_0h',
                    '0h_0h_1h',
                    '0h_0h_0h',
                ],
                description: 'Should filter out solutions that would use too many houses, when nr of houses in bank is limited to 4'
            },
        ]

        const citiesToNotNullCities = (cities: tTestCityInputNotation[]) => {
            const result = cities.map(({nrOfHouses, nrOfHotels}: tTestCityInputNotation) => ({
                nrOfHouses: nrOfHouses ? nrOfHouses : 0,
                nrOfHotels: nrOfHotels ? nrOfHotels : 0,
            }));
            return result;
        }
        const bankToNotNullBank = (bank: tTestCityInputNotation) => ({
                nrOfHouses: bank.nrOfHouses ?? 0,
                nrOfHotels: bank.nrOfHotels ?? 0,
        })

        testCases.forEach(({input, expected, description}) => {
            it(description, () => {
                const {cities, bank} = shortTestNotationToJsObject(input)
                const notNullCiteis = citiesToNotNullCities(cities);
                const notNullBank = bankToNotNullBank(bank);
                const decompressedExpected = expected.map((value) => {
                    const { cities } = shortTestNotationToJsObject(value);
                    const notNullCiteis = citiesToNotNullCities(cities);
                    return notNullCiteis
                })

                const result = getAllFeasableBuildingLocations(notNullCiteis, notNullBank);
                // console.log('Result,', result)
                expect(result).toEqual(decompressedExpected);
            })
        })
    })
})