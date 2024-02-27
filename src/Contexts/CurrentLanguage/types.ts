import { EN, PL } from "./const";

export enum SupportedLanguages {
    pl = 'Polish',
    en = 'English'
}

export type tSupportedLanguagesKeys = typeof PL | typeof EN

export type tSupportedLanguagesKeysMapping = {
    [key: string]: tSupportedLanguagesKeys
}

export type tLanguage = SupportedLanguages | tSupportedLanguagesKeys

export type tCurrentLanguageNotNull = {
    currentLanguageName: SupportedLanguages,
    setLanguage: (val: tSupportedLanguagesKeys | SupportedLanguages) => void,
    languageKey: tSupportedLanguagesKeys,
    supportedLanguageNames: SupportedLanguages[],
    supportedLanguageKeys: tSupportedLanguagesKeys[]
}

export type tEachLanguageText = {
    [key in keyof typeof SupportedLanguages] : string
}

export type tCurrentLanguage = tCurrentLanguageNotNull | null;

