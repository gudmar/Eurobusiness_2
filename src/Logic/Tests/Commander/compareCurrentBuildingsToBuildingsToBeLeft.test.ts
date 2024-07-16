import { compareCurrentBuildingsToBuildingsToBeLeft } from "../../Commander/utils";

describe('Testing Commander.compareCurrentBuildingsToBuildingsToBeLeft', () => {
    it('Should return true if there are less houses to be left then there are in the city', () => {
        const args = {
            nrOfHousesLeft: 1,
            nrOfHotelsLeft: 1,
            nrOfHousesCurrent: 2,
            nrOfHotelsCurrent: 1
        };
        const result = compareCurrentBuildingsToBuildingsToBeLeft(args);
        expect(result).toBeTruthy();
    })

    it('Should return true if there are less hotels to be left then there are in the city', () => {
        const args = {
            nrOfHousesLeft: 2,
            nrOfHotelsLeft: 0,
            nrOfHousesCurrent: 2,
            nrOfHotelsCurrent: 1
        };
        const result = compareCurrentBuildingsToBuildingsToBeLeft(args);
        expect(result).toBeTruthy();
    })

    it('Should return false if nrOfHousesCurrent and nrOfHousesLeft is the same and nrOfHotelsCurrent is the same that nrOfHotelsLeft', () => {
        const args = {
            nrOfHousesLeft: 2,
            nrOfHotelsLeft: 1,
            nrOfHousesCurrent: 2,
            nrOfHotelsCurrent: 1
        };
        const result = compareCurrentBuildingsToBuildingsToBeLeft(args);
        expect(result).toBeFalsy();
    })
})