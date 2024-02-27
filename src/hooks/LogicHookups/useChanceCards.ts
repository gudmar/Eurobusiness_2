import { useEffect } from "react"
import { useLanguage } from "../../Contexts/CurrentLanguage/CurrentLanguage";
import { CHANCE_CARDS_BLUE, CHANCE_CARDS_RED } from "../../Data/chanceCards"
import { BLUE, RED } from "../../Data/const";
import { ChanceCardHolder } from "../../Logic/Chance/ChanceCardHolder";

export const useChanceCardsDescriptions = (cardVariant: string) => {
    useEffect(() => {
        if (cardVariant !== BLUE && cardVariant !== RED) {
            throw new Error(`Cannot get instance of chance cards: ${cardVariant}`)
        }
    })
    const {languageKey} = useLanguage();
    const cardsDescriptor = cardVariant === BLUE ? CHANCE_CARDS_BLUE : CHANCE_CARDS_RED;
    const instance: ChanceCardHolder = new ChanceCardHolder(cardsDescriptor)
    return {
        descriptions: instance.getDescriptionsInShufledOrder(languageKey),
        collectableCards: instance.getCollectableCards(languageKey),
        currentCardIndex: instance.currentCardIndex,
        borrowedDescriptions: instance.getBorrowedCardsDescriptions(languageKey),
        borrowCard: instance.borrowCardToAPlayer,
        returnCard: instance.returnBorrowedCard,
    }
}