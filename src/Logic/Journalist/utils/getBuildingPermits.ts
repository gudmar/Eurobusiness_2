import { CITY } from "../../../Data/const";
import { range } from "../../../Functions/createRange";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types"
import { sum } from "../../../Functions/sum";
import { Bank } from "../../Bank/Bank";
import { iCityFieldState, isCityFieldState, tFieldState } from "../../boardTypes";
import { Players } from "../../Players/Players";

export type tGetBuildingPermitsArgs = {
    gameState: tGameState,
    playerName: string,
    cityName: string,
}

export type tGetBuildingPermitsForNrOfBuildings = {
    gameState: tGameState,
    playerName: string,
    cityName: string,
    nrOfBuildings: number,
    response: tBuildingPermits,
    citiesFromSameCountry:tFieldState[]
}

type tReason = string;

const MAX_NR_OF_HOUSES_ON_FIELD = 4;

export type tBuildingRejection = { rjection: tReason };
export enum NrOfHouses {
    one = '1 house',
    two = '2 houses',
    three = '3 houses',
}
export enum NrOfHotels {
    one = '1 hotel', two = '2 hotels', three = '3 hotels'
}

export enum BuildingPermitRejected {
    notACity = 'Buildings may be build only in a city',
    plegded = 'Buildings may be created only on non plegded properties',
    ownsOnlyPart = 'Buildings may be created only when a player owns all cities in the country',
    soldOut = 'No more buildings are available',
    alreadyBuild = 'No more buildings may be created here',
    noHousesLeftInBank = 'No houses left in the bank',
    noHotelsLeftInBank = 'No hotels left in the bank',
    citiesNotBigEnough = 'Each city should have at least 4 houses or 1 hotel'
}

export type tHouseLocations = {
    locationOne?: string[], locationTwo?: string[], locationThree?: string[], cost: number,
}

export type tBuidlingApproved = {
    country?: string,
    reason?: tReason,
    permits?: {
        [NrOfHouses.one]: tHouseLocations[],
        [NrOfHouses.two]: tHouseLocations[]
        [NrOfHouses.three]: tHouseLocations[],
    }
}

// export type tPermitRejection = {rejection: tReason}

export type tBuildingPermits = tBuidlingApproved //| tPermitRejection;

const getAllFromSameCountry = (gameState: tGameState, cityName: string) => {
    const estate = gameState.boardFields.find(({name}) => name === cityName);
    if (!estate) return [];
    if ('country' in estate) {
        const searchedCountry = estate?.country;
        const result = gameState.boardFields.filter((estate) => {
            if ('country' in estate) {
                return estate.country === searchedCountry;
            }
            return false;
        })
        return result
    }
    return []
}

type tBuildEstateCOniditionFunction = (estate: tFieldState) => boolean;

const checkIfSome = (estates: tFieldState[], conditionFunction: tBuildEstateCOniditionFunction) => {
    const result = estates.some(conditionFunction);
    return result;
}

const checkIfEvery = (estates: tFieldState[], conditionFunction: tBuildEstateCOniditionFunction) => {
    const result = estates.every(conditionFunction);
    return result;
}

const isPlegdedConditionChecker = (estate: tFieldState) => {
    if ('isPlegded' in estate) {
        return estate.isPlegded
    }
    return false;
}
const getIsNotOwnedConditionChecker = (ownerColor: string) => (estate: tFieldState) => { 
    if ('owner' in estate) {
        return estate.owner !== ownerColor;
    }
    return false;
}
const isCityHasAHotelConditionChecker = (estate: tFieldState) => {
    if ('nrOfHotels' in estate) {
        return estate.nrOfHotels > 0
    }
    return false;
}

type tBuildingsCalculator = (args: tGetBuildingPermitsForNrOfBuildings) => tHouseLocations[];

