import { tGameState } from "../../../Functions/PersistRetrieveGameState/types"
import { iCityFieldState, tEstateField, tField, tFieldState } from "../../boardTypes"
import { Players } from "../../Players/Players"

type tPlayerBelogingsConditionFunction = (field: tFieldState) => boolean

const getNrPlayerBelongings = (gameState: tGameState, conditionFunction: tPlayerBelogingsConditionFunction) => {
    const {boardFields} = gameState;
    const result = boardFields.filter(conditionFunction);
    return result
}

export const getPlayerEstates = (gameState: tGameState, playerName: string) => {
    const playerColor = Players.playerNameToPlayerColor(playerName);
    const conditionFunction = (field: tFieldState) => {
        if (!('owner' in field)) { return false }
        const result = playerColor === (field as unknown as tEstateField).owner
        return result;
    }
    const result = getNrPlayerBelongings(gameState, conditionFunction);
    return result;
}

export const getNrOfBuildings = (gameState: tGameState, playerName: string) => {
    const estates = getPlayerEstates(gameState, playerName);
    const result = estates.reduce((acc, estate) => {
        if ('nrOfHouses' in estate && 'nrOfHotels' in estate) {
            acc.nrOfHotels += estate.nrOfHotels;
            acc.nrOfHouses += estate.nrOfHouses
        }
        return acc;
    }, {nrOfHotels: 0, nrOfHouses: 0})
    return result;
}

type tCountry = {
    existing: string[], owned: string[], hasAll?: boolean
}
type tReport = { [key: string]: tCountry}

type tGetCityFieldByCountryArgs = { gameState: tGameState, countryName: string}
type tCityFieldsByCountry = iCityFieldState[];

export const getCityFieldsByCountry = (args: tGetCityFieldByCountryArgs): tCityFieldsByCountry => {
    const { gameState, countryName } = args;
    const estates = gameState.boardFields;
    const report = estates.filter((estate) => {
        if (!('country' in estate)) return false;
        const result = estate.country === countryName;
        return result;
    }, [])
    return report as tCityFieldsByCountry;
}

export const getEstatesInCountriesReport = (gameState: tGameState, playerName: string) => {
    const playerColor = Players.playerNameToPlayerColor(playerName);
    const estates = gameState.boardFields;
    const report = estates.reduce((acc: tReport, estate) => {
        if (!('country' in estate)) return acc;
        if (estate.country in acc) {
            acc[`${estate.country}`].existing.push(estate.name);
            if (estate.owner === playerColor) {
                   acc[`${estate.country}`].owned.push(estate.name);
            }
        } else {
            acc[`${estate.country}`] = {
                existing: [estate.name],
                owned: estate.owner === playerColor ? [estate.name]: []
            }
        }
        return acc;
    }, {})
    const countries = Object.values(report);
    countries.forEach((country: tCountry) => {
        if (country.existing.length === country.owned.length) {
            country.hasAll = true
        } else {
            country.hasAll = false
        }
    })
    return report;
}
