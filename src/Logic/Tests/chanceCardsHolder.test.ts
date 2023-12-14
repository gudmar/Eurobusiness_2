import { CHANCE_CARDS_BLUE } from "../../Data/chanceCards";
import { range } from "../../Functions/createRange";
import { mockMathRandom, zeroRandomGenerator } from "../../Functions/testUtils";
import { iDictionary } from "../../Types/types";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";

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
        it('Should create only one instance for a blue color if an attempt to create a few blue instances', () => {

        });
        it('Should create only one red instance, that is separate from a blue instance, when attempt to create a blue instance and a few red instances', () => {

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
