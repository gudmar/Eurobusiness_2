import { ChanceCardHolder } from "../Chance/ChanceCardHolder";

describe('Testing ChanceCardHolder', () => {
    describe('Uploading cards to the memory', () => {
        it('Should upload all blue cards from data folder, when requested to do so', () => {
        });
    })
    describe('Shuffle cards', () => {
        it('Should place cards in random order when requested to do so', () => {

        })
    })
    describe('Delivering cards', () => {
        it('Should draw cards in shuffled order, when requested to draw a card', () => {

        });
        it('Should reshuffle the library when drawn cards come to the end', () => {

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
