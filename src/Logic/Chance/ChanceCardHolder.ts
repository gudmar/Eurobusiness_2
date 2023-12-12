import { iDictionary } from "../../Types/types";
import { iActions, iDescription, tChance } from "./types";


export const LanguageNameToShortName: iDictionary = {
    english: 'en',
    polish: 'pl'
}

export const COMPUTER = 'computer'

type tLanguageDescriptionEntry =     {
    languageFullName: string,
    languageShortName: string,
    descriptions: iDescription
}

const getLanguageFullName = (shortcut: string):string => {
    const fullName = Object.keys(LanguageNameToShortName).filter((name: string) => LanguageNameToShortName[name] === shortcut);
    return fullName?.[0] || ''
}

const getDescriptionsInLanguages = ({descriptions}: tChance):tLanguageDescriptionEntry[] => {
    const shortcuts = Object.keys(descriptions);
    const descriptionsInLanguages: tLanguageDescriptionEntry[] = shortcuts.map((shortName: string):tLanguageDescriptionEntry => {
        const descriptionsResult: iDescription = descriptions[shortName]
        const result = {
            languageShortName: shortName,
            languageFullName: getLanguageFullName(shortName),
            descriptions: descriptionsResult,
         }
         return result;
        }
    );
    return descriptionsInLanguages;
}

export class ChanceCardHolder {
    private _cardsDescriptions?: tLanguageDescriptionEntry[];
    private _cardsActions?: iActions;
    private _language: string = LanguageNameToShortName.english;
    constructor(cards: tChance) {
        this.initializeCardsObject(cards)
    }
    get descriptions() {
        const index: string = this._language;
        const currentDescriptions: tLanguageDescriptionEntry | undefined = this._cardsDescriptions?.find(
            ({languageShortName}: tLanguageDescriptionEntry) => languageShortName === this._language
        )
        const result = currentDescriptions?.descriptions?.[index] || []
        return result;
    }

    get nrOfActions() {return Object.values(this._cardsActions || {}).length}
    get nrOfDescriptions() {return Object.keys(this.descriptions.length)}

    private initializeCardsObject(cardsDescriptor: tChance ) {
        this._cardsActions = cardsDescriptor?.computer;
        this._cardsDescriptions = getDescriptionsInLanguages(cardsDescriptor)
        
    }
}