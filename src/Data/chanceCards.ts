// Judge does not know how to execute cards. This file knows that, and
// Commander

import { FREE_FROM_JAIL, GAIN, GAIN_FROM_EACH_PLAYER, GO_BACK, GO_TO_FIELD, GO_TO_FIELD_CONDITIONALLY_PASS_START, PAY, PAY_EACH_HOTEL, PAY_EACH_HOUSE, PAY_OR_DRAW_FROM_RED, tChanceMessages } from "../Constants/commands"

// export enum ChanceMessageTypes {
//     pay = 'pay',
//     gain = 'gain',
//     payEachHouse = 'pay for each house',
//     payEachHotel = 'pay for each hotel',
//     goToField = 'go to field',
//     goToFieldConditionalyPassStart = 'go to field conditinaly gain money for pssing start',
//     goBack = 'go back nr of fields',
//     goToJailNoStartPass = 'go to jail not pass start',
//     freeFromJail = 'get free from jail',
//     gainFromEachPlayer = 'get money from every player',
//     payOrDrawFromRed = 'pay or draw from red pile'
// }
type tChanceAction = {
    payload?: number,
    type: tChanceMessages,
}
type tChanceLanguage = {
    [key: string]: string | tChanceAction[]
}
type tChance = {
    [key: string]: tChanceLanguage
}

export const CHANCE_CARDS_RED: tChance = {
    pl: {
        0:  "Zobowiązany jesteś zmodernizować swoje miasto, płacisz za każdy dom 80 $,za każdy hotel 230 $",
        1:  "Remontujesz swoje domy. Płacisz do banku za każdy dom 50 $, za każdy hotel 200 $.",
        2:  "Wracasz do Madrytu.",
        3:  "Mandat za szybko jazdę. Płacisz 30 $.",
        4:  "Cofasz się o trzy pola.",
        5:  "Wracasz na start.",
        6:  "Rozwiązałeś dobrze krzyżówkę. Jako 1 nagrodę otrzymujesz 200 $.",
        7:  "Idziesz do więzienia. Nie przechodzisz przez start. Nie otrzymujesz premii 400 $.",
        8:  "Płacisz opłatę za szkołę 300 $.",
        9: "Idziesz do Neapolu. Jeżeli przechodzisz przez start otrzymujesz 400 $.",
        10: "Piłeś w czasie pracy, płacisz karę 40 $.",
        11: "Wracasz do Brukseli. Jeżeli przechodzi przez start otrzymujesz 400 $.",
        12: "Bank wypłaca Ci procenty w wysokości 100 $.",
        13: "Idziesz do Kolei Wschodnich. Jeżeli przechodzisz przez start otrzymujesz 400 $.",
        14: "Bank wpłaca Ci należne odsetki w wysokości 300 $.",
        15: "Wychodzisz wolny z więzienia. Kartę należy zachować do wykorzystania lub sprzedania."
    },
    en: {
        0:  "You are obliged to modernize your cities, you pay $80 for each house and $230 for each hotel",
        1:  "You renovate your houses. You pay $50 for each house and $200 for each hotel",
        2:  "You return to Madrit",
        3:  "Overspeed ticket, you pay $30",
        4:  "You go back 3 fields",
        5:  "You go back to start",
        6:  "You solved crossword correctly, as a reward you get $200",
        7:  "You go to jail. You don't pass start field, and you don't get $400 for passing it",
        8:  "You pay school fee: $300",
        9:  "You go to Neapol (forward direction). If you pass start, you gain $400 (for passing start field)",
        10: "You were drinking at work, you are fined $40",
        11: "You return to Brussels (forwad direction). If hou pass start filed, you gain $400 (for passing start field)",
        12: "Bank pays you $100 interest",
        13: "You go to Eastern Railway (forward). If you pass start field, you gain $400.",
        14: "Bank pays you $300 interest",
        15: "You get out of prison. Card should be kept for usage or selling"
    },
    computer: {
        0: [
            {
                type: PAY_EACH_HOUSE,
                payload: 80
            },
            {
                type: PAY_EACH_HOTEL,
                payload: 230
            },
        ],
        1: [
            {
                type: PAY_EACH_HOUSE,
                payload: 50
            },
            {
                type: PAY_EACH_HOTEL,
                payload: 200
            },
        ],
        2: [
            {
                type: GO_TO_FIELD,
                payload: 13, // indexing start as 0
            }
        ],
        3: [
            {
                type: PAY,
                payload: 30,
            }
        ],
        4: [
            {
                type: GO_BACK,
                payload: 3,
            }
        ],
        5: [
            {
                type: GO_TO_FIELD,
                payload: 0, // indexing start as 0
            }
        ],
        6: [
            {
                type: GAIN,
                payload: 200
            }
        ],
        7: [
            {
                type: GO_TO_FIELD_CONDITIONALLY_PASS_START,
            }
        ],
        8: [
            {
                type: PAY,
                payload: 300,
            }
        ],
        9: [
            {
                type: GO_TO_FIELD_CONDITIONALLY_PASS_START,
                payload: 6, // indexing start as 0
            }
        ],
        10: [
            {
                type: PAY,
                payload: 400,
            }
        ],
        11: [
            {
                type: GO_TO_FIELD_CONDITIONALLY_PASS_START,
                payload: 20, // indexing start as 0
            }
        ],
        12: [
            {
                type: GAIN,
                payload: 100
            }
        ],
        13: [
            {
                type: GO_TO_FIELD_CONDITIONALLY_PASS_START,
                payload: 35, // indexing start as 0
            }
        ],
        14: [
            {
                type: GAIN,
                payload: 300
            }
        ],
        15: [
            {
                type: FREE_FROM_JAIL
            }
        ]
    }
}


