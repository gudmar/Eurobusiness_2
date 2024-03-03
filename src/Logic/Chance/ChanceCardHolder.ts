import { tSupportedLanguagesKeys } from "../../Contexts/CurrentLanguage/types";
import { iChanceCardsData } from "../../Data/types";
import { range } from "../../Functions/createRange";
import { shuffle } from "../../Functions/shuffle";
import { iDictionary } from "../../Types/types";
import { ChanceCard } from "./ChanceCard";
import { Errors } from "./errors";
import { iActions, iChanceCard, iDescription, tBorrowedCards, tCardMetadata, tCardMetadataBit, tChance, tChanceCardsHolderState, tPlayerName, tRunOnEachInstanceCallback, tSingleChanceCardState } from "./types";

export type tChanceCardHolderInstance = ChanceCardHolder;

type tReduceInstancesCallback = (instance: tChanceCardHolderInstance, index?: number) => any;

// export const LanguageNameToShortName: iDictionary = {
//     english: 'en',
//     polish: 'pl'
// }

export const ACTIONS = 'actions'

// type tLanguageDescriptionEntry =     {
//     languageFullName: string,
//     languageShortName: string,
//     descriptions: iDescription
// }

// const getLanguageFullName = (shortcut: string):string => {
//     const fullName = Object.keys(LanguageNameToShortName).filter((name: string) => LanguageNameToShortName[name] === shortcut);
//     return fullName?.[0] || ''
// }

// const getDescriptionsInLanguages = ({descriptions}: tChance):tLanguageDescriptionEntry[] => {
//     const shortcuts = Object.keys(descriptions);
//     const descriptionsInLanguages: tLanguageDescriptionEntry[] = shortcuts.map((shortName: string):tLanguageDescriptionEntry => {
//         const descriptionsResult: iDescription = descriptions[shortName]
//         const result = {
//             languageShortName: shortName,
//             languageFullName: getLanguageFullName(shortName),
//             descriptions: descriptionsResult,
//          }
//          return result;
//         }
//     );
//     return descriptionsInLanguages;
// }

type tChanceCardHolderInstances = {
    [key: string]: ChanceCardHolder
}

const getDescriptionsFromCards = (cards: iChanceCard[], languageKey: tSupportedLanguagesKeys) => {
    const descriptions = cards.map(({descriptions}) => descriptions[languageKey]);
    return descriptions;
}


export class ChanceCardHolder {
    
    static instances: tChanceCardHolderInstances;
    // private _cardsDescriptions?: tLanguageDescriptionEntry[];
    // private _cardsActions?: iActions;
    // private _cardsMetadata?: tCardMetadata;
    // private _language: string = LanguageNameToShortName.english;
    protected _cards: iChanceCard[] = [];
    private _cardsSetName: string = ''; // BLUE // RED
    // private _cardsOrder!: number[];
    private _lastDrawnCardIndex = 0;
    // _cardsBorrowedByPlayers: tBorrowedCards = {}

    get state(): tChanceCardsHolderState {
        // TO set this state : delete instances, and build this from the scratch
        const cardsInOrder: tSingleChanceCardState[] = this._cards.map((card) => card.state);
        return {
            // cardsDescriptions: this._cardsDescriptions,
            // cardsActions: this._cardsActions,
            // cardsMetaData: this._cardsMetadata,
            // language: this._language,
            cardsInOrder,
            cardsSetName: this._cardsSetName,
            // cardsOrder: this.cardsOrder,
            lastDrawnCardIndex: this._lastDrawnCardIndex,
            // cardsBorrewedByPlayers: this._cardsBorrowedByPlayers,
            
        }
    }
    constructor(state: tChanceCardsHolderState);
    constructor(cards: iChanceCardsData);
    public constructor(args: iChanceCardsData | tChanceCardsHolderState) {
        if ('cardsSetName' in args) {
            const instance = this._constructFromCards(args);
            return instance;
        } else {
            const instance = this._constructFromState(args as tChanceCardsHolderState)
            return instance;
        }
    }

    private _constructFromState (cards: tChanceCardsHolderState) {
        // this._cardsDescriptions       = cards.cardsDescriptions;
        // this._cardsActions            = cards.cardsActions;
        // this._cardsMetadata           = cards.cardsMetaData;
        // this._language                = cards.language;
        this._cardsSetName             = cards.cardsSetName; // BLUE_CARDS_SET or RED_CARDS_SET, noun
        // this._cardsOrder              = cards.cardsOrder;
        this._lastDrawnCardIndex      = cards.lastDrawnCardIndex;
        const cardsInOrder = cards.cardsInOrder.map((card) => new ChanceCard(card))
        // this._cardsBorrowedByPlayers = cards.cardsBorrewedByPlayers;
        return this;
    }

