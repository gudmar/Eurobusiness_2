import { ChanceCardHolder } from "../../Chance/ChanceCardHolder";
import { ORANGE, YELLOW_1, YELLOW_2 } from "./mocks";


describe('Testing if ChanceCarHolder creates a separate constatn instance for each card color', () => {
    it('Should create only one instance for a yellow color if an attempt to create a few yellow instances', () => {
        const instance1 = new ChanceCardHolder(YELLOW_1);
        const instance2 = new ChanceCardHolder(YELLOW_2);
        expect(instance1 === instance2).toBeTruthy()
    });
    it('Should create only one red instance, that is separate from a yellow instance, when attempt to create a blue instance and a orange instance', () => {
        const instance1 = new ChanceCardHolder(YELLOW_1);
        const instance2 = new ChanceCardHolder(ORANGE);
        expect(instance1 === instance2).toBeFalsy()
    });
});
