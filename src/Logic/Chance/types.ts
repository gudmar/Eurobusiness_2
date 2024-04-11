import { tChanceMessages } from "../../Constants/commands"
import { tEachLanguageText, tLanguage } from "../../Contexts/CurrentLanguage/types"
import { iChanceCardActions, iChanceCardMetadata, iDescriptionsInLanguages } from "../../Data/types"
import { tAction } from "../../Types/types"
import { ChanceCardHolder } from "./ChanceCardHolder"

export type tChanceAction = {
    payload?: number,
    type: tChanceMessages,
    collectible?: boolean,
}
export type iActions = {
    [key: string]: tChanceAction[]
}
export type iDescription = {
    [key: string]: string
}

export type tCardMetadataBit = {
    isCollectable?: boolean,
}

export type tCardMetadata = {
    [key: tCardIndex]: tCardMetadataBit
}
export type tChance = {
    cardSetName: string,
    descriptions: {
        [key: string]: iDescription
    },
    actions: iActions,
    metadata?: tCardMetadata,
}

export type tCardIndex = string;

export type tBorrowedCards = {
    [key: tCardIndex]: boolean, // cannot hold palyerName as cards may change owner
}

export type tSingleChanceCardState = {
    descriptions: tEachLanguageText,
    actions: tAction[],
    metadata?: iChanceCardMetadata,
    isBorrowedToPlayer?: boolean,
}

export interface iChanceCard {
    state: tSingleChanceCardState,
    // descriptions: iDescriptionsInLanguages,
    actions: tAction[],
    descriptions: iDescriptionsInLanguages,
    isCollectable: boolean,
    isBorrowedToPlayer: boolean,
    borrow: () => boolean,
    return: () => boolean,
    getDescription: (language: tLanguage) => string,
}

export type tRunOnEachInstanceCallback<ReturnType> = (instance: ChanceCardHolder) => ReturnType

export type tChanceCardsHolderState = {
    // cardsDescriptions?: tLanguageDescriptionEntry[],
    // cardsActions?: iActions,
    // cardsMetaData?: tCardMetadata,

    cardsSetName: string,
    // cardsOrder: number[],
    cardsInOrder: tSingleChanceCardState[],
    lastDrawnCardIndex: number,
    // cardsBorrewedByPlayers: tBorrowedCards,
}

export enum ChanceCardOperations { Borrow = "borrow", Return = "return" }
export type tChanceCardOperationMessage = {
    description: string
}


