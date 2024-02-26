import { EN, PL } from "./const";

export enum SupportedLanguages {
    pl = 'Polish',
    en = 'English'
}

export type tSupportedLanguagesKeys = typeof PL | typeof EN

export type tSupportedLanguagesKeysMapping = {
    [key: string]: tSupportedLanguagesKeys
}
