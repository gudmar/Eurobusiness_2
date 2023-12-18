import { GAIN, GAIN_FROM_EACH_PLAYER, GO_TO_FIELD_CONDITIONALLY_PASS_START, PAY } from "../../Constants/commands";
import { CHANCE_CARDS_BLUE } from "../../Data/chanceCards";
import { range } from "../../Functions/createRange";
import { mockMathRandom, zeroRandomGenerator } from "../../Functions/testUtils";
import { iDictionary } from "../../Types/types";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";
import { Errors } from "../Chance/errors";
import { tChance } from "../Chance/types";

export const YELLOW_1: tChance = {
    cardSetName: 'yellow',
    descriptions: {
            en: {
                0: 'a',
                1: 'b',
                2: 'c',
                3:  "d",
                4:  'e',
                5: 'f',
            },
        
    },
    actions: {
        0: [{
            type: PAY,
            payload: 400,
        }],
        1: [{
            type: GAIN,
            payload: 200,
        }],
        2: [{
            type: GAIN_FROM_EACH_PLAYER,
            payload: 20,
        }],
        3: [{
            type: GO_TO_FIELD_CONDITIONALLY_PASS_START,
        }],
        4: [{
            type: GAIN,
            payload: 400,
        }],
        5: [{
            type: PAY,
            payload: 20,
        }]
    },
    metadata: {
        2: {
            collectable: true
        }
    }

}

export const YELLOW_2: tChance = {
    cardSetName: 'yellow',
    descriptions: {
            en: {
                0: 'g',
                1: 'h',
                2: 'i',
                3:  "j",
                4:  'k',
                5: 'l',
            },
        
    },
    actions: {
        0: [{
            type: PAY,
            payload: 400,
        }],
        1: [{
            type: GAIN,
            payload: 200,
        }],
        2: [{
            type: GAIN_FROM_EACH_PLAYER,
            payload: 20,
        }],
        3: [{
            type: GO_TO_FIELD_CONDITIONALLY_PASS_START,
        }],
        4: [{
            type: GAIN,
            payload: 400,
        }],
        5: [{
            type: PAY,
            payload: 20,
        }]
    }
}

export const ORANGE: tChance = {
    cardSetName: 'orange',
    descriptions: {
            en: {
                0: 'm',
                1: 'n',
                2: 'o',
                3:  "p",
                4:  'r',
                5: 's',
            },
        
    },
    actions: {
        0: [{
            type: PAY,
            payload: 400,
        }],
        1: [{
            type: GAIN,
            payload: 200,
        }],
        2: [{
            type: GAIN_FROM_EACH_PLAYER,
            payload: 20,
        }],
        3: [{
            type: GO_TO_FIELD_CONDITIONALLY_PASS_START,
        }],
        4: [{
            type: GAIN,
            payload: 400,
        }],
        5: [{
            type: PAY,
            payload: 20,
        }]
    }
}


