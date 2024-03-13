import { AMSTERDAM, ATENY, BARCELONA, BLUE, BRUKSELA, GOTEBORG, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, POWER_STATION, RED, ROME, ROTTERDAM, SALONIKI, SEWILLA, SZTOKHOLM, WATER_PLANT } from "../../../Data/const";
import { BuildingPermitRejected, getBuildingPermits } from "../../Journalist/utils/getBuildingPermits";
import { Players } from "../../Players/Players";
import { changeEstates, getStateMock } from "./ChanceCardStateMocks";

const PLAYER_NAME = 'Dwalin';

Players.playerNameToPlayerColor = () => RED;

const ESTATES_RED = [
    ATENY, SALONIKI, // GREECE
    NEAPOL, MEDIOLAN, ROME, //ITALY
    BARCELONA, SEWILLA, // SPAIN, not all
    LIVERPOOL, // UK not all
    POWER_STATION, WATER_PLANT, // PLANTS
    SZTOKHOLM, GOTEBORG, MALMO, // SZWECJA
]

const ESTATES_BLUE = [
    MADRIT, //SPAIN
    ROTTERDAM, BRUKSELA, AMSTERDAM, // BENELUX
]

const changeRedOwnerDeltas = ESTATES_RED.map((estateName) => ({
    estateName,
    props: { owner: RED }
}));
const changeBlueOwnerDetails = ESTATES_BLUE.map((estateName) => ({
    estateName,
    props: { owner: BLUE }
}))
const changeOwnerDeltas = [...changeBlueOwnerDetails, ...changeRedOwnerDeltas];

const state = getStateMock();
const stateWithChangedOwner = changeEstates(state, changeOwnerDeltas);
const changeBuildingsDeltasForErrorTesting = [
    {
        estateName: ATENY,
        props: {
            nrOfHotels: 1
        },
    },
    {
        estateName: SALONIKI,
        props: {
            nrOfHotels: 1
        }
    },
    {
        estateName: 'London',
        props: {
            nrOfHotels: 1
        }
    },
    {
        estateName: 'Mediolan',
        props: {
            nrOfHouses: 2
        }
    },
    {
        estateName: SZTOKHOLM,
        props: {
            isPlegded: true,
        }
    },
]
const stateChangedBuildings = changeEstates(stateWithChangedOwner, changeBuildingsDeltasForErrorTesting);

describe('Testing getBuildingPermits', () => {
    it('Should throw an error when given a not existing estate', () => {
        const throwingFunction = () => getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: 'Glowow'});
        expect(throwingFunction).toThrow();
    });
    it('Should return an object with rejected reason when given an estate where buildings cannot be created', () => {
        const reason = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: POWER_STATION})?.reason;
        expect(reason).toBe(BuildingPermitRejected.notACity);
    });
    it('Should return an object with rejected reason when given an estate in country, where some other estate is plegded', () => {
        const reason = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: GOTEBORG})?.reason;
        expect(reason).toBe(BuildingPermitRejected.plegded)
    });
    it('Should return an object with rejected reason when given a plegded estate', () => {
        const reason = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: SZTOKHOLM})?.reason;
        expect(reason).toBe(BuildingPermitRejected.plegded)
    });
    it('Should return an object with rejected reason when gieven estate belongs to another player / bank', () => {
        const reasonAnotherPlayer = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: MADRIT})?.reason;
        const reasonAnotherBank = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: LONDON})?.reason;
        expect(reasonAnotherPlayer).toBe(BuildingPermitRejected.ownsOnlyPart)
        expect(reasonAnotherBank).toBe(BuildingPermitRejected.ownsOnlyPart)

    });
    it('Should return an object with rejected reason when given estate is in a country, where some other city belongs to another pleyer / bank', () => {
        const reasonAnotherPlayer = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: BARCELONA})?.reason;
        const reasonAnotherBank = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: LIVERPOOL})?.reason;
        expect(reasonAnotherPlayer).toBe(BuildingPermitRejected.ownsOnlyPart)
        expect(reasonAnotherBank).toBe(BuildingPermitRejected.ownsOnlyPart)
    });
    it('Should return an object with rejected reason when given estate is in a country where each city has a hotel', () => {
        const reasonAlreadyHotels = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: SALONIKI})?.reason;
        expect(reasonAlreadyHotels).toBe(BuildingPermitRejected.alreadyBuild)
    });
    it('Should return an object with rejected reason when bank has no houses and only houses might have been build in cities of some country', () => {
        
    })
    it('Should return an object with rejected reason when bank has no hotels and there is a max nr of houses in each city in the country', () => {

    })
    it('Should return an object with the country name and permits for up to 4 houses when player owns each city in country, none city is plegded, there is no house, 2 cities in a country case', () => {

    })
    it('Should return an object with the country name and permits for up to 4 houses when player owns each city in a country, none city is plegeded, there is no house, 3 cities in a country case', () => {

    })
    it('Should return an object with the country name and permits for up to 4 houses when player owns each city in a 2 city country, and there is 1 house build already', () => {

    })
    it('Should return an object with the country name and permits for up to 3 houses when player owns each city in a 2 city country, and there are 5 houses already there', () => {

    })

})
