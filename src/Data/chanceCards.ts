import { Commands } from "../Logic/Commander/commands";
import { iChanceCardsData } from "./types";

export const RED_CARDS_SET_NAME = 'Chance cards red';
export const BLUE_CARDS_SET_NAME = 'Chance cards blue';

export const CHANCE_CARDS_RED: iChanceCardsData = {
    cardsSetName: RED_CARDS_SET_NAME,
    0: {
        descriptions: {
            pl: "Zobowiązany jesteś zmodernizować swoje miasto, płacisz za każdy dom 80 $,za każdy hotel 230 $",
            en: "You are obliged to modernize your cities, you pay $80 for each house and $230 for each hotel",    
        },
        actions: [
            {
                type: Commands.PayEachHouse,
                payload: 80
            },
            {
                type: Commands.PayEachHotel,
                payload: 230
            },
        ]
    },
    1: {
        descriptions: {
            pl: "Remontujesz swoje domy. Płacisz do banku za każdy dom 50 $, za każdy hotel 200 $.",
            en: "You renovate your houses. You pay $50 for each house and $200 for each hotel",
        },
        actions: [
            {
                type: Commands.PayEachHouse,
                payload: 50
            },
            {
                type: Commands.PayEachHotel,
                payload: 200
            },
        ]
    },
    2: {
        descriptions: {
            pl: "Wracasz do Madrytu.",
            en: '"You return to Madrit",'
        },
        actions: [
            {
                type: Commands.GoToField,
                payload: 13, // indexing start as 0
            }
        ]
    },
    3: {
        descriptions: {
            pl: "Mandat za szybko jazdę. Płacisz 30 $.",
            en: "Overspeed ticket, you pay $30",
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 30,
            }
        ]
    }, 
    4: {
        descriptions: {
            pl: "Cofasz się o trzy pola.",
            en: "You go back 3 fields",
        },
        actions: [
            {
                type: Commands.GoBack,
                payload: 3,
            }
        ]
    },
    5: {
        descriptions: {
            pl: "Wracasz na start.",
            en: "You go back to start",
        },
        actions: [
            {
                type: Commands.GoToField,
                payload: 0, // indexing start as 0
            }
        ]
    }, 
    6: {
        descriptions: {
            pl: "Rozwiązałeś dobrze krzyżówkę. Jako 1 nagrodę otrzymujesz 200 $.",
            en: "You solved crossword correctly, as a reward you get $200",
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 200
            }
        ]
    },
    7: {
        descriptions: {
            pl: "Idziesz do więzienia. Nie przechodzisz przez start. Nie otrzymujesz premii 400 $.",
            en: "You go to jail. You don't pass start field, and you don't get $400 for passing it",
        },
        actions: [
            {
                type: Commands.GoToFieldConditionalyPassStart,
            }
        ]
    },
    8: {
        descriptions: {
            pl: "Płacisz opłatę za szkołę 300 $.",
            en: "You pay school fee: $300",
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 300,
            }
        ]
    },
    9: {
        descriptions: {
            pl: "Idziesz do Neapolu. Jeżeli przechodzisz przez start otrzymujesz 400 $.",
            en: "You go to Neapol (forward direction). If you pass start, you gain $400 (for passing start field)",
        },
        actions: [
            {
                type: Commands.GoToFieldConditionalyPassStart,
                payload: 6, // indexing start as 0
            }

        ]
    },
    10: {
        descriptions: {
            pl: "Piłeś w czasie pracy, płacisz karę 40 $.",
            en: "You were drinking at work, you are fined $40",
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 400,
            }            
        ]
    },
    11: {
        descriptions: {
            pl: "Wracasz do Brukseli. Jeżeli przechodzi przez start otrzymujesz 400 $.",
            en: "You return to Brussels (forwad direction). If hou pass start filed, you gain $400 (for passing start field)",
        },
        actions: [
            {
                type: Commands.GoToFieldConditionalyPassStart,
                payload: 20, // indexing start as 0
            }
        ]
    },
    12: {
        descriptions: {
            pl: "Bank wypłaca Ci procenty w wysokości 100 $.",
            en: "Bank pays you $100 interest",
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 100
            }
        ]
    },
    13: {
        descriptions: {
            pl: "Idziesz do Kolei Wschodnich. Jeżeli przechodzisz przez start otrzymujesz 400 $.",
            en: "You go to Eastern Railway (forward). If you pass start field, you gain $400.",
        },
        actions: [
           {
                type: Commands.GoToFieldConditionalyPassStart,
                payload: 35, // indexing start as 0
            }
        ]
    },
    14: {
        descriptions: {
            pl: "Bank wpłaca Ci należne odsetki w wysokości 300 $.",
            en: "Bank pays you $300 interest",
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 300
            }
        ]
    },
    15: {
        descriptions: {
            pl: "Wychodzisz wolny z więzienia. Kartę można zachować lub sprzedać.",
            en: "You get out of prison. Card may be kept or sold"
        },
        actions: [
            {
                type: Commands.GetFreeFromJailCard,
                
            }
        ],
        metadata: {
            isCollectable: true,
        }
    }

}

