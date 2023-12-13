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

type ChanceCardHolderInstance = {[key: string]: ChanceCardHolder};

export class ChanceCardHolder {
    static instances: ChanceCardHolderInstance;
    private _cardsDescriptions?: tLanguageDescriptionEntry[];
    private _cardsActions?: iActions;
    private _language: string = LanguageNameToShortName.english;
    private _cardSetName: string = '';
    constructor(cards: tChance) {
        this.initializeCardsObject(cards);
        if (ChanceCardHolder?.instances?.[cards.cardSetName]) {
            return ChanceCardHolder.instances[cards.cardSetName]
        }
        if (!ChanceCardHolder.instances) { ChanceCardHolder.instances = {} }
        ChanceCardHolder.instances[cards.cardSetName] = this;
        this._cardSetName = cards.cardSetName;
    }
    selfDestruct() {
        delete ChanceCardHolder?.instances?.[this._cardSetName];
    }
    get descriptions() {
        const index: string = this._language;
        console.log('index', index)
        const currentDescriptions: tLanguageDescriptionEntry | undefined = this._cardsDescriptions?.find(
            ({languageShortName}: tLanguageDescriptionEntry) => languageShortName === this._language
        )
        console.log(currentDescriptions?.descriptions)
        const result = currentDescriptions?.descriptions || {}
        return result;
    }

    get nrOfActions() {return Object.values(this._cardsActions || {}).length}
    get nrOfDescriptions() {
        // console.log(this._cardsDescriptions)
        console.log(this.descriptions)
        return Object.keys(this.descriptions || {}).length
    }
    getDescriptionForCardNr(nr:number) { 
        const key: string = `${nr}`;
        return this.descriptions?.[key]
    }

    private initializeCardsObject(cardsDescriptor: tChance ) {
        this._cardsActions = cardsDescriptor?.computer;
        this._cardsDescriptions = getDescriptionsInLanguages(cardsDescriptor)
        
    }
}