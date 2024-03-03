import { EN, PL } from "../../../Contexts/CurrentLanguage/const"
import { iChanceCardsData } from "../../../Data/types"
import { Commands } from "../../Commander/commands"

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
        metadata: {
            isCollectable: true
        }
    },
    4: {
        descriptions: {
            [EN]: 'o',
            [PL]: 'oPL'
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
