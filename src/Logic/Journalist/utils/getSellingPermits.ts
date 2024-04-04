import { tGetBuildingPermitsArgs } from "./getBuildingPermits";
import { tCountries } from "../../../Data/types";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { tBuildingLocations, tCityFieldsByCountry, tKeyCreator, tNrOfBuildings, tSellingPermit, tSellingPermits } from "./types";
import { getCityFieldsByCountryIfOwnedBy } from "./getCityFieldsByCountry";
import { getAllFeasableBuildingLocations } from "./getEveryPossibleQuantityOfHouses";
import { Bank } from "../../Bank/Bank";


export type tGetSellingPermitsArgs = {
    gameState: tGameState,
    country: tCountries,
    playerName: string,
}

export enum NotAbleToSellBuildingsReasons {
    noBuildings = 'No buildings in this country',
    noHousesLeft = 'No houses. Not able to exchange hotels for houses. Can sell all hotels instead'
}
type tNrBuildingsWithPrice = { nrOfHouses: number, nrOfHotels: number, price: number }

const getNrOfBuildings = (permit: tBuildingLocations, cities: tCityFieldsByCountry) => {
    const result = permit.reduce((acc: tNrBuildingsWithPrice, city: tNrOfBuildings, index: number) => {
        acc.nrOfHotels += city.nrOfHotels;
        acc.nrOfHouses += city.nrOfHouses;
        acc.price += (cities[index].hotelPrice * city.nrOfHotels + cities[index].housePrice * city.nrOfHouses)
        return acc;
    }, {nrOfHotels: 0, nrOfHouses: 0, price: 0})
    return result;
}

const getBuildingDifference = (permit: tNrOfBuildings[], initialLocation: tNrOfBuildings[], cities: tCityFieldsByCountry) => {
    const nrOfBuildingsInPermit = getNrOfBuildings(permit, cities);
    const nrOfBuildingsInitialLocation = getNrOfBuildings(permit, cities);
    const delta = {
        nrOfHotels: nrOfBuildingsInPermit.nrOfHotels - nrOfBuildingsInitialLocation.nrOfHotels,
        nrOfHouses: nrOfBuildingsInPermit.nrOfHouses - nrOfBuildingsInitialLocation.nrOfHouses,
        price: nrOfBuildingsInPermit.price - nrOfBuildingsInitialLocation.price,
    }
    return delta;
}

const getLocationsAfterTransaction = (permit: tNrOfBuildings[], cities: tCityFieldsByCountry) => {
    const locations = permit.map(({nrOfHouses, nrOfHotels}, index) => {
        const result = { cityName: cities[index].name, nrOfHouses, nrOfHotels }
        return result;
    })
    return locations;
}

const sortPermits = (permits: tNrOfBuildings[][], initialLocation: tBuildingLocations, cities: tCityFieldsByCountry) => {
    const result = permits.reduce((acc: tSellingPermits, permit) => {
        const nrOfSoldBuildings = getBuildingDifference(permit, initialLocation, cities);
        const key: string = getSellingPermitsCategory({nrOfSoldHotels: nrOfSoldBuildings.nrOfHotels, nrOfSoldHouses: nrOfSoldBuildings.nrOfHouses, price: nrOfSoldBuildings.price});
        const locationsAfterTransaction = getLocationsAfterTransaction(permit, cities);
        const deltaValue = {
            locationsAfterTransaction, nrOfSoldHotels: nrOfSoldBuildings.nrOfHotels, nrOfSoldHouses: nrOfSoldBuildings.nrOfHouses, price: nrOfSoldBuildings.price
        };
        if (!acc[key]) { acc[key] = []}
        acc[key].push(deltaValue);
        return acc;
    }, {})
    return result
}

export const getSellingPermits = (args: tGetSellingPermitsArgs) => {
    const MAX_NR_OF_BUILDINGS = 3;
    const {gameState, playerName, country} = args;
    const citiesInCountry = getCityFieldsByCountryIfOwnedBy({ gameState, countryName: country, playerName });
    const buildingLocations = citiesInCountry.map(({nrOfHouses, nrOfHotels}) => ({nrOfHotels, nrOfHouses}));
    const bankOwnedBuildings = {nrOfHouses: Bank.nrOfHouses, nrOfHotels: Bank.nrOfHotels};
    console.log('Building locations', buildingLocations)
    console.log('Bank owned', bankOwnedBuildings)
    const permits = getAllFeasableBuildingLocations( buildingLocations, bankOwnedBuildings );
    const sortedPermits = sortPermits(permits, buildingLocations, citiesInCountry);
    return sortedPermits;
}

export const getSellingPermitsCategory = ({ nrOfSoldHotels, nrOfSoldHouses, price }: tKeyCreator): string => {
    if (nrOfSoldHotels > 0 && nrOfSoldHouses === 0) {
        return `Sell ${nrOfSoldHotels}, get ${price}`
    }
    if (nrOfSoldHotels > 0 && nrOfSoldHotels > 0) {
        return `Sell ${nrOfSoldHotels} and ${nrOfSoldHouses}, get ${price}`
    }
    if (nrOfSoldHouses > 0 && nrOfSoldHotels === 0) {
        return `Sell ${nrOfSoldHouses}, get ${price}`
    }
    if (nrOfSoldHotels === 0 && nrOfSoldHouses === 0) {
        return 'Sell nothing'
    }
    throw new Error(`getSellingPermitsCategory did not produce any reasonable output for ${nrOfSoldHotels} hotels and ${nrOfSoldHouses} houses`)
}