const getHouseBalance = (citiesFromSameCountry: tFieldState[]): tHouseBalance => {
    const existingHouses = citiesFromSameCountry.map((city) => (city as iCityFieldState).nrOfHouses)
    const maxHouses = Math.max(...existingHouses);
    const minHouses = Math.min(...existingHouses);
    const nrOfMin = existingHouses.filter((nr) => nr === minHouses).length;
    const balance = maxHouses - minHouses;
    const isBalanced = balance === 0;
    return {
        maxHouses, minHouses, isBalanced, balance, existingHouses, nrOfMin, nrOfMax: existingHouses.length - nrOfMin
    }
}


const calculatePermitsForOneHouse = (args: tGetBuildingPermitsForNrOfBuildings): tHouseLocations[] => {
    const { citiesFromSameCountry, playerName, cityName, response} = args;
    const { minHouses } = getHouseBalance(citiesFromSameCountry)
    const result = citiesFromSameCountry.reduce((acc: tHouseLocations[], cityState) => {
        const city = cityState as iCityFieldState
        if (minHouses === city.nrOfHouses) {
            acc.push({locationOne: [city.name], cost: city.housePrice})
        }
        return acc;
    },[])
    return result
}

type tSingleNodesLinkArgs = {
    citiesFromSameCountry: iCityFieldState[],
    nodeIndex1: number, 
    nodeIndex2: number
}

const getSingleLinkTwoNodes = (hotelOrHouseKeyName: 'nrOfHotels' | 'nrOfHouses', hotelOrHousePrice: 'hotelPrice' | 'housePrice') => ({citiesFromSameCountry, nodeIndex1, nodeIndex2}: tSingleNodesLinkArgs) => {
    const names = citiesFromSameCountry.map(({name}) => name)
    const result = {locationOne: [names[nodeIndex1], names[nodeIndex2]], cost: citiesFromSameCountry[nodeIndex1][hotelOrHousePrice] + citiesFromSameCountry[nodeIndex2][hotelOrHousePrice]}
    return result
}

const getSingleLinkTwoNodesLinkForEveryNode = (hotelOrHouseKeyName: 'nrOfHotels' | 'nrOfHouses', hotelOrHousePrice: 'hotelPrice' | 'housePrice') => (citiesFromSameCountry: iCityFieldState[]): tHouseLocations[]  => {
    const getLinksFromNodeToAllNextNodes = (startNodeIndex: number) => {
        const result = citiesFromSameCountry.reduce((acc: tHouseLocations[], city, index): tHouseLocations[]  => {
            if (index <= startNodeIndex) return acc;
            const connection = getSingleLinkTwoNodes(hotelOrHouseKeyName, hotelOrHousePrice)({citiesFromSameCountry, nodeIndex1:startNodeIndex, nodeIndex2: index});
            acc.push(connection);
            return acc;
        }, [])
        return result
    }
    const result: tHouseLocations[] = citiesFromSameCountry.reduce((acc: tHouseLocations[], city, startIndex): tHouseLocations[] => {
        const result = getLinksFromNodeToAllNextNodes(startIndex)
        const nextAcc: tHouseLocations[] = [...acc, ...result]
        return nextAcc
    }, [])

    return result
}

const findIndexesOfFieldsWithCertainNumberOfHouses = (cities: iCityFieldState[], nrOfHouses: number) => {
    const result = cities.reduce((acc: number[], boardField, index) => {
        const city = boardField as iCityFieldState;
        if (city.nrOfHouses === nrOfHouses) acc.push(index);
        return acc;
    }, []);
    return result;
}

const calculatePermitsForTwoNotBalancedHouses = (citiesFromSameCountry: iCityFieldState[]) => {
    const result: tHouseLocations[] = [];
    const { minHouses, nrOfMin, nrOfMax } = getHouseBalance(citiesFromSameCountry)
    const indexesOfMin = findIndexesOfFieldsWithCertainNumberOfHouses(citiesFromSameCountry, minHouses)
    if (nrOfMin > nrOfMax) {
        const solutionFor2FieldsWithMinHouses = getSingleLinkTwoNodes('nrOfHouses', 'housePrice')({citiesFromSameCountry, nodeIndex1: indexesOfMin[0], nodeIndex2: indexesOfMin[1]});
        result.push(solutionFor2FieldsWithMinHouses)
    }
    const resultsForSingleMinHousesField = indexesOfMin.map((index) => {
        const {housePrice, name} = citiesFromSameCountry[index];
        const solution = {locationTwo: [name], cost: housePrice*2}
        return solution;
    })
    const resultWithAllOptions = [...result, ...resultsForSingleMinHousesField]
    return resultWithAllOptions;
}

