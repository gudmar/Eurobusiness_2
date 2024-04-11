import { tSupportedLanguagesKeys } from "../../Contexts/CurrentLanguage/types";
import { iChanceCardsData } from "../../Data/types";
import { shuffle } from "../../Functions/shuffle";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { ChanceCard } from "./ChanceCard";
import { 
    ChanceCardOperations, iChanceCard,
    tChanceCardOperationMessage, tChanceCardsHolderState,
    tRunOnEachInstanceCallback, tSingleChanceCardState
} from "./types";

export type tChanceCardHolderInstance = ChanceCardHolder;

export const ACTIONS = 'actions'

type tChanceCardHolderInstances = {
    [key: string]: ChanceCardHolder
}

const getDescriptionsFromCards = (cards: iChanceCard[], languageKey: tSupportedLanguagesKeys) => {
    const descriptions = cards.map(({descriptions}) => descriptions[languageKey]);
    return descriptions;
}

export class ChanceCardHolder extends SubscribtionsHandler<ChanceCardOperations, tChanceCardOperationMessage> {
    
    static instances: tChanceCardHolderInstances;
    protected _cards: iChanceCard[] = [];
    private _cardsSetName: string = ''; // BLUE // RED
    private _lastDrawnCardIndex = 0;

    get state(): tChanceCardsHolderState {
        // TO set this state : delete instances, and build this from the scratch
        const cardsInOrder: tSingleChanceCardState[] = this._cards.map((card) => card.state);
        return {
            cardsInOrder,
            cardsSetName: this._cardsSetName,
            lastDrawnCardIndex: this._lastDrawnCardIndex,            
        }
    }
    constructor(state: tChanceCardsHolderState);
    constructor(cards: iChanceCardsData);
    public constructor(args: iChanceCardsData | tChanceCardsHolderState) {
        super();
        if ('cardsSetName' in args) {
            const instance = this._constructFromCards(args);
            return instance;
        } else {
            const instance = this._constructFromState(args as tChanceCardsHolderState)
            return instance;
        }
    }

    private _constructFromState (cards: tChanceCardsHolderState) {
        this._cardsSetName             = cards.cardsSetName; // BLUE_CARDS_SET or RED_CARDS_SET, noun
        this._lastDrawnCardIndex      = cards.lastDrawnCardIndex;
        const cardsInOrder = cards.cardsInOrder.map((card) => new ChanceCard(card))
        return this;
    }

    private _constructFromCards (cards: iChanceCardsData) {
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
        const nrOfCards = Object.keys(this._cards).length
        return nrOfCards;
    }
    private get _areAllCardsSuspended() {
        const nrOfLockedCards = this._cards.filter(({isBorrowedToPlayer}) => isBorrowedToPlayer).length
        const nrOfCards = this._cards.length;
        return nrOfCards === nrOfLockedCards;
    }

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

    
    private _getNextNotSuspendedCard = () => {
        if (this._areAllCardsSuspended) {
            throw new Error('Cannot return any card, all cards are suspended')
        }
        while (true) {
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
        console.log(descriptions)
        return descriptions;
    }

    getBorrowedCardsDescriptions(languageKey: tSupportedLanguagesKeys) {
        const borrowed = this._cards.filter(({isBorrowedToPlayer}) => isBorrowedToPlayer);
        const descriptions = borrowed.map(({descriptions}) => descriptions[languageKey])
        return descriptions;
    }

    static clearAllInstances() { ChanceCardHolder.instances = {};}

    get currentCardIndex() {return this._lastDrawnCardIndex}

    get isCurrentCardCollectable() { return !!this._cards[this.currentCardIndex].isCollectable }

    getCollectableCards(languageKey: tSupportedLanguagesKeys) {
        const collectable = this._cards.filter(({isCollectable})=> isCollectable);
        const descriptions = collectable.map(({descriptions}) => descriptions[languageKey]);
        return descriptions;
    }

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

    shuffle() { // ALREADY UPDATED
        const newCardOrder = shuffle(this._cards) as ChanceCard[];
        this._cards = newCardOrder;
        this._lastDrawnCardIndex = 0;
    }

    borrowCardToAPlayer(description: string) {
        const cardIndex = this.getCardIndexByDescription(description);
        console.log('Index:', cardIndex);
        this._cards[cardIndex].borrow();
    }

    returnBorrowedCard(description: string) {
        const cardIndex = this.getCardIndexByDescription(description);
        this._cards[cardIndex].return();
    }

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
}