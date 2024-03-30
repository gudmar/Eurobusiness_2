import { MAX_NR_OF_HOUSES_TO_PURCHASE_IN_ONE_ROW } from "../../../Constants/constants";

type tNrOfBuildings = {
    nrOfHouses: number,
    nrOfHotels: number,
}

type tBuildingLocations = tNrOfBuildings[]

type tPossibleHouseSolutions = number[][]

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
    if (isEnd(hotels)) {
        const arrayNotationHouses = getAllFeasableHouseLocations(houses);
        const result = arrayNotationHouses.map((solution) => {
            const arrayNotationHotels = solution.map(() => 0);
            const singleSolution = arrNotationToVerboseNotation({houses: solution, hotels: arrayNotationHotels})
            return singleSolution;
        }) 
        return result;
    } else {
        const housesWithHotelsSwappedToMaxHouses = houses.map((nrOfHouses, index) => {
            if (hotels[index] > 0 && nrOfHouses > 0) throw new Error('Cannot have houses and hotels on the same field')
            if (hotels[index] > 0) return MAX_NR_OF_HOUSES_TO_PURCHASE_IN_ONE_ROW
            return nrOfHouses;
        })
        const arrayNotationHouses = getAllFeasableHouseLocations(housesWithHotelsSwappedToMaxHouses);
        const housesWithBankLimit = arrayNotationHouses.filter((housesArrNotation) => {
            const sumOfHousesOnFieldWithHotel = housesArrNotation.reduce((acc, nrOfHouses, index) => {
                if (hotels[index] > 0) return acc + nrOfHouses;
                return acc
            }, 0)
        })
    }
}
