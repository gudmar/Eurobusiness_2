import { ATENY, CHANCE_BLUE, CHANCE_BLUE_LEFT, JAIL, NEAPOL, START } from "../../Data/const";
import { iNamedChance, iNamedCityField, iNamedOtherField } from "../../Data/types";
import { descriptors } from '../../Data/boardFields'
import { createBoardDescriptor } from "../Utils/createBoardDescriptor";

const CITY_I: iNamedCityField = { ...descriptors[ATENY], name: ATENY, index: 1 };
const CITY_II: iNamedCityField = { ...descriptors[NEAPOL], name: NEAPOL, index: 2 };
const JAIL_I: iNamedOtherField = { ...descriptors[JAIL], name: JAIL, index: 3 }
const CHANCE_BL: iNamedChance = { ...descriptors[CHANCE_BLUE_LEFT], name: CHANCE_BLUE_LEFT, index: 4 };
const START_I: iNamedOtherField = { ...descriptors[START], name: START, index: 5 };

const order = [START, CHANCE_BLUE, ATENY, CHANCE_BLUE, NEAPOL, JAIL];

const expected = [START_I, CHANCE_BL, CITY_I, CHANCE_BL, CITY_II, JAIL_I]

describe('Testing createVoardDescriptor', () => {
    it('Should put descriptors in order given by an array', () => {
        const result = createBoardDescriptor(order, descriptors)
        expect(result).toEqual(expected);
    })
})
