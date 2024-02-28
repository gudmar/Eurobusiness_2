import { EN, PL } from "../../Contexts/CurrentLanguage/const";
import { BLUE_CARDS_SET_NAME, CHANCE_CARDS_BLUE } from "../../Data/chanceCards";
import { iChanceCardsData } from "../../Data/types";
import { range } from "../../Functions/createRange";
import { mockMathRandom, zeroRandomGenerator } from "../../Functions/testUtils";
import { iDictionary } from "../../Types/types";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";
import { Errors } from "../Chance/errors";
import { tChance } from "../Chance/types";
import { Commands } from "../Commander/commands";

export const YELLOW_1: iChanceCardsData = {
    cardsSetName: 'yellow',
    0: {
        descriptions: {
            [EN]: 'a',
            [PL]: 'aPL',
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 400,
            }
        ],
    },
    1: {
        descriptions: {
            [EN]: 'b',
            [PL]: 'bPL',
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 200,    
            }
        ]
    },
    2: {
        descriptions: {
            [EN]: 'c',
            [PL]: 'cPL',
        },
        actions: [
            {
                type: Commands.GetMoneyFromEachPlayer,
                payload: 20,    
            }
        ],
        metadata: {
            isCollectable: true
        }
    },
    3: {
        descriptions: {
            [EN]: 'd',
            [PL]: 'dPL',
        },
        actions: [
            {
                type: Commands.GoToFieldConditionalyPassStart,
            }
        ],
    },
    4: {
        descriptions: {
            [EN]: 'e',
            [PL]: 'ePL',
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 400,
            }
        ],
    },
    5: {
        descriptions: {
            [EN]: 'f',
            [PL]: 'fPL'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 20,
            }
        ]
    },
}

export const YELLOW_2: iChanceCardsData= {
    cardsSetName: 'yellow',
    0: {
        descriptions: {
            [EN]: 'g',
            [PL]: 'gPL'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 400,    
            }
        ]
    },
    1: {
        descriptions: {
            [EN]: 'h',
            [PL]: 'hPL'
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 400,    
            }
        ]
    },
    2: {
        descriptions: {
            [EN]: 'i',
            [PL]: 'iPL'
        },
        actions: [
            {
                type: Commands.GetMoneyFromEachPlayer,
                payload: 20,
            }
        ]
    },
    3: {
        descriptions: {
            [EN]: 'j',
            [PL]: 'jPL'
    },
        actions: [
            {
                type: Commands.GetMoneyFromEachPlayer,
                payload: 20,
            }
        ]
    },
    4: {
        descriptions: {
            [EN]: 'k',
            [PL]: 'KPL'
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 400,
            }
        ]
    },
    5: {
        descriptions: {
            [EN]: 'l',
            [PL]: 'lPL'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 20,
            }
        ]
    },    
}

export const ORANGE: iChanceCardsData = {
    cardsSetName: 'orange',
    0: {
        descriptions: {
            [EN]: 'm',
            [PL]: 'mPL'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 400,
            }
        ]
    },
    1: {
        descriptions: {
            [EN]: 'n',
            [PL]: 'nPL'
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 200,
            }
        ]
    },
    2: {
        descriptions: {
            [EN]: 'o',
            [PL]: 'oPL'
        },
        actions: [
            {
                type: Commands.GetMoneyFromEachPlayer,
                payload: 20,
            }
        ]
    },
    3: {
        descriptions: {
            [EN]: 'p',
            [PL]: 'pPL'
        },
        actions: [
            {
                type: Commands.GoToFieldConditionalyPassStart,
                payload: 400,
            }
        ]
    },
    4: {
        descriptions: {
            [EN]: 'r',
            [PL]: 'rPL'
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 400,
            }
        ]
    },
    5: {
        descriptions: {
            [EN]: 's',
            [PL]: 'sPL'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 400,
            }
        ]
    },
}

export const GRAY: iChanceCardsData = {
    cardsSetName: 'gray',
    0: {
        descriptions: {
            [EN]: 'g',
            [PL]: 'gPL'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 400,
            }
        ],
        metadata: {
            isCollectable: true
        }
    },
    1: {
        descriptions: {
            [EN]: 'r',
            [PL]: 'rPL'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 400,
            }
        ],
        metadata: {
            isCollectable: true
        }
    },
    2: {
        descriptions: {
            [EN]: 'a',
            [PL]: 'aPL'
        },
        actions: [
            {
                type: Commands.GetMoneyFromEachPlayer,
                payload: 20,
            }
        ],
        metadata: {
            isCollectable: true
        }
    },
    3: {
        descriptions: {
            [EN]: 'y',
            [PL]: 'yPL'
        },
        actions: [
            {
                type: Commands.GoToFieldConditionalyPassStart,
            }
        ],
    },
    4: {
        descriptions: {
            [EN]: 'c',
            [PL]: 'cPL'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 20,
            }
        ],
        metadata: {
            isCollectable: true
        }
    },
    // metadata: {
    //     1: {collectable: true},
    //     3: {collectable: true},
    //     5: {collectable: true},
    // }
}