    private _constructFromCards (cards: iChanceCardsData) {
        // if (Object.values(ChanceCardHolder?.instances?.[cards.cardSetName] || {}).some(i => i.collectable === true || i.collectable === false) ) {
        //     throw new Error('CARD ALREADY BORROWED')
        // }
        if (ChanceCardHolder?.instances?.[cards.cardsSetName]) {
            return ChanceCardHolder.instances[cards.cardsSetName]
        }
        if (!ChanceCardHolder.instances) { ChanceCardHolder.instances = {} }
        this._initializeCardsObject(cards);
        ChanceCardHolder.instances[cards.cardsSetName] = this;
        this._cardsSetName = cards.cardsSetName;
        return this
    }

    private get _nrOfCards() {
        // const nrOfCards = Object.keys(this._cardsDescriptions![0]).length
        const nrOfCards = Object.keys(this._cards).length
        return nrOfCards;
    }
    // private get _availableLanguageShortcuts() {
    //     const result = this._cardsDescriptions!.map(({languageShortName}: tLanguageDescriptionEntry) => languageShortName);
    //     return result;
    // }
    private get _areAllCardsSuspended() {
        const nrOfLockedCards = this._cards.filter(({isBorrowedToPlayer}) => isBorrowedToPlayer).length
        // const nrOfLockedCards = Object.entries(this._cardsBorrowedByPlayers).reduce((acc: number, entry: any) => {
        //     const [key, value] = entry;
        //     if (value) acc++;
        //     return acc
        // }, 0)
        const nrOfCards = this._cards.length;
        return nrOfCards === nrOfLockedCards;
    }
    // private get _initalCardOrder() {
    //     return range(Object.values(this.descriptions).length - 1)
    // }
    // private _getMetadataForCardNr(nr: number): tCardMetadataBit {

    //     return this._cards[nr]_cardsMetadata || {}
    // }

    // private _makeOperationOnCard(description: string, callback: (index: number) => void) {
    //     const cardIndex = this.getCardIndexByDescription(description);
    //     if (cardIndex === -1) {throw new Error(Errors.cardDoesNotExist)}        
    //     if (!this._isCardCollectable(cardIndex)) { throw new Error(`${Errors.cardNotCollectable}: ${this._cardSetName}`)};
    //     callback(cardIndex);

    // }


    private _initializeCardsObject(cardsDescriptor: iChanceCardsData ) {
        const entries = Object.entries(cardsDescriptor);
        entries.forEach(([key, value]) => {
            if (!isNaN(parseInt(key))) {
                this._cards.push(new ChanceCard(value))
            } else {
                if (key === 'cardsSetName') this._cardsSetName = value
                else {throw new Error(`Key ${key} not supported by ChanceCarHolder constructor`)}
            }
        })
        this.shuffle();
    }

    // private _getCardsDescriptionsByShortName(shortName: string) {
    //     const result: tLanguageDescriptionEntry | undefined = this._cardsDescriptions?.find(
    //         ({languageShortName}: tLanguageDescriptionEntry) => languageShortName === shortName
    //     )
    //     return result?.descriptions;
    // }
    // private _getCardsDescriptionsByLongName(longName: string) {
    //     const result: tLanguageDescriptionEntry | undefined = this._cardsDescriptions?.find(
    //         ({languageShortName}: tLanguageDescriptionEntry) => languageShortName === longName
    //     )
    //     return result?.descriptions;
    // }

    // private _getCardsDescriptionsByLanguage(languageName: string) {
    //     return this._getCardsDescriptionsByShortName(languageName) || this._getCardsDescriptionsByLongName(languageName) || {}
    // }

    // private _getIndexOfCardByDescriptionInLanguage(languageName: string, description: string) {
    //     const descriptions = this._getCardsDescriptionsByLanguage(languageName);
    //     const result = Object.entries(descriptions).find(([key, value]) => {
    //         return value === description
    //     });
    //     if (result) {return parseInt(result[0])}
    //     return -1;
    // }

    // private _isCardCollectable(index: number) {
    //     const metadata = this._getMetadataForCardNr(index);
    //     return !!(metadata?.collectable);
    // }
    
    private _getNextNotSuspendedCard = () => {
        if (this._areAllCardsSuspended) {
            throw new Error('Cannot return any card, all cards are suspended')
        }
        while (true) {
            // const cardIndexMappedToShuffled = this._cardsOrder[this._lastDrawnCardIndex];
            // const currentCard = this.getDescriptionForCardNr(cardIndexMappedToShuffled);
            const currentCard = this._cards[this._lastDrawnCardIndex];
            this._lastDrawnCardIndex++;
            if (this._lastDrawnCardIndex >= this._cards.length) {
                this.shuffle();
            }
            if (!currentCard.isBorrowedToPlayer) return currentCard;
        }
    }

