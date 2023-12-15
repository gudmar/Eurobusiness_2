import { GAIN, GAIN_FROM_EACH_PLAYER, GO_TO_FIELD_CONDITIONALLY_PASS_START, PAY } from "../../Constants/commands";
import { CHANCE_CARDS_BLUE } from "../../Data/chanceCards";
import { range } from "../../Functions/createRange";
import { mockMathRandom, zeroRandomGenerator } from "../../Functions/testUtils";
import { iDictionary } from "../../Types/types";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";
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
    computer: {
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
    computer: {
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
    computer: {
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
    describe('Lending a card to a player', () => {
        it('Should suspend a card from game operations when player draws a collectible card', () => {

        });
        it('Should throw an error when there is an attempt to lend a non-collectible card to a pleyer', () => {

        });
        it('Should not allow to draw a card, when it is borrowed', () => {

        })
        it('Should allow to draw a collectible card when it is not borrowed', () => {

        });
        it('Should return a borrowed card to a deck when requested to do so', () => {

        });
        it('Should return the card to the end of the deck, when player requestes to return a borrowed card', () => {

        })
    })
})
