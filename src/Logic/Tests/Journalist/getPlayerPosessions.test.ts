import { getPlayerEstates } from "../../Journalist/utils/getPlayerPosessions";
import { Players } from "../../Players/Players";
import { changeEstates, getStateMock } from "./ChanceCardStateMocks";

const COLOR = 'Deep purple';
const PLAYER_NAME = 'John Doe';

beforeAll(() => {
    Players.playerNameToPlayerColor = () => COLOR
})
const ESTATES = ['Ateny', 'Saloniki', 'Mediolan', 'London', 'South Railway', 'Power Station', 'Rotterdam', 'Frankfurt']

const changeOwnerDeltas = ESTATES.map((estateName) => ({
    estateName,
    props: {
        color: COLOR,
        owner: PLAYER_NAME
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
            nrOfHotes: 1
        }
    },
    {
        estateName: 'Mediolan',
        props: {
            nrOfHouses: 2
        }
    }
]

const stateWithChangedBuildings = changeEstates(stateWithChangedOwner, changeBuildingsDeltas);

describe('Testing getPlayerPosessions', () => {
    describe('Testing getPlayerEstates', () => {
        const estates = getPlayerEstates(stateWithChangedBuildings, PLAYER_NAME);
        const estateNames = estates.map(({name}) => name);
        expect(estateNames).toEqual(ESTATES);
    })
})