export const CHANCE_CARDS_BLUE: iChanceCardsData= {
    cardsSetName: BLUE_CARDS_SET_NAME,
    0: {
        descriptions: {
            pl: "Płacisz na budowę szpitala 400 $.",
            en: 'You donate building a hospital, you pay $400',
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
            pl: "Otrzymujesz w spadku 200 $.",
            en: 'You inherit $200',
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
            pl: "Masz urodziny otrzymujesz od każdego gracza po 20 $.",
            en: 'You have birthday, each player pays you $20',
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
            pl: "Idziesz do więzienia. Nie przechodzisz przez start, nie otrzymujesz 400 $.",
            en: "You go to jail. You don't pass start field, and you don't get $400 for passing it",
        },
        actions: [
            {
                type: Commands.GoToFieldConditionalyPassStart,
            }
        ]
    }, 
    4: {
        descriptions: {
            pl: "Bank omylił się na twoją korzyść otrzymujesz 400 $.",
            en: 'Bank commited a mistake for your benefit: you gain $400',
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
            pl: "Płacisz składkę ubezpieczeniową w wysokości 20 $.",
            en: 'You pay insurance rate: $20',
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 20,
            }
        ]
    }, 
    6: {
        descriptions: {
            pl: "Wychodzisz wolny z więzienia. Kartę należy zachować do wykorzystania lub sprzedania.",
            en: "You get out of prison. Card should be kept for usage or selling",
        },
        actions: [
            {
                type: Commands.GetFreeFromJailCard, 
            }
        ],
        metadata: {
            isCollectable: true,
        }
    },
    7: {
        descriptions: {
            pl: "Wracasz na start.",
            en: 'You go back to start',
        },
        actions: [
            {
                type: Commands.GoToField,
                payload: 0
            }
        ]
    },
    8: {
        descriptions: {
            pl: "Z magazynu, w którym kupujesz otrzymujesz rabat w wysokości 20 $.",
            en: 'You get a $20 discount from warehouse you purchase goods from',
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 20,
            }
        ]
    },
    9: {
        descriptions: {
            pl: "Otrzymujesz roczną rentę w wysokości 200 $.",
            en: 'You get $200 rent',
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 200,
            }
        ]
    },
    10: {
        descriptions: {
            pl: "Wracasz do Wiednia.",
            en: 'You go back to Wien',
        },
        actions: [
            {
                type: Commands.GoBack,
                payload: 39
            }
        ]
    },
    11: {
        descriptions: {
            pl: "Płacisz za kartę 20 $ lub ciągniesz szansę z drugiego zestawu.",
            en: 'You are fined $20 or you draw a chance card from red pile',
        },
        actions: [
            {
                type: Commands.PayOrDrawFromRed,
                payload: 20,
            }
        ]
    },
    12: {
        descriptions: {
            pl: "Zająłeś II miejsce w konkursie piękności otrzymujesz z banku 200 $.",
            en: 'You won second price in beauty contest, you gt $200',
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 200,
            }
        ]
    },
    13: {
        descriptions: {
            pl: "Otrzymujesz zwrot nadpłaconego podatku dochodowego 40 $.",
            en: 'You get a tax refund: $40',
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 40,
            }
        ]
    },
    14: {
        descriptions: {
            pl: "Bank wypłaci ci należne 7% odsetek od kapitałów - otrzymujesz 50 $.",
            en: 'Bank pays you 7% of interest, you gain $50',
        },
        actions: [
            {
                type: Commands.GetMoney,
                payload: 50,
            }
        ]
    },
    15: {
        descriptions: {
            pl: "Płacisz koszty leczenia w wysokości 20 $.",
            en: 'You pay medical care fee: $20'
        },
        actions: [
            {
                type: Commands.Pay,
                payload: 20,
            }
        ]
    }
}

export const SPECIAL_CARD_RED = CHANCE_CARDS_RED['15'].descriptions.pl
export const SPECIAL_CARD_BLUE = CHANCE_CARDS_RED['6'].descriptions.pl

