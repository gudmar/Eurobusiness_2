import { tCountries } from "../../../Data/types";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { tBuildingLocations, tCityFieldsByCountry, tKeyCreator, tNrOfBuildings, tSellingPermit, tSellingPermits } from "./types";
import { getCityFieldsByCountryIfOwnedBy } from "./getCityFieldsByCountry";
import { getAllFeasableBuildingLocations } from "./getEveryPossibleQuantityOfHouses";
import { mapCitiesToCountries } from "../../../Functions/mapCitiesToCountries";
import { getHotelsInBank, getHousesInBank } from "./getBuildingsInBank";
import { tObject } from "../../types";
import { SellBuildingsRejected } from "./constants";

export const SELL_NOTHING = "Sell nothing";

export type tGetSellingPermitsArgs = {
    gameState: tGameState,
    country: tCountries,
    playerName: string,
}

export type tGetSellingPermitsForEachCountryArgs = {
    gameState: tGameState,
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

export const calculatePrice = (cities: tCityFieldsByCountry, permit: tNrOfBuildings[], initialLocation: tNrOfBuildings[]) => { 
    const price = permit.reduce((acc, {nrOfHotels, nrOfHouses}, index) => {
        const baseNrOfHotels = initialLocation[index].nrOfHotels;
        const baseNrOfHouses: number = initialLocation[index].nrOfHouses + 4 * (baseNrOfHotels - nrOfHotels);
        const hotelsPrice: number = cities[index].hotelPrice * (baseNrOfHotels - nrOfHotels);
        const housesPrice = cities[index].housePrice * (baseNrOfHouses - nrOfHouses);
        const result = acc + 0.5 * (housesPrice + hotelsPrice);
        return result;
    }, 0)
    return price;
}

const getBuildingDifference = (permit: tNrOfBuildings[], initialLocation: tNrOfBuildings[], cities: tCityFieldsByCountry) => {
    const nrOfBuildingsInPermit = getNrOfBuildings(permit, cities);
    const nrOfBuildingsInitialLocation = getNrOfBuildings(initialLocation, cities);
    const nrOfHotels = nrOfBuildingsInitialLocation.nrOfHotels - nrOfBuildingsInPermit.nrOfHotels;
    const nrOfHouses = nrOfBuildingsInitialLocation.nrOfHouses + 4 * nrOfHotels - nrOfBuildingsInPermit.nrOfHouses;
    const delta = {
        nrOfHotels, nrOfHouses,
        price: 0.5*(nrOfBuildingsInitialLocation.price - nrOfBuildingsInPermit.price),
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
        const locationsAfterTransaction = getLocationsAfterTransaction(permit, cities);
        const price = calculatePrice(cities, permit, initialLocation)
        const deltaValue = {
            locationsAfterTransaction, nrOfSoldHotels: nrOfSoldBuildings.nrOfHotels, nrOfSoldHouses: nrOfSoldBuildings.nrOfHouses, price
        };
        const key: string = getSellingPermitsCategory({nrOfSoldHotels: nrOfSoldBuildings.nrOfHotels, nrOfSoldHouses: nrOfSoldBuildings.nrOfHouses, price})
        if (!acc[key]) { acc[key] = []}
        acc[key].push(deltaValue);
        return acc;
    }, {})
    return result
}

export const getSellingPermits = (args: tGetSellingPermitsArgs) => {
    const {gameState, playerName, country} = args;
    const citiesInCountry = getCityFieldsByCountryIfOwnedBy({ gameState, countryName: country, playerName });
    const buildingLocations = citiesInCountry.map(({nrOfHouses, nrOfHotels}) => ({nrOfHotels, nrOfHouses}));
    const housesInBank = getHousesInBank(args);
    const hotelsInBank = getHotelsInBank(args);
    const bankOwnedBuildings = {nrOfHouses: housesInBank, nrOfHotels: hotelsInBank};
    const permits = getAllFeasableBuildingLocations( buildingLocations, bankOwnedBuildings );
    const sortedPermits = sortPermits(permits, buildingLocations, citiesInCountry);
    return sortedPermits;
}

export const getSellingPermitsForEachCountry = (args: tGetSellingPermitsForEachCountryArgs) => {
    const {gameState, playerName} = args;
    const citiesInCountries = mapCitiesToCountries();
    const countries = Object.keys(citiesInCountries) as tCountries[];
    const sellPossibilities = countries.reduce((acc: tObject<any>, country) => {
        if (!(country in acc)) {
            const possibilities = getSellingPermits({gameState, playerName, country});
            const isRejection = (SELL_NOTHING in possibilities) && Object.keys(possibilities).length === 1;
            if (isRejection) {
                acc[country] = {
                    reason: SellBuildingsRejected.NoBuildings,
                    country,
                }
                return acc;
            }
            acc[country] = {
                ...possibilities,
                country,
            }
            // const possiblitiesWithComments = isRejection ? { reason: SellBuildingsRejected.NoBuildings } : possibilities;
            // acc[country] = {
            //     ...possiblitiesWithComments,
            //     country,
            // }
        }
        return acc;
    }, {})
    return sellPossibilities;
}

const getBuildingsWithUnit = (nrOfBuildings: number, unit: string) => {
    const base = `${nrOfBuildings} ${unit}`
    const result = nrOfBuildings > 1 ? `${base}s` : base;
    return result;
}

export const getSellingPermitsCategory = ({ nrOfSoldHotels, nrOfSoldHouses, price }: tKeyCreator): string => {
    const HOTEL = 'hotel';
    const HOUSE = 'house';
    if (nrOfSoldHotels > 0 && nrOfSoldHouses === 0) {
        return `Sell ${getBuildingsWithUnit(nrOfSoldHotels, HOTEL)}, get ${price}$`
    }
    if (nrOfSoldHotels > 0 && nrOfSoldHotels > 0) {
        return `Sell ${getBuildingsWithUnit(nrOfSoldHotels, HOTEL)} and ${getBuildingsWithUnit(nrOfSoldHouses, HOUSE)}, get ${price}$`
    }
    if (nrOfSoldHouses > 0 && nrOfSoldHotels === 0) {
        return `Sell ${getBuildingsWithUnit(nrOfSoldHouses, HOUSE)}, get ${price}`
    }
    if (nrOfSoldHotels === 0 && nrOfSoldHouses === 0) {
        return SELL_NOTHING;
    }
    throw new Error(`getSellingPermitsCategory did not produce any reasonable output for ${nrOfSoldHotels} hotels and ${nrOfSoldHouses} houses`)
}

