import { reverseLanguageMapping } from "../Contexts/CurrentLanguage/const";
import { SupportedLanguages, tLanguage, tSupportedLanguagesKeys } from "../Contexts/CurrentLanguage/types";

export type tRunCallbackWithLanguage<CallbackReturnType=void> = {
    language: tLanguage,
    shortNameCallback: (lang: tSupportedLanguagesKeys) => CallbackReturnType
    longNameCallback: (lang: SupportedLanguages) => CallbackReturnType
}

export const runCallbackWithLanguage = <CallbackReturnType>({language, shortNameCallback, longNameCallback}: tRunCallbackWithLanguage<CallbackReturnType>) => {
    if (Object.values(reverseLanguageMapping).includes(language as tSupportedLanguagesKeys)) {
        const result = shortNameCallback(language as tSupportedLanguagesKeys);
        return result;
    } else {
        const result = longNameCallback(language as SupportedLanguages);
        return result;
    }
}