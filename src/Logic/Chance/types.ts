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
export type tChance = {
    cardSetName: string,
    descriptions: {
        [key: string]: iDescription
    }
    computer: iActions
}