describe('Testing ChanceCardHolder', () => {
    afterEach(() => {
        ChanceCardHolder.instances = {};
    })
    describe('Uploading cards to the memory', () => {
        it('Should upload all blue cards from data folder, when requested to do so', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const nrOfActions = instance.nrOfActions;
            const nrOfDescriptions = instance.nrOfDescriptions;
            const cardNr5Description = instance.getDescriptionForCardNr(5);
            const expectedNrOfActions = 16;
            const expectedNrOfDescriptions = 16;
            const expectedCardDescription = CHANCE_CARDS_BLUE.descriptions.en[5];
            expect(nrOfActions).toEqual(expectedNrOfActions);
            expect(nrOfDescriptions).toEqual(expectedNrOfDescriptions);
            expect(cardNr5Description).toEqual(expectedCardDescription)
        });
    })
    describe('Delivering cards', () => {
        const arrToObjectAsKeys = (arr: string[]) => arr.reduce((acc: iDictionary, item: string) => {
            acc[item] = true;
            return acc;
        }, {})
        it('Should draw cards in shuffled order, when requested to draw a card', () => {
            const expectedDescriptions = [...Object.values(CHANCE_CARDS_BLUE.descriptions.en)].reverse();
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const result = mockMathRandom(zeroRandomGenerator, () => {
                instance.shuffle();
                const shuffledCards = range(expectedDescriptions.length - 1).map((_) => {
                    return instance.drawACard();
                })
                return shuffledCards;
            })
            expect(result).toEqual(expectedDescriptions);
        });
        it('Should reshuffle the library when drawn cards come to the end', () => {
            const descriptions = [...Object.values(CHANCE_CARDS_BLUE.descriptions.en)];
            const descriptionsAsKeys = arrToObjectAsKeys(descriptions);
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const cardsBeforeShuffle = range(descriptions.length - 1).map(() => instance.drawACard());
            const cardsAfterShuffle = range(descriptions.length - 1).map(() => instance.drawACard());
            const cardsBeforeAsKeys = arrToObjectAsKeys(cardsBeforeShuffle);
            const cardsAfterAsKeys = arrToObjectAsKeys(cardsAfterShuffle);
            expect(cardsBeforeShuffle).not.toEqual(cardsAfterShuffle);
            expect(cardsBeforeAsKeys).toEqual(cardsAfterAsKeys);
            expect(cardsBeforeAsKeys).toEqual(descriptionsAsKeys);
        });
    });
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
    describe('Search card index by description', () => {
        it('Should return -1 when given card description cannot be found in any language', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const englishIndex = instance.getCardIndexByDescription('Not existing description');
            expect(englishIndex).toBe(-1)
        })
        
        it('Should find a card index, when its description given in any language', () => {
            const englishDescription = CHANCE_CARDS_BLUE.descriptions.en[5];
            const polishDescription = CHANCE_CARDS_BLUE.descriptions.pl[5];
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const englishIndex = instance.getCardIndexByDescription(englishDescription);
            const polishIndex = instance.getCardIndexByDescription(polishDescription);
            expect(englishIndex).toBe(5)
            expect(polishIndex).toBe(5);
        })
    })
    const getArrayOfNotRepetingCards = (instance: ChanceCardHolder) => {
        const cards: string[] = [];
        while(true) {
            const card = instance.drawACard();
            if (cards.includes(card)) { return cards }
            cards.push(card)
        }
    }
    describe('Lending a card to a player', () => {
        it('Should not suspend a card when it is not collectable', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            instance.suspendCard(CHANCE_CARDS_BLUE.descriptions.en[2]);
            const allNotRepetingCards = getArrayOfNotRepetingCards(instance);
            expect(allNotRepetingCards.length).toBe(16)
        })
        it('Should suspend a card from game operations when player draws a collectible card', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            instance.suspendCard(CHANCE_CARDS_BLUE.descriptions.en[6]);
            const allNotRepetingCards = getArrayOfNotRepetingCards(instance);
            expect(allNotRepetingCards.length).toBe(15)

        });
        it('Should throw an error when there is an attempt to lend a non-collectible card to a pleyer', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const borrow = () => instance.borrowCardToAPlayer(CHANCE_CARDS_BLUE.descriptions.en[2])
            expect(borrow).toThrow(Errors.cardNotCollectable)
        });
        it('Should not allow to draw a card, when it is borrowed', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            instance.suspendCard(CHANCE_CARDS_BLUE.descriptions.en[6]);
            const allNotRepetingCards = getArrayOfNotRepetingCards(instance);
            expect(allNotRepetingCards.length).toBe(15)

        })
        it('Should allow to draw a collectible card when it is returned', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const TEST_CARD = CHANCE_CARDS_BLUE.descriptions.en[6]
            instance.suspendCard(TEST_CARD);
            const nrOfAllCardsAfterLending = getArrayOfNotRepetingCards(instance).length;
            instance.returnBorrowedCard(TEST_CARD);
            instance.shuffle();
            const nrOfAllCardsAfterReturning = getArrayOfNotRepetingCards(instance).length;
            expect(nrOfAllCardsAfterLending).toBe(15)
            expect(nrOfAllCardsAfterReturning).toBe(16)

        });
    })
})