export const BLACK: iChanceCardsData = {
    cardsSetName: 'black',
    0: {
        descriptions: {
            [EN]: 'b',
            [PL]: 'bPL'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 400,
            }
        ],
        metadata: {
            isCollectable: true
        }
    },
    1: {
        descriptions: {
            [EN]: 'l',
            [PL]: 'lPL'
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 200,
            }
        ],
    },
    2: {
        descriptions: {
            [EN]: 'a',
            [PL]: 'aPL'
        },
        actions: [
            {
                type: Commands.GetMoneyFromEachPlayer,
                payload: 20,
            }
        ],
        metadata: {
            isCollectable: true
        }
    },
    3: {
        descriptions: {
            [EN]: 'c',
            [PL]: 'cPL'
        },
        actions: [
            {
                type: Commands.GoToFieldConditionalyPassStart,
            }
        ],
    },
    4: {
        descriptions: {
            [EN]: 'k',
            [PL]: 'kPL'
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 400,
            }
        ],
        metadata: {
            isCollectable: true
        }
    },
    5: {
        descriptions: {
            [EN]: '_',
            [PL]: '_PL'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 20,
            }
        ],
    },
}


describe('Testing ChanceCardHolder', () => {
    afterEach(() => {
        ChanceCardHolder.instances = {};
    })
    describe('Uploading cards to the memory', () => {
        it('Should upload all blue cards from data folder, when requested to do so', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const state = instance.state;
            const nrOfCards = state.cardsInOrder.length;
            const name = state.cardsSetName;
            const index = state.lastDrawnCardIndex;
            const cardNr5Description = instance.state.cardsInOrder[5].descriptions[EN];
            const expectedNrOfCards = 16;
            
            const expectedCardDescription = CHANCE_CARDS_BLUE[5].descriptions[EN];
            expect(nrOfCards).toEqual(expectedNrOfCards);
            expect(cardNr5Description).toEqual(expectedCardDescription)
            expect(name).toBe(BLUE_CARDS_SET_NAME)
            expect(index).toBe(0);
        });
    })
    describe('Delivering cards', () => {
        const arrToObjectAsKeys = (arr: string[]) => arr.reduce((acc: iDictionary, item: string) => {
            acc[item] = true;
            return acc;
        }, {})
        const getEnglishDescriptionsFromData = (cardsData: iChanceCardsData) => {
            const result = (Object.entries(CHANCE_CARDS_BLUE).filter(([key]) => (typeof key === 'number')) as any[]).map(({descriptions}) => descriptions[EN])
            return result;
        }
        const getEnglishDescriptionsFromInstance = (instance: ChanceCardHolder) => {
            const cards = instance.state.cardsInOrder;
            const descriptions = cards.map(({descriptions}) => descriptions[EN]);
            return descriptions;
        }
        it('Should draw cards in shuffled order, when requested to draw a card', () => {
            const expectedDescriptions = getEnglishDescriptionsFromData(CHANCE_CARDS_BLUE).reverse()
            // const expectedDescriptions = [...Object.values(CHANCE_CARDS_BLUE.descriptions.en)].reverse();
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const result = mockMathRandom(zeroRandomGenerator, () => {
                instance.shuffle();
                const shuffledCards = range(expectedDescriptions.length - 1).map((_) => {
                    return instance.drawACard(EN);
                })
                return shuffledCards;
            })
            expect(result).toEqual(expectedDescriptions);
        });
        it('Should reshuffle the library when drawn cards come to the end', () => {
            const descriptions = getEnglishDescriptionsFromData(CHANCE_CARDS_BLUE);
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const descriptionsBeforeShuffle = getEnglishDescriptionsFromInstance(instance);
            const cardsBeforeShuffle = range(descriptions.length - 1).map(() => instance.drawACard(EN));
            const descriptionsAfterShuffle = getEnglishDescriptionsFromInstance(instance);
            const cardsAfterShuffle = range(descriptions.length - 1).map(() => instance.drawACard(EN));
            expect(cardsBeforeShuffle).not.toEqual(cardsAfterShuffle);
            expect(cardsBeforeShuffle).toEqual(descriptionsBeforeShuffle);
            expect(cardsAfterShuffle).toEqual(descriptionsBeforeShuffle);


            const descriptionsAsKeys = arrToObjectAsKeys(descriptions);
            // const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            // const cardsBeforeShuffle = range(descriptions.length - 1).map(() => instance.drawACard());
            // const cardsAfterShuffle = range(descriptions.length - 1).map(() => instance.drawACard());
            // const cardsBeforeAsKeys = arrToObjectAsKeys(cardsBeforeShuffle);
            // const cardsAfterAsKeys = arrToObjectAsKeys(cardsAfterShuffle);
            // expect(cardsBeforeShuffle).not.toEqual(cardsAfterShuffle);
            // expect(cardsBeforeAsKeys).toEqual(cardsAfterAsKeys);
            // expect(cardsBeforeAsKeys).toEqual(descriptionsAsKeys);
        });
    });
    describe('Testing if ChanceCarHolder creates a separate constatn instance for each card color', () => {
        it('Should create only one instance for a yellow color if an attempt to create a few yellow instances', () => {
            const instance1 = new ChanceCardHolder(YELLOW_1);
            const instance2 = new ChanceCardHolder(YELLOW_2);
            expect(instance1 === instance2).toBeTruthy()
        });
        it('Should create only one red instance, that is separate from a yellow instance, when attempt to create a blue instance and a orange instance', () => {
            const instance1 = new ChanceCardHolder(YELLOW_1);
            const instance2 = new ChanceCardHolder(ORANGE);
            expect(instance1 === instance2).toBeFalsy()
        });
    });
    describe('Search card index by description', () => {
        it('Should return -1 when given card description cannot be found in any language', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const englishIndex = instance.getCardIndexByDescription('Not existing description');
            expect(englishIndex).toBe(-1)
        })
        
        it('Should find a card index, when its description given in any language', () => {
            const englishDescription = CHANCE_CARDS_BLUE.descriptions.en[5];
            const polishDescription = CHANCE_CARDS_BLUE.descriptions.pl[5];
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const englishIndex = instance.getCardIndexByDescription(englishDescription);
            const polishIndex = instance.getCardIndexByDescription(polishDescription);
            expect(englishIndex).toBe(5)
            expect(polishIndex).toBe(5);
        })
    })
    const getArrayOfNotRepetingCards = (instance: ChanceCardHolder) => {
        const cards: string[] = [];
        while(true) {
            const card = instance.drawACard();
            if (cards.includes(card)) { return cards }
            cards.push(card)
        }
    }
    describe('Lending a card to a player', () => {
        it('Should not suspend a card when it is not collectable', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            instance.suspendCard(CHANCE_CARDS_BLUE.descriptions.en[2]);
            const allNotRepetingCards = getArrayOfNotRepetingCards(instance);
            expect(allNotRepetingCards.length).toBe(16)
        })
        it('Should suspend a card from game operations when player draws a collectible card', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            instance.borrowCardToAPlayer(CHANCE_CARDS_BLUE.descriptions.en[6]);
            const allNotRepetingCards = getArrayOfNotRepetingCards(instance);
            expect(allNotRepetingCards.length).toBe(15)

        });
        it('Should throw an error when there is an attempt to lend a non-collectible card to a pleyer', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const borrow = () => instance.borrowCardToAPlayer(CHANCE_CARDS_BLUE.descriptions.en[2])
            expect(borrow).toThrow(Errors.cardNotCollectable)
        });
        it('Should not allow to draw a card, when it is borrowed', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            instance.borrowCardToAPlayer(CHANCE_CARDS_BLUE.descriptions.en[6]);
            const allNotRepetingCards = getArrayOfNotRepetingCards(instance);
            expect(allNotRepetingCards.length).toBe(15)

        })
        it('Should allow to draw a collectible card when it is returned', () => {
            const instance = new ChanceCardHolder(CHANCE_CARDS_BLUE);
            const TEST_CARD = CHANCE_CARDS_BLUE.descriptions.en[6]
            instance.borrowCardToAPlayer(TEST_CARD);
            const nrOfAllCardsAfterLending = getArrayOfNotRepetingCards(instance).length;
            instance.returnBorrowedCard(TEST_CARD);
            instance.shuffle();
            const nrOfAllCardsAfterReturning = getArrayOfNotRepetingCards(instance).length;
            expect(nrOfAllCardsAfterLending).toBe(15)
            expect(nrOfAllCardsAfterReturning).toBe(16)

        });
    })
    describe('Testing delivery of collectable cards', () => {
        it('Should return a set of collectable cards when asked for it', () => {
            const instance = new ChanceCardHolder(GRAY);
            const collectableCards = instance.collectableCards;
            expect(collectableCards).toEqual(['r', 'y', 'o']);
        })
        it('Should return a set of not borrowed cards when asked to do so', () => {
            const instance = new ChanceCardHolder(GRAY);
            instance.borrowCardToAPlayer('y');
            const collectableCards = instance.availableCollectableCards;
            expect(collectableCards).toEqual(['r', 'o']);
        })
        it('Should provide a static method making a report of all collectable cards in each pile color', () => {
            const blackInstance = new ChanceCardHolder(BLACK)
            const grayInstance = new ChanceCardHolder(GRAY)
            blackInstance.borrowCardToAPlayer('a');
            grayInstance.borrowCardToAPlayer('r');
            const notBorrowedCardsExpectedReport = {
                black: ['b', 'k'],
                gray: ['y','o']
            };
            const expectedCollectableCardsReport = {
                black: ['b', 'a', 'k'],
                gray: ['r','y','o']
            }
            const notBorrowedReport = ChanceCardHolder.notBorrowedCards;
            const collectableReport = ChanceCardHolder.collectableCards;
            expect(notBorrowedReport).toEqual(notBorrowedCardsExpectedReport);
            expect(collectableReport).toEqual(expectedCollectableCardsReport);
        })
    })
})