const calculatePermitsForTwoHouses = (args: tGetBuildingPermitsForNrOfBuildings): tHouseLocations[] => {
    const { citiesFromSameCountry } = args;
    const { isBalanced } = getHouseBalance(citiesFromSameCountry)
    if (isBalanced) {
        const resultBalanced = getSingleLinkTwoNodesLinkForEveryNode('nrOfHouses', 'housePrice')(citiesFromSameCountry as iCityFieldState[]);
        return resultBalanced;
    }
    const result = calculatePermitsForTwoNotBalancedHouses(citiesFromSameCountry as iCityFieldState[])
    return result;
}

const calculatePermitsForThreeBalancedHouses = (cities: iCityFieldState[]) => {
    if (cities.length === 3) {
        const names = cities.map(({name}) => name);
        const cost = cities.reduce((sum, {housePrice}) => {
            const nextSum = sum + housePrice;
            return nextSum
        }, 0)
        const result = {locationOne: names, cost}
        return [result]
    }
    return [
        {locationOne: [cities[0].name], locationTwo: [cities[1].name], cost: cities[0].housePrice + 2*cities[1].housePrice},
        {locationOne: [cities[1].name], locationTwo: [cities[0].name], cost: 2*cities[0].housePrice + cities[1].housePrice},
    ]
}

const calculatePermitsForThreeHouses = (args: tGetBuildingPermitsForNrOfBuildings): tHouseLocations[] => {
    const { citiesFromSameCountry } = args;
    const cities = citiesFromSameCountry as iCityFieldState[]
    const { isBalanced, minHouses, nrOfMin, maxHouses } = getHouseBalance(citiesFromSameCountry)
    if (isBalanced) {
        const result = calculatePermitsForThreeBalancedHouses(citiesFromSameCountry as iCityFieldState[])
        return result;
    }
    const indexesOfFieldsWithMinHouses = findIndexesOfFieldsWithCertainNumberOfHouses(cities, minHouses)
    if (nrOfMin === 2) {
        const firstFieldWithMin = cities[indexesOfFieldsWithMinHouses[0]];
        const secondFieldWithMin = cities[indexesOfFieldsWithMinHouses[1]]
        const result = [
            {locationOne: [firstFieldWithMin.name], locationTwo: [secondFieldWithMin.name], cost: firstFieldWithMin.housePrice + 2*secondFieldWithMin.hotelPrice},
            {locationOne: [secondFieldWithMin.name], locationTwo: [firstFieldWithMin.name], cost: 2*firstFieldWithMin.housePrice + secondFieldWithMin.hotelPrice},
        ];
        return result;
    }
    const indexesOfFieldsWithMaxHouses = findIndexesOfFieldsWithCertainNumberOfHouses(cities, maxHouses);
    if (cities.length === 2) {
        const cityWithMinNrOfHouses = cities[indexesOfFieldsWithMinHouses[0]];
        const cityWithMaxNrOfHouses = cities[indexesOfFieldsWithMaxHouses[0]];
        const result = [
            { locationOne: [cityWithMaxNrOfHouses.name], locationTwo: [cityWithMinNrOfHouses.name], cost: 2*cityWithMinNrOfHouses.housePrice + cityWithMaxNrOfHouses.housePrice },
        ]
        return result;
    }
    const cityWithMinNrOfHouses = cities[indexesOfFieldsWithMinHouses[0]];
    const firstCityWithMaxNrHouses = cities[indexesOfFieldsWithMaxHouses[0]];
    const secondCityWithMaxNrHouses = cities[indexesOfFieldsWithMaxHouses[1]];
    const result = [
        {locationOne: [cityWithMinNrOfHouses.name, firstCityWithMaxNrHouses.name, secondCityWithMaxNrHouses.name], cost: cityWithMinNrOfHouses.housePrice + firstCityWithMaxNrHouses.housePrice + secondCityWithMaxNrHouses.housePrice},
        {locationOne: [firstCityWithMaxNrHouses.name], locationTwo: [cityWithMinNrOfHouses.name], cost: cityWithMinNrOfHouses.housePrice * 2 + firstCityWithMaxNrHouses.housePrice},
        {locationOne: [secondCityWithMaxNrHouses.name], locationTwo: [cityWithMinNrOfHouses.name], cost: cityWithMinNrOfHouses.housePrice * 2 + secondCityWithMaxNrHouses.housePrice},
    ]
    return result;

    // 01  +21
    // 001 +111 +210 +120
    // 011 +111 +210 +201
}

