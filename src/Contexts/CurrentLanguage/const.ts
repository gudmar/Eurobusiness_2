import { SupportedLanguages, tSupportedLanguagesKeysMapping } from "./types";

export const DEFAULT_LANGUAGE = SupportedLanguages.pl;

export const PL = 'pl';
export const EN = 'en';

export const reverseLanguageMapping: tSupportedLanguagesKeysMapping = {
    [SupportedLanguages.pl]: PL,
    [SupportedLanguages.en]: EN,
}
