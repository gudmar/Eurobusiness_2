import { range } from "../../Functions/createRange";
import { shuffle } from "../../Functions/shuffle";
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
    private _cardsOrder!: number[];
    private _lastDrawnCardIndex = 0;

    constructor(cards: tChance) {
        if (ChanceCardHolder?.instances?.[cards.cardSetName]) {
            return ChanceCardHolder.instances[cards.cardSetName]
        }
        if (!ChanceCardHolder.instances) { ChanceCardHolder.instances = {} }
        this._initializeCardsObject(cards);
        ChanceCardHolder.instances[cards.cardSetName] = this;
        this._cardSetName = cards.cardSetName;
    }
    private get _initalCardOrder() {
        return range(Object.values(this.descriptions).length - 1)
    }
    private _initializeCardsObject(cardsDescriptor: tChance ) {
        this._cardsActions = cardsDescriptor?.computer;
        this._cardsDescriptions = getDescriptionsInLanguages(cardsDescriptor)  
        this._cardsOrder = this._initalCardOrder;
    }

    selfDestruct() {
        delete ChanceCardHolder?.instances?.[this._cardSetName];
    }
    get descriptions() {
        const currentDescriptions: tLanguageDescriptionEntry | undefined = this._cardsDescriptions?.find(
            ({languageShortName}: tLanguageDescriptionEntry) => languageShortName === this._language
        )
        const result = currentDescriptions?.descriptions || {}
        return result;
    }

    get nrOfActions() {return Object.values(this._cardsActions || {}).length}
    get nrOfDescriptions() {
        return Object.keys(this.descriptions || {}).length
    }
    getDescriptionForCardNr(nr:number) { 
        const key: string = `${nr}`;
        return this.descriptions?.[key]
    }
    shuffle() {
        const newCardOrder = shuffle(this._initalCardOrder) as number[];
        this._cardsOrder = newCardOrder;
    }
    private * _drawACard (): Generator<string> {
        while(true){
            const cardIndexMappedToShuffled = this._cardsOrder[this._lastDrawnCardIndex];
            const currentCard = this.getDescriptionForCardNr(cardIndexMappedToShuffled);
            this._lastDrawnCardIndex++;
            if (this._lastDrawnCardIndex >= this._cardsOrder.length) {
                this.shuffle();
                this._lastDrawnCardIndex = 0;
            }
            yield currentCard;
        }
    }
    drawACard() {
        const card: any = this._drawACard().next().value;
        return card
    }
}