type tCalculatorMap = {
    [key: string]: tBuildingsCalculator;
}

const MAP_NR_OF_BUILDINGS_TO_CALCULATOR: tCalculatorMap = {
    '1': calculatePermitsForOneHouse,
    '2': calculatePermitsForTwoHouses,
    '3': calculatePermitsForThreeHouses,
}

type tHouseBalance = {
    maxHouses: number, minHouses: number, isBalanced: boolean, balance: number, existingHouses: number[], nrOfMin: number, nrOfMax: number,
}

const calculatePermitsForHouses = (args: tGetBuildingPermitsForNrOfBuildings): tHouseLocations[] => {
    const { gameState, citiesFromSameCountry, playerName, cityName, nrOfBuildings, response} = args;
    if (Bank.nrOfHouses < nrOfBuildings) return []
    const existingHotels = citiesFromSameCountry.map((city) => (city as iCityFieldState).nrOfHotels)
    const { existingHouses } = getHouseBalance(citiesFromSameCountry);
    if (existingHotels.some((nr) => nr > 0)) return []
    if (existingHouses.every((nr) => nr === MAX_NR_OF_HOUSES_ON_FIELD)) return []
    const permitCalculator = MAP_NR_OF_BUILDINGS_TO_CALCULATOR[`${nrOfBuildings}`];
    const result = permitCalculator(args);
    return result;
}

const calculatePermitsForHousesWithRejectionApply = (args: tGetBuildingPermitsForNrOfBuildings): tBuidlingApproved => {
    const { nrOfBuildings, response, citiesFromSameCountry} = args;
    const nrOfHousesInBank = Bank.nrOfHouses;
    const result = calculatePermitsForHouses(args);
    if (result.length > 0 && nrOfHousesInBank > nrOfBuildings) {
        if (nrOfBuildings === 1) {
            const nextResponse = {...response, [NrOfHouses.one]: result};
            return nextResponse;
        }
        if (nrOfBuildings === 2) {
            const nextResponse = {...response, [NrOfHouses.two]: result};
            return nextResponse;
        }
        if (nrOfBuildings === 3) {
            const nextResponse = {...response, [NrOfHouses.three]: result};
            return nextResponse;
        }
    }
    return response;
}

const calculatePermitsForHotelsWithRejectionApply = (args: tGetBuildingPermitsForNrOfBuildings): tBuidlingApproved => {
    const { nrOfBuildings, response, citiesFromSameCountry} = args;
    const cities = citiesFromSameCountry as iCityFieldState[];
    const nrOfHotelsInBank = Bank.nrOfHotels;
    
    const citiesBigEnough = cities.every(({nrOfHouses, nrOfHotels}) => {
        const result = (nrOfHouses === MAX_NR_OF_HOUSES_ON_FIELD) || (nrOfHotels === 1);
        return result
    });
    const citiesTooBig = cities.every(({nrOfHotels}) => nrOfHotels === 1);
    const result = calculatePermitsForHotels(args);
    if (result.length > 0) {
        if ((result.length) > nrOfHotelsInBank) {
            response.reason = BuildingPermitRejected.noHousesLeftInBank;
            return response;
        }
        if (!citiesBigEnough) {
            response.reason = BuildingPermitRejected.citiesNotBigEnough;
            return response
        }
        if (citiesTooBig) {
            response.reason = BuildingPermitRejected.alreadyBuild;
            return response
        }
        if (nrOfBuildings === 1 && nrOfHotelsInBank >= 1) {
            const nextResponse = {...response, [NrOfHotels.one]: result};
            return nextResponse;
        }
        if (nrOfBuildings === 2 && nrOfHotelsInBank >= 2) {
            const nextResponse = {...response, [NrOfHotels.two]: result};
            return nextResponse;
        }
        if (nrOfBuildings === 3 && nrOfHotelsInBank >= 3) {
            const nextResponse = {...response, [NrOfHotels.two]: result};
            return nextResponse;
        }
    }
    return response;
}

