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

export const getAllFeasableBuildingLocations = (initialBuildingLocations: tBuildingLocations, bankOwnedBuildings: tNrOfBuildings) => {

}
