import { ATENY, BARCELONA, MADRIT, RED, SALONIKI, SEWILLA } from "../../../Data/const";
import { noHotelsInBankOutput } from "../../Tests/Journalist/getBuildingPermitsMocks_outputs";
import { tObject } from "../../types";
import { getSellingPermitsCategory } from "./getSellingPermits";
import { shortTestNotationToJsObject } from "./sellingPermitsShortNotation";


export const delta_0h1h = [
    {
        estateName: ATENY,
        props: {
            owner: RED,
            nrOfHouses: 1
        }
    },
    {
        estateName: SALONIKI,
        props: {
            owner: RED,
            nrOfHouses: 0
        }
    }
]

export const delta_4h_1H__L0h = [
    {
        estateName: ATENY,
        props: {
            owner: RED,
            nrOfHotels: 1
        }
    },
    {
        estateName: SALONIKI,
        props: {
            owner: RED,
            nrOfHouses: 4
        }
    }
]

export const o_0h_1h = {
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [{
        locationsAfterTransaction: [
            { cityName: SALONIKI, nrOfHouses: 0, nrOfHotels: 0 },
            { cityName: ATENY, nrOfHouses: 1, nrOfHotels: 0 },
        ],
        nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
    }],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 50 })]: [{
        locationsAfterTransaction: [
            { cityName: SALONIKI, nrOfHouses: 0, nrOfHotels: 0 },
            { cityName: ATENY, nrOfHouses: 0, nrOfHotels: 0 },
        ],
        nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 50
    }],
}

export const delta_1h_1h_0h = [
    {
        estateName: BARCELONA,
        props: {
            owner: RED, 
            nrOfHouses: 1
        }
    },
    {
        estateName: SEWILLA,
        props: {
            owner: RED,
            nrOfHouses: 1
        }
    },
    {
        estateName: MADRIT,
        props: {
            owner: RED,
            nrOfHouses: 0
        }
    }
]

export const delta_1H_4h_1H__L1h = [
    {
        estateName: BARCELONA,
        props: {
            owner: RED, 
            nrOfHotels: 1
        }
    },
    {
        estateName: SEWILLA,
        props: {
            owner: RED,
            nrOfHouses: 4
        }
    },
    {
        estateName: MADRIT,
        props: {
            owner: RED,
            nrOfHotels: 1
        }
    }
]

export const o_1h_1h_0h = {
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 100 })]: [
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 100
        },
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 100
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 2, price: 200 })]: [
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 2, price: 200
        },
    ],
}

export const delta_2h_3h = [
    {
        estateName: ATENY,
        props: {
            owner: RED,
            nrOfHouses: 3
        }
    },
    {
        estateName: SALONIKI,
        props: {
            owner: RED,
            nrOfHouses: 2
        }
    }
]


export const o_2h_3h = {
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [{
        locationsAfterTransaction: [
            { cityName: SALONIKI, nrOfHouses: 2, nrOfHotels: 0 },
            { cityName: ATENY, nrOfHouses: 3, nrOfHotels: 0 },
        ],
        nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
    }],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 50 })]: [
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 2, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 2, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 50
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 2, price: 100 })]: [
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 2, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 1, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 2, price: 100
        },
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 2, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 2, price: 100
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 3, price: 150 })]: [
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 1, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 3, price: 150
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 4, price: 200 })]: [
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 4, price: 200
        },
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 1, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 4, price: 200
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 5, price: 250 })]: [
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 5, price: 250
        },
    ],
}

export const delta_4h_4h_1H__L5h = [
    {
        estateName: BARCELONA,
        props: {
            owner: RED, 
            nrOfHouses: 4
        }
    },
    {
        estateName: SEWILLA,
        props: {
            owner: RED,
            nrOfHouses: 4
        }
    },
    {
        estateName: MADRIT,
        props: {
            owner: RED,
            nrOfHotels: 1
        }
    }
]