    private * _drawACard (): Generator<iChanceCard> {
        while(true){
            const currentCard = this._getNextNotSuspendedCard();
            yield currentCard;
        }
    }

    // private _isTargetCardSuspended(index: number) {
    //     return this._cardsBorrowedByPlayers[`${index}`];
    // }

    

    // private static _calculateForEachInstance(callback: tReduceInstancesCallback) {
    //     const instanceEntries = Object.entries(ChanceCardHolder.instances);
    //     const result = instanceEntries.reduce((acc: any, entry, index) => {
    //         const [key, instance] = entry;
    //         acc[key] = callback(instance, index);
    //         return acc;
    //     }, {})
    //     return result;
    // }

    private static get allCards() {
        const allCards = Object.values(ChanceCardHolder.instances).map((instance) => instance._cards).flat();
        return allCards
    }

    private static _runOnEachInstance<ReturnType>(callback: tRunOnEachInstanceCallback<ReturnType>) {
        const allCards = Object.entries(ChanceCardHolder.instances).reduce((acc: any, [name, instance]: [string, ChanceCardHolder]) => {
                const result: any = callback(instance);
                acc[name] = result;
                return acc
        }, {});
        return allCards
    }

    static getAllCollectableCardDescriptionsInSets(languageKey: tSupportedLanguagesKeys) {
        const getDescription = (instance: ChanceCardHolder) => 
            instance._cards.filter(({isCollectable}) => isCollectable).map(({descriptions}) => descriptions[languageKey])
        
        const collectablesInSets = ChanceCardHolder._runOnEachInstance(getDescription);
        return collectablesInSets;
    }

    static getAllNotBorrowedCardDescriptionsInSets(languageKey: tSupportedLanguagesKeys) {
        const getDescription = (instance: ChanceCardHolder) =>
            instance._cards.filter(({isCollectable, isBorrowedToPlayer}) => (isCollectable && !isBorrowedToPlayer)).map(({descriptions}) => descriptions[languageKey])
        
        const collectablesInSets = ChanceCardHolder._runOnEachInstance(getDescription);
        return collectablesInSets;
    }

    private static get allCollectableCards() {
        const allCards = ChanceCardHolder.allCards;
        const collectable = allCards.filter(({isCollectable}) => isCollectable)
        return collectable;
    }

    static getCollectableCardsDescriptions(languageKey: tSupportedLanguagesKeys) {
        const allCards = ChanceCardHolder.allCards;
        const collectable = allCards.filter(({isCollectable}) => isCollectable);
        const descriptions = getDescriptionsFromCards(collectable, languageKey);
        return descriptions;
    }

    static getNotBorrowedCardsDescriptions(languageKey: tSupportedLanguagesKeys) {
        const allCollectableCards = ChanceCardHolder.allCollectableCards;
        const notBorrowed = allCollectableCards.filter(({isBorrowedToPlayer}) => !isBorrowedToPlayer);
        const descriptions = notBorrowed.map(({descriptions}) => descriptions[languageKey])
        return descriptions;
    }

    // static get collectableCards() {
    //     const callback = (instance: ChanceCardHolder) => instance.collectableCards;
    //     const result = ChanceCardHolder._calculateForEachInstance(callback);
    //     return result;
    // }

    getBorrowedCardsDescriptions(languageKey: tSupportedLanguagesKeys) {
        const borrowed = this._cards.filter(({isBorrowedToPlayer}) => isBorrowedToPlayer);
        const descriptions = borrowed.map(({descriptions}) => descriptions[languageKey])
        return descriptions;
    }

    static clearAllInstances() { ChanceCardHolder.instances = {};}

    // get descriptions() {
    //     const result = this._getCardsDescriptionsByLanguage(this._language)
    //     return result;
    // }
    // get actions() {
    //     return this._cardsActions;
    // }
    // get nrOfActions() {return Object.values(this._cardsActions || {}).length}
    // get nrOfDescriptions() {
    //     return Object.keys(this.descriptions || {}).length
    // }
    // get isSuspended() {
    //     return this._cardsBorrowedByPlayers[`${this._lastDrawnCardIndex}`];
    // }
    
    // get currentCardIndex() {return this._cardsOrder[this._lastDrawnCardIndex]}
    get currentCardIndex() {return this._lastDrawnCardIndex}

    get isCurrentCardCollectable() { return !!this._cards[this.currentCardIndex].isCollectable }

    getCollectableCards(languageKey: tSupportedLanguagesKeys) {
        const collectable = this._cards.filter(({isCollectable})=> isCollectable);
        const descriptions = collectable.map(({descriptions}) => descriptions[languageKey]);
        return descriptions;
    }

