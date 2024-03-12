import { AMSTERDAM, ATENY, AUSTRIA, BARCELONA, BENELUX, BONN, BRUKSELA, EAST_RAILWAYS, FRANKFURT, GLASGOW, GOTEBORG, GREECE, INSBRUK, ITALY, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, NORTH_RAILWAYS, PLANT, POWER_STATION, RAILWAYS, RED, RFN, ROME, ROTTERDAM, SALONIKI, SEWILLA, SOUTH_RAILWAY, SPAIN, SWEEDEN, SZTOKHOLM, UK, WATER_PLANT, WEST_RAILWAYS, WIEDEN } from "../../../Data/const";
import { getEstatesInCountriesReport, getNrOfBuildings, getPlayerEstates } from "../../Journalist/utils/getPlayerPosessions";
import { Players } from "../../Players/Players";
import { changeEstates, getStateMock } from "./ChanceCardStateMocks";

const COLOR = RED
const PLAYER_NAME = 'Dwalin';

Players.playerNameToPlayerColor = () => COLOR;

const ESTATES = [
    'Ateny', 'Saloniki', 'Mediolan', 
    'London', 'South Railway', 'Power Station', 
    'Rotterdam', 'Frankfurt'
]

const changeOwnerDeltas = ESTATES.map((estateName) => ({
    estateName,
    props: {
        owner: COLOR
    }
}))

const state = getStateMock();
const stateWithChangedOwner = changeEstates(state, changeOwnerDeltas);
const changeBuildingsDeltas = [
    {
        estateName: 'Ateny',
        props: {
            nrOfHouses: 3
        },
    },
    {
        estateName: 'Saloniki',
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
    }
]

const expectedCountryReport = {
    [GREECE]: {
        existing: [SALONIKI, ATENY],
        owned: [SALONIKI, ATENY],
        hasAll: true,
    },
    [ITALY]: {
        existing: [NEAPOL, MEDIOLAN, ROME],
        owned: [MEDIOLAN],
        hasAll: false,
    },
    [SPAIN]: {
        existing: [BARCELONA, SEWILLA, MADRIT],
        owned: [],
        hasAll: false,
    },
    [UK]: {
        existing: [LIVERPOOL, GLASGOW, LONDON],
        owned: [LONDON],
        hasAll: false,
    },
    [BENELUX]: {
        existing: [ROTTERDAM, BRUKSELA, AMSTERDAM],
        owned: [ROTTERDAM], hasAll: false,
    },
    [SWEEDEN]: {
        existing: [MALMO, GOTEBORG, SZTOKHOLM],
        owned: [], hasAll: false,
    },
    [RFN]: {
        existing: [FRANKFURT, KOLONIA, BONN],
        owned: [FRANKFURT], hasAll: false,
    },
    [AUSTRIA]: {
        existing: [INSBRUK, WIEDEN],
        owned: [], hasAll: false,
    },
    [RAILWAYS]: {
        existing: [SOUTH_RAILWAY, WEST_RAILWAYS, NORTH_RAILWAYS, EAST_RAILWAYS],
        owned: [SOUTH_RAILWAY], hasAll: false,
    },
    [PLANT]: {
        existing: [POWER_STATION, WATER_PLANT],
        owned: [POWER_STATION], hasAll: false
    }
}

const stateWithChangedBuildings = changeEstates(stateWithChangedOwner, changeBuildingsDeltas);

describe('Testing getPlayerPosessions', () => {
    describe('Testing getPlayerEstates', () => {
        it('Should return all estates of given player', () => {
            const estates = getPlayerEstates(stateWithChangedBuildings, PLAYER_NAME);
            const estateNames = estates.map(({name}) => name);
            expect(estateNames.sort()).toEqual(ESTATES.sort());
        })
    })
    describe('Testing getNrOfBuildings. Used for chance cards', () => {
        it('Should return number of hotels and number of buildings when given a player that owns them', () => {
            const {nrOfHotels, nrOfHouses} = getNrOfBuildings(stateWithChangedBuildings, PLAYER_NAME);
            expect(nrOfHotels).toBe(2);
            expect(nrOfHouses).toBe(5);
        })
    })
    describe('Testing getEstatesInCountriesReport', () => {
        it('Should reduce board fields to a report contating countries, existing cities and owned by player estates', () => {
            const result = getEstatesInCountriesReport(stateWithChangedBuildings, PLAYER_NAME);
            expect(result).toEqual(expectedCountryReport);
        })
    })
})