export const o_4h_4h_1H__L5h_ = {
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [{
        locationsAfterTransaction: [
            { cityName: BARCELONA, nrOfHouses: 4, nrOfHotels: 0 },
            { cityName: SEWILLA, nrOfHouses: 4, nrOfHotels: 0 },
            { cityName: MADRIT, nrOfHouses: 0, nrOfHotels: 1 },
        ],
        nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
    }],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 0, price: 100 })]: [{
        locationsAfterTransaction: [
            { cityName: BARCELONA, nrOfHouses: 4, nrOfHotels: 0 },
            { cityName: SEWILLA, nrOfHouses: 4, nrOfHotels: 0 },
            { cityName: MADRIT, nrOfHouses: 4, nrOfHotels: 0 },
        ],
        nrOfSoldHotels: 1, nrOfSoldHouses: 0, price: 100
    }],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 1, price: 200 })]: [
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 4, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 4, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 3, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 1, nrOfSoldHouses: 0, price: 200
        },
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 4, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 3, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 4, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 1, nrOfSoldHouses: 0, price: 200
        },
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 3, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 4, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 4, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 1, nrOfSoldHouses: 0, price: 200
        },

    ],

    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 2, price: 300 })]: [
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 4, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 4, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 3, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 1, nrOfSoldHouses: 0, price: 200
        },
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 4, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 3, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 4, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 1, nrOfSoldHouses: 0, price: 200
        },
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 3, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 4, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 4, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 1, nrOfSoldHouses: 0, price: 200
        },

    ],
}

type tCompressedDataEntry = { solution: string, price: number }
type tExpandedDataTuple = { cityName: string, nrOfHouses: number, nrOfHotels: number }

type tExpandedTestEntry = {
    locationsAfterTransaction: tExpandedDataTuple[],
    nrOfSoldHotels: number, nrOfSoldHouses: number, price: number,
}

type tExpandedTestData = tObject<tExpandedTestEntry[]>

type tCompressedTestData = tObject<tCompressedDataEntry[]>

type tExpandSingleTestDataEntryArgs = {
    dataEntry: tCompressedDataEntry,
    cityNames: string[], nrOfHousesInInput: number, 
    nrOfHotelsInInput: number, // hotelPrice: number, housePrice: number
}

const expandSingleTestDataEntry = (args: tExpandSingleTestDataEntryArgs): tExpandedTestEntry => {
    const {dataEntry, cityNames, nrOfHousesInInput, nrOfHotelsInInput, } = args;
    const {solution, price} = dataEntry;
    const { cities } = shortTestNotationToJsObject(solution);
    if (cities.length !== cityNames.length) throw new Error('Error in test data converison')
    const locationsAfterTransaction = cityNames.map((cityName: string, index: number) => {
        const nrOfHotels = cities[index].nrOfHotels || 0;
        const nrOfHouses = cities[index].nrOfHouses || 0;
        const result = { nrOfHotels, nrOfHouses , cityName }
        return result;
    })
    const nrOfHotels = locationsAfterTransaction.reduce((acc, {nrOfHotels}) => acc + (nrOfHotels || 0), 0)
    const nrOfSoldHotels = nrOfHotelsInInput - nrOfHotels;
    const nrOfHousesFromHotels = nrOfSoldHotels * 4;
    const baseNrOfHouses = nrOfHousesFromHotels + nrOfHousesInInput;
    const housesInCurrentSolution = locationsAfterTransaction.reduce((acc, {nrOfHouses}) => acc + (nrOfHouses || 0), 0)
    const nrOfSoldHouses = baseNrOfHouses - housesInCurrentSolution;

    if (nrOfSoldHouses < 0) {
        console.log('Sold houses < 0!!!', nrOfHousesInInput, nrOfSoldHouses, nrOfHotelsInInput, nrOfHotels)
        throw new Error('Sold houses < 0')
    }
    return {
        locationsAfterTransaction, nrOfSoldHotels, nrOfSoldHouses, price
    }
}

const getNothingSoldSolution = (testData: tCompressedTestData) => {
    const nothingSoldKey = getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 });
    const result = testData?.[nothingSoldKey]?.[0]?.solution;
    if (!result) { 
        console.log('Keys in testData are', Object.keys(testData))
        throw new Error(`Cannot find a nothingKey [${nothingSoldKey}] in test data`)
    }
    return result;
}

export const expandTestData = (testData: tCompressedTestData, cityNames: string[], stop=false): tExpandedTestData => {
    const entreis = Object.entries(testData);

    const result: tExpandedTestData = entreis.reduce((acc: tExpandedTestData, [key, compressedDataEntries]) => {
        const nothingSoldSolution = getNothingSoldSolution(testData);
        const {cities: initialCities} = shortTestNotationToJsObject(nothingSoldSolution)
        const nrOfHotelsInInput = initialCities.reduce((acc, {nrOfHotels}) => (acc + (nrOfHotels || 0)), 0)
        const nrOfHousesInInput = initialCities.reduce((acc, {nrOfHouses}) => (acc + (nrOfHouses || 0)), 0)
        if (!acc[key]) { acc[key] = [] }

        const expandedEntries = compressedDataEntries.map((compressedDataEntry) => {
            const result = expandSingleTestDataEntry({
                dataEntry: compressedDataEntry,
                cityNames, 
                nrOfHotelsInInput,
                nrOfHousesInInput,
            })
            return result;
        }) 
        acc[key] = [...acc[key], ...expandedEntries ]
        return acc;
    }, {})
    if (stop) debugger;
    return result;
}