    // get availableCollectableCards() {
    //     const collectableEntries = Object.entries(this._cardsMetadata || {}).filter(([key, value]) => value?.collectable === true);
    //     const collectableIndexes = collectableEntries.map(([key]) => parseInt(key));
    //     const availableCollectableIndexes = collectableIndexes.filter((index) => this._cardsBorrowedByPlayers[`${index}`] !== true)
    //     const descriptions = availableCollectableIndexes.map((index) => this.getDescriptionForCardNr(index));
    //     return descriptions;
    // }
    getDescriptionsInShufledOrder(languageKey: tSupportedLanguagesKeys) {
        const descriptions = this._cards.map(({descriptions}) => descriptions[languageKey])
        return descriptions;
    }

    private static _getIndexByDescription(cards: iChanceCard[], description: string) {
        const index = cards.findIndex(({descriptions}) => {
            const values = Object.values(descriptions);
            const result = values.includes(description);
            return result;
        })
        return index;
    }

    getCardIndexByDescription(description: string) {
        const index = ChanceCardHolder._getIndexByDescription(this._cards, description);
        if (index === -1) throw new Error(`Unable to find a card [${description}]`)
       return index;
    }

    // getDescriptionForCardNr(nr:number) { 
    //     const key: string = `${nr}`;
    //     return this.descriptions?.[key]
    // }
    // getActionsForCardNr(nr:number) { 
    //     const key: string = `${nr}`;
    //     return this.actions?.[key]
    // }

    // suspendCard(description: string) {        
    //     const cardIndex = this.getCardIndexByDescription(description);
    //     const isCardCollectable = this._isCardCollectable(cardIndex)
    //     if (isCardCollectable) {
    //         this._cardsBorrowedByPlayers[cardIndex] = true;
    //     }
    // }
    
    shuffle() { // ALREADY UPDATED
        const newCardOrder = shuffle(this._cards) as ChanceCard[];
        // this._cardsOrder = newCardOrder;
        this._cards = newCardOrder;
        this._lastDrawnCardIndex = 0;
    }

    borrowCardToAPlayer(description: string) {
        const cardIndex = this.getCardIndexByDescription(description);
        console.log('Index:', cardIndex)
        this._cards[cardIndex].borrow();
    }

    returnBorrowedCard(description: string) {
        const cardIndex = this.getCardIndexByDescription(description);
        this._cards[cardIndex].return();
    }

    // private static _getBorrowFunctions(cardDescription: string ) {
    //     const borrowFunctions = Object.values(ChanceCardHolder.instances).map((instance: ChanceCardHolder) => {
    //         return instance.borrowCardToAPlayer.bind(instance, cardDescription)
    //     })
    //     return borrowFunctions        
    // }

    // private static _getReturnFunctions(cardDescription: string ) {
    //     const returnFunctions = Object.values(ChanceCardHolder.instances).map((instance: ChanceCardHolder) => {
    //         return instance.returnBorrowedCard.bind(instance, cardDescription)
    //     })
    //     return returnFunctions        
    // }

    // private static _makeOperationsOnEachInstatnce(operations: (() => void) []) {
    //     const isOperationSuccessfull = operations.some((func: () => void) => {
    //         try{ 
    //             func(); 
    //             return true 
    //         }
    //         catch(e) {
    //             console.error(e)
    //             return false
    //         }
    //     })
    //     return isOperationSuccessfull;
    // }

    static borrowCard(description: string) {
        const allCards = ChanceCardHolder.allCards
        const cardIndex = ChanceCardHolder._getIndexByDescription(allCards, description);
        const result = allCards[cardIndex].borrow()
        return result;
    }
    static returnCard(description: string) {
        const allCards = ChanceCardHolder.allCards
        const cardIndex = ChanceCardHolder._getIndexByDescription(allCards, description);
        const result = allCards[cardIndex].return()
        return result;
    }

    drawACard(languageKey: tSupportedLanguagesKeys) {
        const card: ChanceCard = this._drawACard().next().value;
        const description = card.getDescription(languageKey)
        return description;
    }


    getCollectableCardsDescriptions(languageKey: tSupportedLanguagesKeys) {
        const collectable = this._cards.filter(({isCollectable}) => isCollectable);
        const descriptions = getDescriptionsFromCards(collectable, languageKey);
        return descriptions;
    }

    getAvailableCollectableCards(languageKey: tSupportedLanguagesKeys) {
        const notBorrowed = this._cards.filter(({isCollectable, isBorrowedToPlayer}) => isCollectable && !isBorrowedToPlayer);
        const descriptions = getDescriptionsFromCards(notBorrowed, languageKey);
        return descriptions;
    }


    // get cardsOrder() {return this._cardsOrder}
}