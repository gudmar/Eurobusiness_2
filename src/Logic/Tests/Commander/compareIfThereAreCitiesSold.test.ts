import { compareIfThereAreBuildingsInCitiesSold } from "../../Commander/utils";

describe('Testing Commander.compareIfThereAreBuildingsInCitiesSold', () => {
    it('Should return true when there are more houses in city, then need to be set to the city', () => {
        const request = {
            nrOfHousesCurrent: 2,
            nrOfHotelsCurrent: 1,
            nrOfHousesLeft: 1,
            nrOfHotelsLeft: 1,
        };
        const result = compareIfThereAreBuildingsInCitiesSold(request);
        expect(result).toBeTruthy();
    })
    it('Should return true if city has more hotels then need to be left in the city', () => {
        const request = {
            nrOfHousesCurrent: 2,
            nrOfHotelsCurrent: 1,
            nrOfHousesLeft: 1,
            nrOfHotelsLeft: 0,
        };
        const result = compareIfThereAreBuildingsInCitiesSold(request);
        expect(result).toBeTruthy();

    })
    it('Should return true when has some houses, and 0 houses will be set', () => {
        const request = {
            nrOfHousesCurrent: 2,
            nrOfHotelsCurrent: 1,
            nrOfHousesLeft: 0,
            nrOfHotelsLeft: 1,
        };
        const result = compareIfThereAreBuildingsInCitiesSold(request);
        expect(result).toBeTruthy();
    })
    it('Shouold return true when hotels and houses will be set to 0, and there are some houses and hotels', () => {
        const request = {
            nrOfHousesCurrent: 2,
            nrOfHotelsCurrent: 1,
            nrOfHousesLeft: 0,
            nrOfHotelsLeft: 0,
        };
        const result = compareIfThereAreBuildingsInCitiesSold(request);
        expect(result).toBeTruthy();
    })
    it('Should return false if city has less houses then need to be set and hotels are not touched', () => {
        const request = {
            nrOfHousesCurrent: 2,
            nrOfHotelsCurrent: 1,
            nrOfHousesLeft: 3,
            nrOfHotelsLeft: 1,
        };
        const result = compareIfThereAreBuildingsInCitiesSold(request);
        expect(result).toBeFalsy();
    })
    it('Should return false if city has less hotels then need to be set', () => {
        const request = {
            nrOfHousesCurrent: 2,
            nrOfHotelsCurrent: 1,
            nrOfHousesLeft: 0,
            nrOfHotelsLeft: 2,
        };
        const result = compareIfThereAreBuildingsInCitiesSold(request);
        expect(result).toBeFalsy();
    })
    it('Should return true when there are not enough houses in the city but there is a hotel and hotel is going to be sold', () => {
        const request = {
            nrOfHousesCurrent: 0,
            nrOfHotelsCurrent: 1,
            nrOfHousesLeft: 4,
            nrOfHotelsLeft: 0,
        };
        const result = compareIfThereAreBuildingsInCitiesSold(request);
        expect(result).toBeTruthy();
    })
})