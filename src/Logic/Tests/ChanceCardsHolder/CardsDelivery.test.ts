import { EN } from "../../../Contexts/CurrentLanguage/const";
import { CHANCE_CARDS_BLUE } from "../../../Data/chanceCards";
import { iChanceCardsData } from "../../../Data/types";
import { range } from "../../../Functions/createRange";
import { mockMathRandom, zeroRandomGenerator } from "../../../Functions/testUtils";
import { iDictionary } from "../../../Types/types";
import { ChanceCardHolder } from "../../Chance/ChanceCardHolder";

jest.mock('../../../Functions/shuffle', () => ({
    shuffle: (a: any[]) => {
        const reversed = a.reverse();
        return reversed;
    }
}))            

class CardsDelivery extends ChanceCardHolder {
    constructor(args: any) {
        super(args)
    }
    get descriptions() {
        const result = this._cards.map((card) => card.descriptions[EN])
        return(result)
    }
}

describe('Delivering cards', () => {
    const arrToObjectAsKeys = (arr: string[]) => arr.reduce((acc: iDictionary, item: string) => {
        acc[item] = true;
        return acc;
    }, {})
    const getKeys = (cardsData: iChanceCardsData) => {
        const result = Object.keys(cardsData).filter((key) => !isNaN(parseInt(key)))
        return result
    }
    const getEnglishDescriptionsFromData = (cardsData: iChanceCardsData) => {
        // const result = (Object.entries(CHANCE_CARDS_BLUE).filter(([key]) => (typeof key === 'number')) as any[]).map(({descriptions}) => descriptions[EN])
        const result = (getKeys(cardsData) as any).map((key: any) => {
            return cardsData[key].descriptions[EN]
        })
        return result;
    }
    const getEnglishDescriptionsFromInstance = (instance: CardsDelivery) => {
        // const cards = instance.state.cardsInOrder;
        // const descriptions = cards.map(({descriptions}) => descriptions[EN]);
        const descriptions = instance.descriptions
        return descriptions;
    }
    afterEach(() => ChanceCardHolder.instances = {})
    it('Should draw cards in shuffled order, when requested to draw a card', () => {
        const expectedDescriptions = getEnglishDescriptionsFromData(CHANCE_CARDS_BLUE).reverse()
        const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
        const result = expectedDescriptions.map(() => instance.drawACard(EN))
        expect(result).toEqual(expectedDescriptions);
    });
    it('Should reshuffle the library when drawn cards come to the end', () => {
        
        const descriptions = getEnglishDescriptionsFromData(CHANCE_CARDS_BLUE);
        const instance = new CardsDelivery(CHANCE_CARDS_BLUE);
        const descriptionsBeforeShuffle = getEnglishDescriptionsFromInstance(instance);
        const cardsBeforeShuffle = range(descriptions.length - 1).map(() => instance.drawACard(EN));
        const descriptionsAfterShuffle = getEnglishDescriptionsFromInstance(instance);
        const cardsAfterShuffle = range(descriptions.length - 1).map(() => instance.drawACard(EN));
        expect(cardsBeforeShuffle).not.toEqual(cardsAfterShuffle);
        expect(cardsBeforeShuffle).toEqual(descriptionsBeforeShuffle);
        expect(cardsAfterShuffle).toEqual(descriptionsAfterShuffle);
    });
});