const calculatePermitsForHotels = (args: tGetBuildingPermitsForNrOfBuildings): tHouseLocations[] => {
    const { gameState, playerName, cityName, nrOfBuildings, response, citiesFromSameCountry } = args;
    const cities = citiesFromSameCountry as iCityFieldState[];
    const { isBalanced, minHouses, nrOfMin, maxHouses } = getHouseBalance(citiesFromSameCountry)
    const possibleLocations = cities.filter(({nrOfHouses}) => nrOfHouses === MAX_NR_OF_HOUSES_ON_FIELD);
    if (nrOfBuildings === 1){
        const result = possibleLocations.map(({name, hotelPrice}) => ({locationOne: [name], cost: hotelPrice}));
        return result
    }
    if (nrOfBuildings === 2 && possibleLocations.length > 1){
        if (isBalanced && cities.length === 3) {
            const resultBalanced = getSingleLinkTwoNodesLinkForEveryNode('nrOfHotels', 'hotelPrice')(citiesFromSameCountry as iCityFieldState[]);
            return resultBalanced;    
        }
        const citiesWithHouses = cities.filter(({nrOfHouses}) => nrOfHouses === MAX_NR_OF_HOUSES_ON_FIELD)
        return (
            [
                { locationOne: citiesWithHouses.map(({name}) => name), cost: sum(citiesWithHouses.map(({hotelPrice}) => hotelPrice)) }
            ]            
        )
    }
    if (nrOfBuildings === 3 && possibleLocations.length > 2){
        return [
            { locationOne: cities.map(({name}) => name), cost: sum(cities.map(({hotelPrice}) => hotelPrice)) }
        ]
    }
    return []
}


export const getBuildingPermits = (args: tGetBuildingPermitsArgs) => {
    const MAX_NR_OF_BUILDINGS = 3;
    const {gameState, playerName, cityName} = args;
    const playerColor = Players.playerNameToPlayerColor(playerName);
    const nrOfHousesInBank = Bank.nrOfHouses;
    const nrOfHotelsInBank = Bank.nrOfHotels;
    const estate = gameState.boardFields.find(({name}) => name === cityName)
    if (!estate) throw new Error(`No estate named ${cityName}`)
    if (estate.type !== CITY) {
        return {reason: BuildingPermitRejected.notACity}
    }
    const citiesFromSameCountry = getAllFromSameCountry(gameState, cityName);
    if (checkIfSome(citiesFromSameCountry, isPlegdedConditionChecker)) { return { reason: BuildingPermitRejected.plegded }}
    if (checkIfSome(citiesFromSameCountry, getIsNotOwnedConditionChecker(playerColor))) { return { reason: BuildingPermitRejected.ownsOnlyPart }}
    if (checkIfEvery(citiesFromSameCountry, isCityHasAHotelConditionChecker)) { return { reason: BuildingPermitRejected.alreadyBuild}}
    const response: tBuidlingApproved = {}
    const rangeMaxBuildings = range(1, MAX_NR_OF_BUILDINGS);
    const permits = rangeMaxBuildings.reduce((acc, index) => {
        const resultWithHouse = calculatePermitsForHousesWithRejectionApply({...args, citiesFromSameCountry, nrOfBuildings: index, response: acc})
        const resultWithHotel = calculatePermitsForHotelsWithRejectionApply({...args, citiesFromSameCountry, nrOfBuildings: index, response: resultWithHouse})
        return resultWithHotel
    }, {})
    const result = {
        country: (citiesFromSameCountry as iCityFieldState[])[0].country,
        permits,
    }
    return result;
}
