import { ATENY, CHANCE_BLUE_BOTTOM, CHANCE_BLUE_LEFT, JAIL, NEAPOL, START } from "../../Data/const";
import { iNamedChance, iNamedCityField, iNamedOtherField } from "../../Data/types";
import { descriptors } from '../../Data/boardFields'
import { createBoardDescriptor } from "../Utils/createBoardDescriptor";

const CITY_I: iNamedCityField = { ...descriptors[ATENY], name: ATENY, index: 2 };
const CITY_II: iNamedCityField = { ...descriptors[NEAPOL], name: NEAPOL, index: 4 };
const JAIL_I: iNamedOtherField = { ...descriptors[JAIL], name: JAIL, index: 5 }
const CHANCE_BL_BOTTOM: iNamedChance = { ...descriptors[CHANCE_BLUE_BOTTOM], name: CHANCE_BLUE_BOTTOM, index: 1 };
const CHANCE_BL_LEFT: iNamedChance = { ...descriptors[CHANCE_BLUE_LEFT], name: CHANCE_BLUE_LEFT, index: 3 };
const START_I: iNamedOtherField = { ...descriptors[START], name: START, index: 0 };

const order = [START, CHANCE_BLUE_BOTTOM, ATENY, CHANCE_BLUE_LEFT, NEAPOL, JAIL];

const expected = [START_I, CHANCE_BL_BOTTOM, CITY_I, CHANCE_BL_LEFT, CITY_II, JAIL_I]

describe('Testing createVoardDescriptor', () => {
    it('Should put descriptors in order given by an array', () => {
        const result = createBoardDescriptor(order, descriptors)
        expect(result).toEqual(expected);
    })
})
