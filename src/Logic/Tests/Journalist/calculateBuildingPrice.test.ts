import { calculatePrice } from "../../Journalist/utils/getSellingPermits";
import { shortTestNotationToJsObject, tTestInputNotation, tTestCityInputNotation } from "../../Journalist/utils/sellingPermitsShortNotation"
import { tNrOfBuildings } from "../../Journalist/utils/types";


type tShortNotation = string;
type tGetCitiesArgs = {
    nrOfBuildings: tShortNotation,
    housePrices: number[],
    hotelPrices: number[]
}
type tGetCityArgs = {
    buildingsInCity: tTestCityInputNotation, hotelPrice: number, housePrice: number, index: number,
}

const OWNER = 'Zygfryd'
const CITY_1 = 'Zakopane';
const CITY_2 = 'Glogow';
const CITY_3 = 'Bystrzyca';
const CITY_4 = 'Sanok';

const CITIES = [CITY_1, CITY_2, CITY_3, CITY_4];

const getCity = ({ buildingsInCity, hotelPrice, housePrice, index }: tGetCityArgs) => {
    const result = ({
        owner: OWNER,
        nrOfHouses: buildingsInCity.nrOfHouses || 0,
        nrOfHotels: buildingsInCity.nrOfHotels || 0,
        housePrice,
        hotelPrice,
        name: CITIES[index > CITIES.length - 1 ? CITIES.length - 1 : index]
    })
    return result;
}

const getCities = ({nrOfBuildings, housePrices, hotelPrices}: tGetCitiesArgs) => {
    const expandedNotation: tTestInputNotation = shortTestNotationToJsObject(nrOfBuildings);
    const cities: tTestCityInputNotation[] = expandedNotation.cities;
    if (nrOfBuildings.length !== hotelPrices.length && hotelPrices.length !== housePrices.length) {throw new Error('getCiteis, citeis, hotels and houses arrays should have equal length')}
    const result = cities.map((city, index) => getCity({
        buildingsInCity: city, hotelPrice: hotelPrices[index], housePrice: housePrices[index], index
    }))
    return result;
}

type tTestCase = {
    initialLocationsCompressed: string,
    permitLocationsCompressed: string,
    housePrices: number[],
    hotelPrices: number[],
    expectedPrice: number,
    description: string,
}

const testCases = [
    {
        initialLocationsCompressed: '0h_0h_0h',
        permitLocationsCompressed: '0h_0h_0h',
        housePrices: [100, 200, 300],
        hotelPrices: [10, 20, 30],
        expectedPrice: 0,
        description: 'Should return 0 when given permit locations is 0'
    },
    {
        initialLocationsCompressed: '1h_2h_3h',
        permitLocationsCompressed: '1h_2h_3h',
        housePrices: [100, 200, 300],
        hotelPrices: [10, 20, 30],
        expectedPrice: 0,
        description: 'Should return 0 when no hotels are given and nr of initial location houses is the same as in permit'
    },
    {
        initialLocationsCompressed: '1h_2h_3h',
        permitLocationsCompressed: '1h_2h_2h',
        housePrices: [100, 200, 300],
        hotelPrices: [10, 20, 30],
        expectedPrice: 150,
        description: 'Should return a 1/2 house price when last city in permit has less houses by 1 then initial houses'
    },
    {
        initialLocationsCompressed: '1h_2h_2h',
        permitLocationsCompressed: '1h_0h_2h',
        housePrices: [100, 200, 300],
        hotelPrices: [10, 20, 30],
        expectedPrice: 200,
        description: 'Should return a 1 house price when middle city in permit has less houses by 2 then initial houses'
    },
    {
        initialLocationsCompressed: '1h_2h_2h',
        permitLocationsCompressed: '0h_0h_1h',
        housePrices: [100, 200, 300],
        hotelPrices: [10, 20, 30],
        expectedPrice: 400,
        description: 'Should properly count price of houses when there are no hotels'
    },
    {
        initialLocationsCompressed: '1h_2h_1H',
        permitLocationsCompressed: '1h_2h_4h',
        housePrices: [100, 200, 300],
        hotelPrices: [10, 20, 30],
        expectedPrice: 15,
        description: 'Should return half of hotel price when given initial locations has 1 hotel more then permits'
    },
    {
        initialLocationsCompressed: '1H_1H_1H',
        permitLocationsCompressed: '4h_4h_4h',
        housePrices: [100, 200, 300],
        hotelPrices: [10, 20, 30],
        expectedPrice: 30,
        description: 'Should return sum of half hotel prices when each city is reduced from a hotel to 4 houses'
    },
    {
        initialLocationsCompressed: '1H_1H_1H',
        permitLocationsCompressed: '3h_4h_4h',
        housePrices: [100, 200, 300],
        hotelPrices: [10, 20, 30],
        expectedPrice: 80,
        description: 'Should return half of sum of hotels and half of a price of house in 1st city when given initial locations has hotels, and permits has all possible houses execpt for 1 city, where is only a single house'
    },
    {
        initialLocationsCompressed: '1H_1H_1H',
        permitLocationsCompressed: '3h_2h_2h',
        housePrices: [100, 200, 300],
        hotelPrices: [10, 20, 30],
        expectedPrice: 580,
        description: 'Should calculate price correctly when reduced hotels and houses in each city'
    },
    {
        initialLocationsCompressed: '1H_1H_1H',
        permitLocationsCompressed: '0h_0h_0h',
        housePrices: [100, 200, 300],
        hotelPrices: [10, 20, 30],
        expectedPrice: 1230,
        description: 'Should calculate price correctly when reduced from hotels to no buildings'
    },

]

const notNullShortNotationConverter = (compressed: string): tNrOfBuildings[] => {
    const expanded = shortTestNotationToJsObject(compressed).cities;
    const notNull = expanded.map((item) => {
        const cp = {
            ...item,
            nrOfHouses: item.nrOfHouses || 0,
            nrOfHotels: item.nrOfHotels || 0,
        }
        return cp;
    })
    return notNull;
}

describe('Cacluate building price for getSellingPermigs', () => {
    testCases.forEach((args: tTestCase) => {
        const {
            initialLocationsCompressed,
            permitLocationsCompressed,
            housePrices,
            hotelPrices,
            expectedPrice,
            description
        } = args;
        const cities = getCities({
            nrOfBuildings: initialLocationsCompressed,
            housePrices, hotelPrices
        });
        const permit = notNullShortNotationConverter(permitLocationsCompressed);
        const initialLocation = notNullShortNotationConverter(initialLocationsCompressed);
        const result = calculatePrice(cities, permit, initialLocation);
        it(description, () => {
            expect(result).toBe(expectedPrice);
        })
    })
})
