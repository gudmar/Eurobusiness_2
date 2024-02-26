import React, { createContext, useContext, useState } from "react"
import { DEFAULT_LANGUAGE, EN, PL, reverseLanguageMapping } from "./const"
import { SupportedLanguages, tSupportedLanguagesKeys } from "./types"

export interface Props {
    children: React.ReactNode,
}

const isKeyType = (val: string) => {
    const keyTypes = [PL, EN];
    const result = keyTypes.includes(val);
    return result;
}

const useCurrentLanguage = () => {
    const [currentLanguageName, setCurrentLanguageName] = useState<SupportedLanguages>(DEFAULT_LANGUAGE)
    const setLanguage = (nameOrKey: SupportedLanguages | tSupportedLanguagesKeys) => {
        if (isKeyType(nameOrKey)) {
            const newLanguageName = SupportedLanguages[nameOrKey as tSupportedLanguagesKeys];
            setCurrentLanguageName(newLanguageName);
        } else {
            setCurrentLanguageName(nameOrKey as SupportedLanguages)
        }
    }
    const languageKey: tSupportedLanguagesKeys = reverseLanguageMapping[currentLanguageName]
    const supportedLanguageNames = Object.values(SupportedLanguages);
    const supportedLanguageKeys = Object.values(reverseLanguageMapping)
    return { currentLanguageName, setLanguage, languageKey, supportedLanguageNames, supportedLanguageKeys }
}

type tCurrentLanguageNotNull = {
    currentLanguageName: SupportedLanguages,
    setLanguage: (val: tSupportedLanguagesKeys | SupportedLanguages) => void,
    languageKey: tSupportedLanguagesKeys,
    supportedLanguageNames: SupportedLanguages[],
    supportedLanguageKeys: tSupportedLanguagesKeys[]
}

type tCurrentLanguage = tCurrentLanguageNotNull | null;

const CurrentLanguage = createContext<tCurrentLanguage>(null);

export const useLanguage = () => {
    const context = useContext(CurrentLanguage);
    if (!context) {
        throw new Error('useLanguage should be used inside CurrnetLanguageContext')
    }
    return context
}

export const CurrentLanguageContext = ({children}: Props) => {
    const currentLanguageToolkit = useCurrentLanguage();
    return (
        <CurrentLanguage.Provider value={currentLanguageToolkit}>
            {children}
        </CurrentLanguage.Provider>
    )
}
