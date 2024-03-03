import { EN } from "../../../Contexts/CurrentLanguage/const";
import { BLUE_CARDS_SET_NAME, CHANCE_CARDS_BLUE } from "../../../Data/chanceCards";
import { ChanceCardHolder } from "../../Chance/ChanceCardHolder";

jest.mock('../../../Functions/shuffle', () => ({
    shuffle: (a: any) => a
}))            

describe('Uploading cards to the memory', () => {
    it('Should upload all blue cards from data folder, when requested to do so', () => {
        const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
        const state = instance.state;
        const nrOfCards = state.cardsInOrder.length;
        const name = state.cardsSetName;
        const index = state.lastDrawnCardIndex;
        const cardNr5Description = instance.state.cardsInOrder[5].descriptions[EN];
        const expectedNrOfCards = 16;
        
        const expectedCardDescription = CHANCE_CARDS_BLUE[5].descriptions[EN];
        expect(nrOfCards).toEqual(expectedNrOfCards);
        expect(cardNr5Description).toEqual(expectedCardDescription)
        expect(name).toBe(BLUE_CARDS_SET_NAME)
        expect(index).toBe(0);
    });
})