export const CHANCE_CARDS_BLUE = {
    pl: {
    "0" : "Płacisz na budowę szpitala 400 $.",
    "1" : "Otrzymujesz w spadku 200 $.",
    "2" : "Masz urodziny otrzymujesz od każdego gracza po 20 $.",
    "3" : "Idziesz do więzienia. Nie przechodzisz przez start, nie otrzymujesz 400 $.",
    "4" : "Bank omylił się na twoją korzyść otrzymujesz 400 $.",
    "5" : "Płacisz składkę ubezpieczeniową w wysokości 20 $.",
    "6" : "Wychodzisz wolny z więzienia. Kartę należy zachować do wykorzystania lub sprzedania.",
    "7" : "Wracasz na start.",
    "8" : "Z magazynu, w którym kupujesz otrzymujesz rabat w wysokości 20 $.",
    "9" : "Otrzymujesz roczną rentę w wysokości 200 $.",
    "10": "Wracasz do Wiednia.",
    "11": "Płacisz za kartę 20 $ lub ciągniesz szansę z drugiego zestawu.",
    "12": "Zająłeś II miejsce w konkursie piękności otrzymujesz z banku 200 $.",
    "13": "Otrzymujesz zwrot nadpłaconego podatku dochodowego 40 $.",
    "14": "Bank wypłaci ci należne 7% odsetek od kapitałów - otrzymujesz 50 $.",
    "15": "Płacisz koszty leczenia w wysokości 20 $."
    },
    en: {
        0: 'You donate building a hospital, you pay $400',
        1: 'You inherit $200',
        2: 'You have birthday, each player pays you $20',
        3:  "You go to jail. You don't pass start field, and you don't get $400 for passing it",
        4:  'Bank commited a mistake for your benefit: you gain $400',
        5: 'You pay insurance rate: $20',
        6: "You get out of prison. Card should be kept for usage or selling",
        7: 'You go back to start',
        8: 'You get a $20 discount from warehouse you purchase goods from',
        9: 'You get $200 rent',
        10: 'You go back to Wien',
        11: 'You are fined $20 or you draw a chance card from red pile',
        12: 'You won second price in beauty contest, you gt $200',
        13: 'You get a tax refund: $40',
        14: 'Bank pays you 7% of interest, you gain $50',
        15: 'You pay medical care fee: $20'
    },
    computer: {
        0: {
            type: PAY,
            payload: 400,
        },
        1: {
            type: GAIN,
            payload: 200,
        },
        2: {
            type: GAIN_FROM_EACH_PLAYER,
            payload: 20,
        },
        3: {
            type: GO_TO_FIELD_CONDITIONALLY_PASS_START,
        },
        4: {
            type: GAIN,
            payload: 400,
        },
        5: {
            type: PAY,
            payload: 20,
        },
        6: {
            type: FREE_FROM_JAIL,
        },
        7: {
            type: GO_TO_FIELD,
            payload: 0
        },
        8: {
            type: GAIN,
            payload: 20,
        },
        9: {
            type: GAIN,
            payload: 200,
        },
        10: {
            type: GO_BACK,
            payload: 39
        },
        11: {
            type: PAY_OR_DRAW_FROM_RED,
            payload: 20,
        },
        12: {
            type: GAIN,
            payload: 200,
        },
        13: {
            type: GAIN,
            payload: 40,
        },
        14: {
            type: GAIN,
            payload: 50,
        },
        15: {
            type: PAY,
            payload: 20,
        },

    }
}