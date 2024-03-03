import { EN } from "../../../Contexts/CurrentLanguage/const";
import { ChanceCardHolder } from "../../Chance/ChanceCardHolder";
import { GRAY, BLACK } from "./mocks";

jest.mock('../../../Functions/shuffle', () => ({
    shuffle: (a: any) => a
}))            


describe('Testing delivery of collectable cards', () => {
    afterEach(() => ChanceCardHolder.instances = {})
    it('Should return a set of collectable cards when asked for it', () => {
        const instance = new ChanceCardHolder(GRAY);
        const collectableCards = instance.getCollectableCards(EN);
        expect(collectableCards).toEqual(['r', 'y', 'o']);
    })
    it('Should return a set of not borrowed cards when asked to do so', () => {
        const instance = new ChanceCardHolder(GRAY);
        instance.borrowCardToAPlayer('y');
        const collectableCards = instance.getAvailableCollectableCards(EN);
        expect(collectableCards).toEqual(['r', 'o']);
    })
    it('Should provide a static method making a report of all collectable cards in each pile color', () => {

        const blackInstance = new ChanceCardHolder(BLACK)
        const grayInstance = new ChanceCardHolder(GRAY)
        blackInstance.borrowCardToAPlayer('a');
        grayInstance.borrowCardToAPlayer('r');
        const notBorrowedCardsExpectedReport = {
            black: ['b', 'k'],
            gray: ['y','o']
        };
        const expectedCollectableCardsReport = {
            black: ['b', 'a', 'k'],
            gray: ['r','y','o']
        }
        const notBorrowedReport = ChanceCardHolder.getAllNotBorrowedCardDescriptionsInSets(EN);
        const collectableReport = ChanceCardHolder.getAllCollectableCardDescriptionsInSets(EN);
        expect(notBorrowedReport).toEqual(notBorrowedCardsExpectedReport);
        expect(expectedCollectableCardsReport ).toEqual(collectableReport);
    })
})
