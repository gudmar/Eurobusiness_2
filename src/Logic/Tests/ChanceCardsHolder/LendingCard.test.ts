import { EN } from "../../../Contexts/CurrentLanguage/const";
import { CHANCE_CARDS_BLUE } from "../../../Data/chanceCards";
import { ChanceCardHolder } from "../../Chance/ChanceCardHolder";
import { Errors } from "../../Chance/errors";


          

jest.mock('../../../Functions/shuffle', () => ({
    shuffle: (a: any[]) => a
}))    

 

    const getArrayOfNotRepetingEnglishCards = (instance: ChanceCardHolder) => {
        const cards: string[] = [];
        while(true) {
            const card = instance.drawACard(EN);
            if (cards.includes(card)) { return cards }
            cards.push(card)
        }
    };
    
    const NOT_COLLECTABLE_CARD_INDEX = 2
    const COLLECTABLE_CARD_INDEX = 6
    
    describe('Lending a card to a player', () => {
        it('Should not borrow a card when it is not collectable', () => {
            
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            instance.borrowCardToAPlayer(CHANCE_CARDS_BLUE[NOT_COLLECTABLE_CARD_INDEX].descriptions.en)
            const allNotRepetingCards = getArrayOfNotRepetingEnglishCards(instance);
            expect(allNotRepetingCards.length).toBe(16)
        })
        it('Should suspend a card from game operations when player draws a collectible card', () => {
            
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            instance.borrowCardToAPlayer(CHANCE_CARDS_BLUE[COLLECTABLE_CARD_INDEX].descriptions[EN]);
            const allNotRepetingCards = getArrayOfNotRepetingEnglishCards(instance);
            expect(allNotRepetingCards.length).toBe(15)

        });
        it('Should not lend a card to a player, if that card is not collectable', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const isBorrowed = instance.borrowCardToAPlayer(CHANCE_CARDS_BLUE[NOT_COLLECTABLE_CARD_INDEX].descriptions[EN])
            expect(isBorrowed).toBeFalsy();
        });
        it('Should not allow to draw a card, when it is borrowed', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            instance.borrowCardToAPlayer(CHANCE_CARDS_BLUE[COLLECTABLE_CARD_INDEX].descriptions[EN]);
            const allNotRepetingCards = getArrayOfNotRepetingEnglishCards(instance);
            expect(allNotRepetingCards.length).toBe(15)

        })
        it('Should allow to draw a collectible card when it is returned', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const TEST_CARD = CHANCE_CARDS_BLUE[COLLECTABLE_CARD_INDEX].descriptions[EN]
            instance.borrowCardToAPlayer(TEST_CARD);
            const nrOfAllCardsAfterLending = getArrayOfNotRepetingEnglishCards(instance).length;
            instance.returnBorrowedCard(TEST_CARD);
            instance.shuffle();
            const nrOfAllCardsAfterReturning = getArrayOfNotRepetingEnglishCards(instance).length;
            expect(nrOfAllCardsAfterLending).toBe(15)
            expect(nrOfAllCardsAfterReturning).toBe(16)

        });
    })
// })
