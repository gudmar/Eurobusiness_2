import { MAX_NR_OF_HOUSES_TO_PURCHASE_IN_ONE_ROW } from "../../../Constants/constants";
import { tBuildingLocations, tNrOfBuildings, tPossibleHouseSolutions } from "./types";

const getDecreasedSolution = (solution: number[], index: number) => {
    const solutionCopy = [...solution];
    solutionCopy[index] = solutionCopy[index] - 1;
    return solutionCopy
}

const isEnd = (solution: number []) => solution.every((value) => value === 0);
const lastIndex = (solution: number[]) => solution.length - 1
const getSolutionWithSwitchedNumberAtIndex = (solution: number[], index: number, newNumber: number) => {
    const copy = [...solution];
    copy[index] = newNumber;
    return copy;
}

const decreaseNextFields = (initialSolution: number[], currentSolution: number[], index: number): number[] => {
    if (index < 0) return currentSolution;
    if (currentSolution[index] > 0) {
        const next = getDecreasedSolution(currentSolution, index);
        return next;
    } else {
        const nextNumberOnIndex = initialSolution[index];
        const solutionWithNumberAtIndexChanged = getSolutionWithSwitchedNumberAtIndex(currentSolution, index, nextNumberOnIndex);
        const nextSolution = decreaseNextFields(initialSolution, solutionWithNumberAtIndexChanged, index - 1)
        return nextSolution;
    }
}

const getNextSolution = (initialSolution: number[], currentSolution: number[]) => {
    if (isEnd(currentSolution)) return currentSolution;
    const nextSolution = decreaseNextFields(initialSolution, currentSolution, lastIndex(currentSolution))
    return nextSolution;

}

const getSolutionsRecursivly = (initialSolution: number[], currentSolution: number[], solutions: number[][]): tPossibleHouseSolutions => {
    if (isEnd(currentSolution)) return solutions;
    const nextSolution = getNextSolution(initialSolution, currentSolution);
    solutions.push(nextSolution);
    const result = getSolutionsRecursivly(initialSolution, nextSolution, solutions)
    return result
}

const getSolutions = (initialSolution: number[]) => {
    const solutions = getSolutionsRecursivly(initialSolution, initialSolution, [initialSolution]);
    return solutions;
}

export const getEveryPossibleQuantityOfHouses = (initialHouseLocations: number[]) => {
    const solutions = getSolutions(initialHouseLocations);
    return solutions;
}

export const getAllFeasableHouseLocations = (initialHouseLocations: number[]) => {
    const allSolutions = getEveryPossibleQuantityOfHouses(initialHouseLocations);
    const ACCEPTABLE_HOUSE_QUANTITY_DIFFERENCE_BETWEEN_FIELDS = 1;
    const onlyFeasableLocations = allSolutions.filter((location) => {
        const max = Math.max(...location);
        const min = Math.min(...location);
        const delta = max - min;
        return delta <= ACCEPTABLE_HOUSE_QUANTITY_DIFFERENCE_BETWEEN_FIELDS;
    })
    return onlyFeasableLocations;
}

type tArrayNotation = { houses: number[], hotels: number[] }

const getHouseAndHotelLocationsInArrayNotation = (arrNotation: tBuildingLocations): tArrayNotation => {
    const houses = arrNotation.map(({nrOfHouses}) => nrOfHouses);
    const hotels = arrNotation.map(({nrOfHotels}) => nrOfHotels);
    return {houses, hotels}
}

const arrNotationToVerboseNotation = ({houses, hotels}: tArrayNotation) => {
    if (hotels.length !== houses.length) throw new Error('Houses and hotels should be equally long')
    const result = houses.map((nrOfHouses, index) => {
        const nrOfHotels = hotels[index];
        return { nrOfHotels, nrOfHouses };
    })
    return result;
}


export const getAllFeasableBuildingLocations = (initialBuildingLocations: tBuildingLocations, bankOwnedBuildings: tNrOfBuildings) => {
    const {houses, hotels} = getHouseAndHotelLocationsInArrayNotation(initialBuildingLocations);
    const {nrOfHotels: hotelsLimit, nrOfHouses: housesLimit} = bankOwnedBuildings;
    const hotelsAs5HousesNotation = houses.map((value, index) => {
        if (hotels[index] > 0) return 5;
        return value;
    })
    const allPossibleLocations = getAllFeasableHouseLocations(hotelsAs5HousesNotation);
    const verboseNotation = allPossibleLocations.map((solution) => {
        const result = arrNotationToVerboseNotation({houses: solution, hotels: solution.map(() => 0)})
        return result;
    })
    const convertSingleSolutionWithFiveHouessToHotels = (singleSolution: tNrOfBuildings[]) => {
        const result = singleSolution.map((value: tNrOfBuildings) => {
            const {nrOfHotels, nrOfHouses} = value;
            if (nrOfHouses > 4) {
                value.nrOfHotels = 1;
                value.nrOfHouses = 0;
            }
            return value;
        })
        return  result;
    }
    const fiveHousesTranslatedToHotel = verboseNotation.map(convertSingleSolutionWithFiveHouessToHotels)

    const nrOfHousesInInitialSolution = houses.reduce((acc, nrOfHouses) => acc + nrOfHouses, 0);
    const solutionsWithFilteredHousesOwnedByBankLimit = fiveHousesTranslatedToHotel.filter((solution) => {
        const nrOfHousesSolutionUses = solution.reduce((acc, {nrOfHouses}) => acc + nrOfHouses, 0);
        const result = nrOfHousesSolutionUses <= nrOfHousesInInitialSolution + housesLimit;
        return result
    })
    return solutionsWithFilteredHousesOwnedByBankLimit

}