const compressed_o_4h_4h_1H__L5h: tCompressedTestData = {
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [
        {solution: '4h_4h_1H' , price: 0}
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 0, price: 100 })]: [
        {solution: '4h_4h_4h', price: 100}
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 1, price: 200 })]: [
        {solution: '4h_4h_3h', price: 200},
        {solution: '4h_3h_4h', price: 200},
        {solution: '3h_4h_4h', price: 200}
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 2, price: 300 })]: [
        {solution: '4h_3h_3h', price: 300},
        {solution: '3h_4h_3h', price: 300},
        {solution: '3h_3h_4h', price: 300},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 3, price: 400 })]: [
        {solution: '3h_3h_3h', price: 400}
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 4, price: 500 })]: [
        {solution: '3h_3h_2h', price: 500},
        {solution: '3h_2h_3h', price: 500},
        {solution: '2h_3h_3h', price: 500},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 5, price: 600 })]: [
        {solution: '3h_2h_2h', price: 600},
        {solution: '2h_3h_2h', price: 600},
        {solution: '2h_2h_3h', price: 600},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 6, price: 700 })]: [
        {solution: '2h_2h_2h', price: 700},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 7, price: 800 })]: [
        {solution: '2h_2h_1h', price: 800},
        {solution: '2h_1h_2h', price: 800},
        {solution: '1h_2h_2h', price: 800},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 8, price: 900 })]: [
        {solution: '2h_1h_1h', price: 900},
        {solution: '1h_2h_1h', price: 900},
        {solution: '1h_1h_2h', price: 900},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 9, price: 1000 })]: [
        {solution: '1h_1h_1h', price: 1000},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 10, price: 1100 })]: [
        {solution: '1h_1h_0h', price: 1100},
        {solution: '1h_0h_1h', price: 1100},
        {solution: '0h_1h_1h', price: 1100},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 11, price: 1200 })]: [
        {solution: '1h_0h_0h', price: 1200},
        {solution: '0h_1h_0h', price: 1200},
        {solution: '0h_0h_1h', price: 1200},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 12, price: 1300 })]: [
        {solution: '0h_0h_0h', price: 1300},
    ],
}

const compressed_1H_4h_1H__L1h = {
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [
        {solution: '1H_4h_1H', price: 0},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 2, nrOfSoldHouses: 10, price: 1200 })]: [
        {solution: '1h_1h_0h', price: 1200},
        {solution: '0h_1h_1h', price: 1200},
    ],    
    [getSellingPermitsCategory({ nrOfSoldHotels: 2, nrOfSoldHouses: 11, price: 1300 })]: [
        {solution: '1h_0h_0h', price: 1300},
        {solution: '0h_1h_0h', price: 1300},
        {solution: '0h_0h_1h', price: 1300},
    ],    
    [getSellingPermitsCategory({ nrOfSoldHotels: 2, nrOfSoldHouses: 12, price: 1400 })]: [
        {solution: '0h_0h_0h', price: 1400},
    ],
}

export const expanded_o_1H_4h_1H__L1h = expandTestData(compressed_1H_4h_1H__L1h, [BARCELONA, SEWILLA, MADRIT])

export const o_4h_4h_1H__L5h_expanded = expandTestData(compressed_o_4h_4h_1H__L5h, [BARCELONA, SEWILLA, MADRIT])

const compressed_o_4h_4h_1H__L0H = compressed_o_4h_4h_1H__L5h

export const expanded_o_4h_4h_1H__L0H = expandTestData(compressed_o_4h_4h_1H__L0H, [BARCELONA, SEWILLA, MADRIT])

const compressed_o_4h_1H__L0h = {
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [
        // Problem when nr of houses limited and discard hotels + nr of houses satisfies limit
        {solution: '4h_1H', price: 0},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 7, price: 400 })]: [
        {solution: '1h_0h', price: 400},
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 1, nrOfSoldHouses: 8, price: 450 })]: [
        {solution: '0h_0h', price: 450},
    ],
}

export const expanded_o_4h_1H__L0h = expandTestData(compressed_o_4h_1H__L0h, [SALONIKI, ATENY]);
