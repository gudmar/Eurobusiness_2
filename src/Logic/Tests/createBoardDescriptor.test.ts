import { ATENY, CHANCE_BLUE, CITY, JAIL, NEAPOL, START } from "../../Data/const";
import { iNamedChance, iNamedCityField, iNamedOtherField } from "../../Data/types";
import { descriptors } from '../../Data/boardFields'
import { createBoardDescriptor } from "../Utils/createBoardDescriptor";

const CITY_I: iNamedCityField = { ...descriptors[ATENY], name: ATENY };
const CITY_II: iNamedCityField = { ...descriptors[NEAPOL], name: NEAPOL };
const JAIL_I: iNamedOtherField = { ...descriptors[JAIL], name: JAIL }
const CHANCE_BL: iNamedChance = { ...descriptors[CHANCE_BLUE], name: CHANCE_BLUE };
const START_I: iNamedOtherField = { ...descriptors[START], name: START };

const order = [START, CHANCE_BLUE, ATENY, CHANCE_BLUE, NEAPOL, JAIL];

const expected = [START_I, CHANCE_BL, CITY_I, CHANCE_BL, CITY_II, JAIL_I]

describe('Testing createVoardDescriptor', () => {
    it('Should put descriptors in order given by an array', () => {
        const result = createBoardDescriptor(order, descriptors)
        expect(result).toEqual(expected);
    })
})
