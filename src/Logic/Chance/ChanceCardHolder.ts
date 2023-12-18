import { range } from "../../Functions/createRange";
import { shuffle } from "../../Functions/shuffle";
import { iDictionary } from "../../Types/types";
import { Errors } from "./errors";
import { iActions, iDescription, tBorrowedCards, tCardMetadata, tCardMetadataBit, tChance, tPlayerName } from "./types";


export const LanguageNameToShortName: iDictionary = {
    english: 'en',
    polish: 'pl'
}

export const ACTIONS = 'actions'

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
    private _cardsMetadata?: tCardMetadata;
    private _language: string = LanguageNameToShortName.english;
    private _cardSetName: string = '';
    private _cardsOrder!: number[];
    private _lastDrawnCardIndex = 0;
    private _cardsBorrowedByPlayers: tBorrowedCards = {}

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
        this._cardsActions = cardsDescriptor?.actions;
        this._cardsDescriptions = getDescriptionsInLanguages(cardsDescriptor);
        this._cardsMetadata = cardsDescriptor?.metadata || {};
        this._cardsOrder = this._initalCardOrder;
    }

    selfDestruct() {
        delete ChanceCardHolder?.instances?.[this._cardSetName];
    }
    private _getCardsDescriptionsByShortName(shortName: string) {
        const result: tLanguageDescriptionEntry | undefined = this._cardsDescriptions?.find(
            ({languageShortName}: tLanguageDescriptionEntry) => languageShortName === shortName
        )
        return result?.descriptions;
    }
    private _getCardsDescriptionsByLongName(longName: string) {
        const result: tLanguageDescriptionEntry | undefined = this._cardsDescriptions?.find(
            ({languageShortName}: tLanguageDescriptionEntry) => languageShortName === longName
        )
        return result?.descriptions;
    }

    private _getCardsDescriptionsByLanguage(languageName: string) {
        return this._getCardsDescriptionsByShortName(languageName) || this._getCardsDescriptionsByLongName(languageName) || {}
    }

    private get _availableLanguageShortcuts() {
        const result = this._cardsDescriptions!.map(({languageShortName}: tLanguageDescriptionEntry) => languageShortName);
        return result;
    }
    private _getIndexOfCardByDescriptionInLanguage(languageName: string, description: string) {
        const descriptions = this._getCardsDescriptionsByLanguage(languageName);
        const result = Object.entries(descriptions).find(([key, value]) => {
            return value === description
        });
        if (result) {return parseInt(result[0])}
        return -1;
    }

    getCardIndexByDescription(description: string) {
        const languageShortcut = this._availableLanguageShortcuts.find((shortName: string) => this._getIndexOfCardByDescriptionInLanguage(shortName, description) !== -1);
        if (!languageShortcut) return -1
        const index = this._getIndexOfCardByDescriptionInLanguage(languageShortcut, description);
        return index;
    }

    get descriptions() {
        const result = this._getCardsDescriptionsByLanguage(this._language)
        return result;
    }

    get actions() {
        return this._cardsActions;
    }

    get nrOfActions() {return Object.values(this._cardsActions || {}).length}
    get nrOfDescriptions() {
        return Object.keys(this.descriptions || {}).length
    }
    getDescriptionForCardNr(nr:number) { 
        const key: string = `${nr}`;
        return this.descriptions?.[key]
    }
    getActionsForCardNr(nr:number) { 
        const key: string = `${nr}`;
        return this.actions?.[key]
    }
    private _getMetadataForCardNr(nr: number): tCardMetadataBit {
        return this._cardsMetadata?.[`${nr}`] || {}
    }
    private get _nrOfCards() {
        const nrOfCards = Object.keys(this._cardsDescriptions![0]).length
        return nrOfCards;
    }

    get currentCardIndex() {return this._cardsOrder[this._lastDrawnCardIndex]}

    get isCurrentCardCollectable() { return !!this._getMetadataForCardNr(this.currentCardIndex) }

    private _isCardCollectable(index: number) {
        const metadata = this._getMetadataForCardNr(index);
        return !!(metadata?.collectable);
    }

    suspendCard(description: string) {        
        const cardIndex = this.getCardIndexByDescription(description);
        const isCardCollectable = this._isCardCollectable(cardIndex)
        if (isCardCollectable) {
            this._cardsBorrowedByPlayers[cardIndex] = true;
        }
    }

    unsuspendCard(description: string) {
        const cardIndex = this.getCardIndexByDescription(description);
        this._cardsBorrowedByPlayers[cardIndex] = false;        
    }

    get isSuspended() {
        return this._cardsBorrowedByPlayers[`${this._lastDrawnCardIndex}`];
    }
    
    shuffle() {
        const newCardOrder = shuffle(this._initalCardOrder) as number[];
        this._cardsOrder = newCardOrder;
        this._lastDrawnCardIndex = 0;
    }

    private get _areAllCardsSuspended() {
        const nrOfLockedCards = Object.entries(this._cardsBorrowedByPlayers).reduce((acc: number, entry: any) => {
            const [key, value] = entry;
            if (value) acc++;
            return acc
        }, 0)
        const nrOfCards = this._nrOfCards;
        return nrOfCards === nrOfLockedCards;
    }

    private _makeOperationOnCard(description: string, callback: (index: number) => void) {
        const cardIndex = this.getCardIndexByDescription(description);
        if (cardIndex === -1) {throw new Error(Errors.cardDoesNotExist)}        
        if (!this._isCardCollectable(cardIndex)) { throw new Error(Errors.cardNotCollectable)};
        callback(cardIndex);

    }
    borrowCardToAPlayer(description: string) {
        const borrow = (index: number) => {
            if (this._cardsBorrowedByPlayers[`${index}`]) {throw new Error(Errors.cardAlreadyBorrowed)}
            this._cardsBorrowedByPlayers[`${index}`] = true;
        }
        this._makeOperationOnCard(description, borrow);
    }
    returnBorrowedCard(description: string) {
        const borrow = (index: number) => {this._cardsBorrowedByPlayers[`${index}`] = false}
        this._makeOperationOnCard(description, borrow);
    }

    private _getNextNotSuspendedCard = () => {
        if (this._areAllCardsSuspended) {
            throw new Error('Cannot return any card, all cards are suspended')
        }
        while (true) {
            const cardIndexMappedToShuffled = this._cardsOrder[this._lastDrawnCardIndex];
            const currentCard = this.getDescriptionForCardNr(cardIndexMappedToShuffled);
            this._lastDrawnCardIndex++;
            if (this._lastDrawnCardIndex >= this._cardsOrder.length) {
                this.shuffle();
            }
            if (!this.isSuspended) return currentCard;
        }
    }

    private * _drawACard (): Generator<string> {
        while(true){
            // const cardIndexMappedToShuffled = this._cardsOrder[this._lastDrawnCardIndex];
            // const currentCard = this.getDescriptionForCardNr(cardIndexMappedToShuffled);
            // this._lastDrawnCardIndex++;
            // if (this._lastDrawnCardIndex >= this._cardsOrder.length) {
            //     this.shuffle();
            //     this._lastDrawnCardIndex = 0;
            // }
            const currentCard = this._getNextNotSuspendedCard();
            yield currentCard;
        }
    }
    drawACard() {
        const card: any = this._drawACard().next().value;
        return card
    }
}