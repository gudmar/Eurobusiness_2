import { EN, PL } from "../../../Contexts/CurrentLanguage/const";
import { CHANCE_CARDS_BLUE } from "../../../Data/chanceCards";
import { ChanceCardHolder } from "../../Chance/ChanceCardHolder";

jest.mock('../../../Functions/shuffle', () => ({
    shuffle: (a: any[]) => a
}))            

describe('Search card index by description', () => {
    afterEach(() => ChanceCardHolder.instances = {})
    it('Should return throw when given card description cannot be found in any language', () => {
        const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
        const englishIndex = () => instance.getCardIndexByDescription('Not existing description');
        expect(englishIndex).toThrow()
    })
    
    it('Should find a card index, when its description given in any language', () => {
        const englishDescription = CHANCE_CARDS_BLUE[5].descriptions[EN];
        const polishDescription = CHANCE_CARDS_BLUE[5].descriptions[PL];
        const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
        const englishIndex = instance.getCardIndexByDescription(englishDescription);
        const polishIndex = instance.getCardIndexByDescription(polishDescription);
        expect(englishIndex).toBe(5)
        expect(polishIndex).toBe(5);
    })
})
