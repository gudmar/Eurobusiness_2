import { CITY } from "../../../Data/const";
import { range } from "../../../Functions/createRange";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types"
import { Bank } from "../../Bank/Bank";
import { tFieldState } from "../../boardTypes";
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
}

type tReason = string;

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
    noHotelsLeftInBank = 'No hotels left in the bank'
}

type tHouseLocations = {
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

const calculatePermitsForHouses = ({gameState, playerName, cityName, nrOfBuildings, response}: tGetBuildingPermitsForNrOfBuildings): tHouseLocations[] => {
    return []
}

const calculatePermitsForHousesWithRejectionApply = (args: tGetBuildingPermitsForNrOfBuildings): tBuidlingApproved => {
    const { nrOfBuildings, response} = args;
    const nrOfHousesInBank = Bank.nrOfHouses;
    const result = calculatePermitsForHotels(args);
    if (result.length > 0) {
        if ((result.length) > nrOfHousesInBank) {
            response.reason = BuildingPermitRejected.noHousesLeftInBank;
            return response;
        }
        if (nrOfBuildings === 1) {
            const nextResponse = {...response, [NrOfHouses.one]: result};
            return nextResponse;
        }
        if (nrOfBuildings === 2) {
            const nextResponse = {...response, [NrOfHouses.two]: result};
            return nextResponse;
        }
        if (nrOfBuildings === 3) {
            const nextResponse = {...response, [NrOfHouses.two]: result};
            return nextResponse;
        }
    }
    return response;
}


const calculatePermitsForHotelsWithRejectionApply = (args: tGetBuildingPermitsForNrOfBuildings): tBuidlingApproved => {
    const { nrOfBuildings, response} = args;
    const nrOfHotelsInBank = Bank.nrOfHotels;
    const result = calculatePermitsForHotels(args);
    if (result.length > 0) {
        if ((result.length) > nrOfHotelsInBank) {
            response.reason = BuildingPermitRejected.noHousesLeftInBank;
            return response;
        }
        if (nrOfBuildings === 1) {
            const nextResponse = {...response, [NrOfHotels.one]: result};
            return nextResponse;
        }
        if (nrOfBuildings === 2) {
            const nextResponse = {...response, [NrOfHotels.two]: result};
            return nextResponse;
        }
        if (nrOfBuildings === 3) {
            const nextResponse = {...response, [NrOfHotels.two]: result};
            return nextResponse;
        }
    }
    return response;
}

const calculatePermitsForHotels = ({gameState, playerName, cityName, nrOfBuildings, response}: tGetBuildingPermitsForNrOfBuildings): tHouseLocations[] => {
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
    const rangeMaxBuildings = range(MAX_NR_OF_BUILDINGS);
    const nextREsponse = rangeMaxBuildings.reduce((acc, index) => {
        const resultWithHouse = calculatePermitsForHousesWithRejectionApply({...args, nrOfBuildings: index, response})
        const resultWithHotel = calculatePermitsForHotelsWithRejectionApply({...args, nrOfBuildings: index, response: resultWithHouse})
        return resultWithHotel
    }, response)
    return nextREsponse;
}
