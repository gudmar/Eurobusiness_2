import { isBeforeFirstMove } from "../../../Journalist/isBeforeFirstMove";
import { getStateMock } from "../ChanceCardStateMocks"

describe('Testing if isBeforeFirstMove produces correct results', () => {
    it('Should return true when receives an initial game state', () => {
        const state = getStateMock();
        const result = isBeforeFirstMove(state);
        expect(result).toBeTruthy();
    })
    it('Should return false when any estate has owner set to a not bank value', () => {

    })
    it('Should return false when players money is not 3000', () => {

    })
    it('Should return false when a player field is not 0', () => {

    })
})