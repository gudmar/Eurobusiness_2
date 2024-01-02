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

type tReduceInstancesCallback = (instance: tChanceCardHolderInstance, index?: number) => any;

export type tChanceCardHolderInstance = ChanceCardHolder;

export class ChanceCardHolder {
    
    static instances: ChanceCardHolderInstance;
    private _cardsDescriptions?: tLanguageDescriptionEntry[];
    private _cardsActions?: iActions;
    private _cardsMetadata?: tCardMetadata;
    private _language: string = LanguageNameToShortName.english;
    private _cardSetName: string = '';
    private _cardsOrder!: number[];
    private _lastDrawnCardIndex = 0;
    _cardsBorrowedByPlayers: tBorrowedCards = {}

    constructor(cards: tChance) {
        if (Object.values(ChanceCardHolder?.instances?.[cards.cardSetName] || {}).some(i => i.collectable === true || i.collectable === false) ) {
            throw new Error('CARD ALREADY BORROWED')
        }
        if (ChanceCardHolder?.instances?.[cards.cardSetName]) {
            return ChanceCardHolder.instances[cards.cardSetName]
        }
        if (!ChanceCardHolder.instances) { ChanceCardHolder.instances = {} }
        this._initializeCardsObject(cards);
        ChanceCardHolder.instances[cards.cardSetName] = this;
        this._cardSetName = cards.cardSetName;
    }
    private get _nrOfCards() {
        const nrOfCards = Object.keys(this._cardsDescriptions![0]).length
        return nrOfCards;
    }
    private get _availableLanguageShortcuts() {
        const result = this._cardsDescriptions!.map(({languageShortName}: tLanguageDescriptionEntry) => languageShortName);
        return result;
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
    private get _initalCardOrder() {
        return range(Object.values(this.descriptions).length - 1)
    }
    private _getMetadataForCardNr(nr: number): tCardMetadataBit {
        return this._cardsMetadata?.[`${nr}`] || {}
    }
    private _makeOperationOnCard(description: string, callback: (index: number) => void) {
        const cardIndex = this.getCardIndexByDescription(description);
        if (cardIndex === -1) {throw new Error(Errors.cardDoesNotExist)}        
        if (!this._isCardCollectable(cardIndex)) { throw new Error(`${Errors.cardNotCollectable}: ${this._cardSetName}`)};
        callback(cardIndex);

    }


    private _initializeCardsObject(cardsDescriptor: tChance ) {
        this._cardsActions = cardsDescriptor?.actions;
        this._cardsDescriptions = getDescriptionsInLanguages(cardsDescriptor);
        this._cardsMetadata = cardsDescriptor?.metadata || {};
        this._cardsOrder = this._initalCardOrder;
        this.shuffle();
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

    private _getIndexOfCardByDescriptionInLanguage(languageName: string, description: string) {
        const descriptions = this._getCardsDescriptionsByLanguage(languageName);
        const result = Object.entries(descriptions).find(([key, value]) => {
            return value === description
        });
        if (result) {return parseInt(result[0])}
        return -1;
    }

    private _isCardCollectable(index: number) {
        const metadata = this._getMetadataForCardNr(index);
        return !!(metadata?.collectable);
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
            if (!this._isTargetCardSuspended(cardIndexMappedToShuffled)) return currentCard;
        }
    }

    private * _drawACard (): Generator<string> {
        while(true){
            const currentCard = this._getNextNotSuspendedCard();
            yield currentCard;
        }
    }

    private _isTargetCardSuspended(index: number) {
        return this._cardsBorrowedByPlayers[`${index}`];
    }

    

    private static _calculateForEachInstance(callback: tReduceInstancesCallback) {
        const instanceEntries = Object.entries(ChanceCardHolder.instances);
        const result = instanceEntries.reduce((acc: any, entry, index) => {
            const [key, instance] = entry;
            acc[key] = callback(instance, index);
            return acc;
        }, {})
        return result;
    }

    static get notBorrowedCards() {
        const callback = (instance: ChanceCardHolder) => instance.availableCollectableCards;
        const result = ChanceCardHolder._calculateForEachInstance(callback);
        return result;
    }

    static get collectableCards() {
        const callback = (instance: ChanceCardHolder) => instance.collectableCards;
        const result = ChanceCardHolder._calculateForEachInstance(callback);
        return result;
    }

    get borrowedCardsDescriptions() {
        const borrowed = Object.keys(this._cardsBorrowedByPlayers).map((i) => parseInt(i));
        const descriptions: string[] = borrowed.map((id) => this.descriptions[id]);
        return descriptions;
    }

    static clearAllInstances() { ChanceCardHolder.instances = {};}

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
    get isSuspended() {
        return this._cardsBorrowedByPlayers[`${this._lastDrawnCardIndex}`];
    }
    get currentCardIndex() {return this._cardsOrder[this._lastDrawnCardIndex]}
    get isCurrentCardCollectable() { return !!this._getMetadataForCardNr(this.currentCardIndex) }
    get collectableCards() {
        const collectableEntries = Object.entries(this._cardsMetadata || {}).filter(([key, value]) => value?.collectable === true);
        const collectableIndexes = collectableEntries.map(([key]) => parseInt(key));
        const descriptions = collectableIndexes.map((index) => this.getDescriptionForCardNr(index));
        return descriptions;
    }
    get availableCollectableCards() {
        const collectableEntries = Object.entries(this._cardsMetadata || {}).filter(([key, value]) => value?.collectable === true);
        const collectableIndexes = collectableEntries.map(([key]) => parseInt(key));
        const availableCollectableIndexes = collectableIndexes.filter((index) => this._cardsBorrowedByPlayers[`${index}`] !== true)
        console.log(availableCollectableIndexes)
        const descriptions = availableCollectableIndexes.map((index) => this.getDescriptionForCardNr(index));
        return descriptions;
    }
    get descriptionsInShufledOrder() {
        return this._cardsOrder.map((id) => this.descriptions[id]);
    }


    getCardIndexByDescription(description: string) {
        const languageShortcut = this._availableLanguageShortcuts.find((shortName: string) => this._getIndexOfCardByDescriptionInLanguage(shortName, description) !== -1);
        if (!languageShortcut) return -1
        const index = this._getIndexOfCardByDescriptionInLanguage(languageShortcut, description);
        return index;
    }

    getDescriptionForCardNr(nr:number) { 
        const key: string = `${nr}`;
        return this.descriptions?.[key]
    }
    getActionsForCardNr(nr:number) { 
        const key: string = `${nr}`;
        return this.actions?.[key]
    }

    suspendCard(description: string) {        
        const cardIndex = this.getCardIndexByDescription(description);
        const isCardCollectable = this._isCardCollectable(cardIndex)
        if (isCardCollectable) {
            this._cardsBorrowedByPlayers[cardIndex] = true;
        }
    }
    
    shuffle() {
        const newCardOrder = shuffle(this._initalCardOrder) as number[];
        this._cardsOrder = newCardOrder;
        this._lastDrawnCardIndex = 0;
    }

    borrowCardToAPlayer(description: string) {
        const borrow = (index: number) => {
            if (this._cardsBorrowedByPlayers[`${index}`]) {throw new Error(Errors.cardAlreadyBorrowed)}
            this._cardsBorrowedByPlayers[`${index}`] = true;
            console.log('Borrowed', index, this._cardsBorrowedByPlayers)
        }
        this._makeOperationOnCard(description, borrow);
    }
    returnBorrowedCard(description: string) {
        const returnCard = (index: number) => {
            this._cardsBorrowedByPlayers[`${index}`] = false
            console.log('Returned ', index, this._cardsBorrowedByPlayers)
        }
        this._makeOperationOnCard(description, returnCard);
    }

    private static _getBorrowFunctions(cardDescription: string ) {
        const borrowFunctions = Object.values(ChanceCardHolder.instances).map((instance: ChanceCardHolder) => {
            return instance.borrowCardToAPlayer.bind(instance, cardDescription)
        })
        return borrowFunctions        
    }

    private static _getReturnFunctions(cardDescription: string ) {
        const returnFunctions = Object.values(ChanceCardHolder.instances).map((instance: ChanceCardHolder) => {
            return instance.returnBorrowedCard.bind(instance, cardDescription)
        })
        return returnFunctions        
    }

    private static _makeOperationsOnEachInstatnce(operations: (() => void) []) {
        const isOperationSuccessfull = operations.some((func: () => void) => {
            try{ 
                func(); 
                return true 
            }
            catch(e) {
                console.error(e)
                return false
            }
        })
        return isOperationSuccessfull;
    }

    static borrowCard(description: string) {
        console.log('%cStatic borrow', 'color: red')
        const borrowOperations = ChanceCardHolder._getBorrowFunctions(description);
        const result = ChanceCardHolder._makeOperationsOnEachInstatnce(borrowOperations);
        return result;
    }
    static returnCard(description: string) {
        console.log('%cStatic return', 'color: green')
        const returnOperations = ChanceCardHolder._getReturnFunctions(description);
        const result = ChanceCardHolder._makeOperationsOnEachInstatnce(returnOperations);
        console.log(ChanceCardHolder.instances)
        return result;
    }

    drawACard() {
        const card: any = this._drawACard().next().value;
        return card
    }

    get cardsOrder() {return this._cardsOrder}
}