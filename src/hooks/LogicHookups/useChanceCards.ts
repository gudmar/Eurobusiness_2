import { useEffect } from "react"
import { CHANCE_CARDS_BLUE, CHANCE_CARDS_RED } from "../../Data/chanceCards"
import { BLUE, RED } from "../../Data/const";
import { ChanceCardHolder } from "../../Logic/Chance/ChanceCardHolder";

export const useChanceCardsDescriptions = (cardVariant: string) => {
    useEffect(() => {
        if (cardVariant !== BLUE && cardVariant !== RED) {
            throw new Error(`Cannot get instance of chance cards: ${cardVariant}`)
        }
    })
    const cardsDescriptor = cardVariant === BLUE ? CHANCE_CARDS_BLUE : CHANCE_CARDS_RED;
    const instance: ChanceCardHolder = new ChanceCardHolder(cardsDescriptor)
    return {
        descriptions: instance.descriptionsInShufledOrder,
        collectableCards: instance.collectableCards,
        currentCardIndex: instance.currentCardIndex,
        borrowedDescriptions: instance.borrowedCardsDescriptions,
        borrowCard: instance.borrowCardToAPlayer,
        returnCard: instance.returnBorrowedCard,
    }
}