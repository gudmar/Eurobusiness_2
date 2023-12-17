import { tChanceMessages } from "../../Constants/commands"

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
export type tCardMetadata = {
    [key: tCardIndex]: {
        collectable: boolean,
    }
}
export type tChance = {
    cardSetName: string,
    descriptions: {
        [key: string]: iDescription
    },
    actions: iActions,
    metadata?: tCardMetadata,
}

export type tPlayerName = string;
export type tCardIndex = number;

export type tBorrowedCards = {
    [key: tCardIndex]: tPlayerName
}


