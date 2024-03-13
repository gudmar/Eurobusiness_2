import { CITY } from "../../../Data/const";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types"
import { Bank } from "../../Bank/Bank";
import { tFieldState } from "../../boardTypes";
import { Players } from "../../Players/Players";

export type tGetBuildingPermitsArgs = {
    gameState: tGameState,
    playerName: string,
    cityName: string,
}

type tReason = string;

export type tBuildingRejection = { rjection: tReason };
export enum NrOfHouses {
    one = '1 house',
    two = '2 houses',
    three = '3 houses',
    four = '4 houses',
}
export enum BuildingPermitRejected {
    notACity = 'Buildings may be build only in a city',
    plegded = 'Buildings may be created only on non plegded properties',
    ownsOnlyPart = 'Buildings may be created only when a player owns all cities in the country',
    soldOut = 'No more buildings are available',
    alreadyBuild = 'No more buildings may be created here'
}

type tHouseLocations = {
    locationOne: string[], locationTwo: string[], cost: number,
}

export type tBuidlingApproved = {
    country: string,
    permits: {
        [NrOfHouses.one]: tHouseLocations[],
        [NrOfHouses.two]: tHouseLocations[]
        [NrOfHouses.three]: tHouseLocations[],
        [NrOfHouses.four]: tHouseLocations[]
    }
}

export type tPermitRejection = {rejection: tReason}

export type tBuildingPermits = tPermitRejection | tBuidlingApproved;

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

export const getBuildingPermits = ({gameState, playerName, cityName}: tGetBuildingPermitsArgs) => {
    const playerColor = Players.playerNameToPlayerColor(playerName);
    const estate = gameState.boardFields.find(({name}) => name === cityName)
    if (!estate) throw new Error(`No estate named ${cityName}`)
    if (estate.type !== CITY) {
        return {reason: BuildingPermitRejected.notACity}
    }
    const citiesFromSameCountry = getAllFromSameCountry(gameState, cityName);
    if (checkIfSome(citiesFromSameCountry, isPlegdedConditionChecker)) { return { reason: BuildingPermitRejected.plegded }}
    if (checkIfSome(citiesFromSameCountry, getIsNotOwnedConditionChecker(playerColor))) { return { reason: BuildingPermitRejected.ownsOnlyPart }}
    if (checkIfEvery(citiesFromSameCountry, isCityHasAHotelConditionChecker)) { return { reason: BuildingPermitRejected.alreadyBuild}}
}
