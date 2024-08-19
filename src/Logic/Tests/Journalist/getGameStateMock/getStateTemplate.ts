import { BLUE, CHANCE_BLUE_BOTTOM, CHANCE_BLUE_LEFT, CHANCE_BLUE_RIGHT, CHANCE_RED_BOTTOM, CHANCE_RED_TOP, CITY, FREE_PARK, GO_TO_JAIL, GREEN, GUARDED_PARKING, JAIL, PLANT, RAILWAY, RED, START, TAX, YELLOW } from "../../../../Data/const";
import { tColors, tIcon } from "../../../../Data/types";
import { tGameState } from "../../../../Functions/PersistRetrieveGameState/types";
import { tFieldState } from "../../../boardTypes";
import { tChanceCardsHolderState } from "../../../Chance/types";
import { Commands } from "../../../Commander/commands";
import { TestModes } from "../../../Dice/types";
import { iPlayerSnapshot, PassStartPayments } from "../../../Player/types";
import { StrategyNames } from "../../../Strategies/types";
import { TurnPhases } from "../../../types";

const dummyIcon = {} as tIcon

export const getStateMock = (): tGameState => {
    const state = {
        currentPlayerName: BALIN,

        // =======
        playerNamesQueue: ['yellow', 'red', 'blue', 'green'] as tColors[], // DEPRACIATED, will not be used
        // Instead look for this in game key
        // =======

        turnPhase: TurnPhases.BeforeMove,
        bank: getBankStateTemplate(),
        dice: getDiceStateTemplate(),
        boardFields: getBoardFieldsStateTemplate(),
        players: {
          playersList: getPlayersStateTemplate(),
          currentPlayersName: BALIN,
          currentPlayersColor: YELLOW as tColors,
          currentPlayerName: BALIN,
          currentPlayerColor: YELLOW as tColors,
          playerNamesOrder: [BALIN, DWALIN, DORIN, GLOIN],
          currentInterruptingPlayerName: BALIN,
          currentInterruptingPlayerColor: YELLOW,
        },
        chanceCards: getChanceCardsStateTemplate().chanceCards,
        game: getGameLogicState()
    }
    return state;
}

export type tSetNrOfHotelsBoughtInRowArgs = {
  state: tGameState,
  color: string,
  nrHotelsBoughtInRound: number
}

export const setNrOfHotelsBoughtInRow = ({state ,color, nrHotelsBoughtInRound}: tSetNrOfHotelsBoughtInRowArgs) => {
  const player = state.players.playersList.find((player) => player.color === color);
  if (!player) throw new Error(`Player ${color} no found`)
  player.nrOfHotelsPurchasedInRound = nrHotelsBoughtInRound;
  
}

export const BALIN = 'Balin';
export const DWALIN = 'Dwalin';
export const DORIN = 'Dorin';
export const GLOIN = 'Gloin';

const getGameLogicState = () => {
  const gameLogicState = {
    // currentPlayer: BALIN,
    // playersOrder: [BALIN, DWALIN, DORIN, GLOIN],
    turnPhase: TurnPhases.BeforeMove,
    doneThisTurn: []
  };
  return gameLogicState;
}

const getBankStateTemplate = () => ({ nrOfHotels: 12, nrOfHouses: 32 })

const getDiceStateTemplate = () => ({
    testingMode: TestModes.none,
    fieldsToVisit: [],
    indexOnNextFieldToVisit: 0,
    nrThatDiceWillSelectInTestMode: 4
})

const getBoardFieldsStateTemplate = (): tFieldState[] => ([
    {
      name: "Start",
      type: START,
      Icon: dummyIcon,
      visit: [
        -400
      ],
      wait: 0,
      index: 0
    },
    {
      name: "Saloniki",
      type: CITY,
      country: "Greece",
      price: 120,
      mortgage: 60,
      housePrice: 100,
      hotelPrice: 100,
      visit: [
        10,
        40,
        120,
        360,
        640,
        900
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ffff00",
      nrOfHotels: 0,
      index: 1
    },
    {
      name: "Chance blue_bottom",
      index: 2,
      Icon: dummyIcon,
      type: CHANCE_BLUE_BOTTOM
    },
    {
      name: "Ateny",
      type: CITY,
      country: "Greece",
      price: 120,
      mortgage: 60,
      housePrice: 100,
      hotelPrice: 100,
      visit: [
        10,
        40,
        120,
        360,
        640,
        900
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ffff00",
      nrOfHotels: 0,
      index: 3
    },
    {
      name: "Guarded Parking",
      type: GUARDED_PARKING,
      Icon: dummyIcon,
      visit: [
        400
      ],
      wait: 0,
      index: 4
    },
    {
      type: RAILWAY,
      country: "Railways",
      price: 400,
      mortgage: 200,
      visit: [
        50,
        100,
        200,
        400
      ],
      owner: "Bank",
      isPlegded: false,
      Icon: dummyIcon,
      name: "South Railway",
      index: 5
    },
    {
      name: "Neapol",
      type: CITY,
      country: "Italy",
      price: 200,
      mortgage: 100,
      housePrice: 100,
      hotelPrice: 100,
      visit: [
        15,
        60,
        150,
        540,
        800,
        1100
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ff0000",
      nrOfHotels: 0,
      index: 6
    },
    {
      name: "Chance red_bottom",
      index: 7,
      Icon: dummyIcon,
      type: CHANCE_RED_BOTTOM
    },
    {
      name: "Mediolan",
      type: CITY,
      country: "Italy",
      price: 200,
      mortgage: 100,
      housePrice: 100,
      hotelPrice: 100,
      visit: [
        15,
        60,
        150,
        540,
        800,
        1100
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ff0000",
      nrOfHotels: 0,
      index: 8
    },
    {
      name: "Rome",
      type: CITY,
      country: "Italy",
      price: 240,
      mortgage: 120,
      housePrice: 100,
      hotelPrice: 100,
      visit: [
        20,
        80,
        200,
        600,
        900,
        1200
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ff0000",
      nrOfHotels: 0,
      index: 9
    },
    {
      name: "Jail",
      type: JAIL,
      Icon: dummyIcon,
      wait: 2,
      index: 10
    },
    {
      name: "Barcelona",
      type: CITY,
      country: "Spain",
      price: 280,
      mortgage: 140,
      housePrice: 200,
      hotelPrice: 200,
      visit: [
        20,
        100,
        300,
        900,
        1250,
        1500
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#0000FF",
      nrOfHotels: 0,
      index: 11
    },
    {
      type: PLANT,
      country: "Plant",
      price: 300,
      mortgage: 150,
      visit: [
        "10 x thrown dice result",
        "20 x thrown dice result"
      ],
      owner: "Bank",
      isPlegded: false,
      Icon: dummyIcon,
      name: "Power Station",
      index: 12
    },
    {
      name: "Sewilla",
      type: CITY,
      country: "Spain",
      price: 280,
      mortgage: 140,
      housePrice: 200,
      hotelPrice: 200,
      visit: [
        20,
        100,
        300,
        900,
        1250,
        1500
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#0000FF",
      nrOfHotels: 0,
      index: 13
    },
    {
      name: "Madrit",
      type: CITY,
      country: "Spain",
      price: 320,
      mortgage: 160,
      housePrice: 200,
      hotelPrice: 200,
      visit: [
        25,
        120,
        360,
        1000,
        1400,
        1800
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#0000FF",
      nrOfHotels: 0,
      index: 14
    },
    {
      type: RAILWAY,
      country: "Railways",
      price: 400,
      mortgage: 200,
      visit: [
        50,
        100,
        200,
        400
      ],
      owner: "Bank",
      isPlegded: false,
      Icon: dummyIcon,
      name: "West Railways",
      index: 15
    },
    {
      name: "Liverpool",
      type: CITY,
      country: "UK",
      price: 360,
      mortgage: 180,
      housePrice: 200,
      hotelPrice: 200,
      visit: [
        30,
        140,
        400,
        1100,
        1500,
        1900
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ff8800",
      nrOfHotels: 0,
      index: 16
    },
    {
      name: "Chance blue_left",
      index: 17,
      Icon: dummyIcon,
      type: CHANCE_BLUE_LEFT
    },
    {
      name: "Glasgow",
      type: CITY,
      country: "UK",
      price: 360,
      mortgage: 180,
      housePrice: 200,
      hotelPrice: 200,
      visit: [
        30,
        140,
        400,
        1100,
        1500,
        1900
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ff8800",
      nrOfHotels: 0,
      index: 18
    },
    {
      name: "London",
      type: CITY,
      country: "UK",
      price: 400,
      mortgage: 200,
      housePrice: 200,
      hotelPrice: 200,
      visit: [
        35,
        160,
        440,
        1200,
        1600,
        2000
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ff8800",
      nrOfHotels: 0,
      index: 19
    },
    {
      name: "Free park",
      type: FREE_PARK,
      Icon: dummyIcon,
      visit: [
        0
      ],
      wait: 1,
      index: 20
    },
    {
      name: "Rotterdam",
      type: CITY,
      country: "Benelux",
      price: 440,
      mortgage: 220,
      housePrice: 300,
      hotelPrice: 300,
      visit: [
        35,
        180,
        500,
        1400,
        1750,
        2100
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#00ff00",
      nrOfHotels: 0,
      index: 21
    },
    {
      name: "Chance red_top",
      index: 22,
      Icon: dummyIcon,
      type: CHANCE_RED_TOP
    },
    {
      name: "Bruksela",
      type: CITY,
      country: "Benelux",
      price: 440,
      mortgage: 220,
      housePrice: 300,
      hotelPrice: 300,
      visit: [
        35,
        180,
        500,
        1400,
        1750,
        2100
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#00ff00",
      nrOfHotels: 0,
      index: 23
    },
    {
      name: "Amsterdam",
      type: CITY,
      country: "Benelux",
      price: 480,
      mortgage: 240,
      housePrice: 300,
      hotelPrice: 300,
      visit: [
        40,
        200,
        600,
        1500,
        1850,
        2200
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#00ff00",
      nrOfHotels: 0,
      index: 24
    },
    {
      type: RAILWAY,
      country: "Railways",
      price: 400,
      mortgage: 200,
      visit: [
        50,
        100,
        200,
        400
      ],
      owner: "Bank",
      isPlegded: false,
      Icon: dummyIcon,
      name: "North Railways",
      index: 25
    },
    {
      name: "Malmo",
      type: CITY,
      country: "Sweeden",
      price: 520,
      mortgage: 260,
      housePrice: 300,
      hotelPrice: 300,
      visit: [
        45,
        220,
        600,
        1600,
        1950,
        2300
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ff00ff",
      nrOfHotels: 0,
      index: 26
    },
    {
      name: "Goteborg",
      type: CITY,
      country: "Sweeden",
      price: 520,
      mortgage: 260,
      housePrice: 300,
      hotelPrice: 300,
      visit: [
        45,
        220,
        600,
        1600,
        1950,
        2300
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ff00ff",
      nrOfHotels: 0,
      index: 27
    },
    {
      type: PLANT,
      country: "Plant",
      price: 300,
      mortgage: 150,
      visit: [
        "10 x thrown dice result",
        "20 x thrown dice result"
      ],
      owner: "Bank",
      isPlegded: false,
      Icon: dummyIcon,
      name: "Water Plant",
      index: 28
    },
    {
      name: "Stockholm",
      type: CITY,
      country: "Sweeden",
      price: 560,
      mortgage: 280,
      housePrice: 300,
      hotelPrice: 300,
      visit: [
        50,
        240,
        720,
        1700,
        2050,
        2400
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#ff00ff",
      nrOfHotels: 0,
      index: 29
    },
    {
      name: "Go to jail",
      type: GO_TO_JAIL,
      Icon: dummyIcon,
      wait: 0,
      index: 30
    },
    {
      name: "Frankfurt",
      type: CITY,
      country: "RFN",
      price: 600,
      mortgage: 300,
      housePrice: 400,
      hotelPrice: 400,
      visit: [
        55,
        260,
        780,
        1900,
        2200,
        2550
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "brown",
      nrOfHotels: 0,
      index: 31
    },
    {
      name: "Cologne",
      type: CITY,
      country: "RFN",
      price: 600,
      mortgage: 300,
      housePrice: 400,
      hotelPrice: 400,
      visit: [
        55,
        260,
        780,
        1900,
        2200,
        2550
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "brown",
      nrOfHotels: 0,
      index: 32
    },
    {
      name: "Chance blue_right",
      index: 33,
      Icon: dummyIcon,
      type: CHANCE_BLUE_RIGHT
    },
    {
      name: "Bonn",
      type: CITY,
      country: "RFN",
      price: 640,
      mortgage: 320,
      housePrice: 400,
      hotelPrice: 400,
      visit: [
        50,
        300,
        900,
        2000,
        2400,
        2800
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "brown",
      nrOfHotels: 0,
      index: 34
    },
    {
      type: RAILWAY,
      country: "Railways",
      price: 400,
      mortgage: 200,
      visit: [
        50,
        100,
        200,
        400
      ],
      owner: "Bank",
      isPlegded: false,
      Icon: dummyIcon,
      name: "East Railways",
      index: 35
    },
    {
      name: "Chance red_right",
      index: 36,
      Icon: dummyIcon,
      type: CHANCE_RED_BOTTOM
    },
    {
      name: "Insbruck",
      type: CITY,
      country: "Austria",
      price: 700,
      mortgage: 350,
      housePrice: 400,
      hotelPrice: 400,
      visit: [
        70,
        350,
        1000,
        2200,
        2600,
        3000
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#222222",
      nrOfHotels: 0,
      index: 37
    },
    {
      name: "Tax",
      type: TAX,
      Icon: dummyIcon,
      visit: [
        200
      ],
      wait: 0,
      index: 38
    },
    {
      name: "Wien",
      type: CITY,
      country: "Austria",
      price: 700,
      mortgage: 350,
      housePrice: 400,
      hotelPrice: 400,
      visit: [
        70,
        350,
        1000,
        2200,
        2600,
        3000
      ],
      owner: "Bank",
      nrOfHouses: 0,
      isPlegded: false,
      color: "#222222",
      nrOfHotels: 0,
      index: 39
    }
  ])

const getPlayersStateTemplate = (): iPlayerSnapshot[] => ([
        {
          name: "Balin",
          money: 3000,
          specialCards: [],
          color: YELLOW,
          fieldNr: 0,
          isInPrison: false,
          nrTurnsToWait: 0,
          isGameLost: false,
          strategy: StrategyNames.manual,
          nrOfHousesPurchasedInTurn: 0,
          nrOfHotelsPurchasedInRound: 0,
          shouldPayForPassingStart: PassStartPayments.NotSet,
          lastFieldNr: 0,
        },
        {
          name: "Dwalin",
          money: 3000,
          specialCards: [],
          color: RED,
          fieldNr: 0,
          isInPrison: false,
          nrTurnsToWait: 0,
          isGameLost: false,
          strategy: StrategyNames.manual,
          nrOfHousesPurchasedInTurn: 0,
          nrOfHotelsPurchasedInRound: 0,
          shouldPayForPassingStart: PassStartPayments.NotSet,
          lastFieldNr: 0,
        },
        {
          name: "Dorin",
          money: 3000,
          specialCards: [],
          color: GREEN,
          fieldNr: 0,
          isInPrison: false,
          nrTurnsToWait: 0,
          isGameLost: false,
          strategy: StrategyNames.manual, 
          nrOfHousesPurchasedInTurn: 0,
          nrOfHotelsPurchasedInRound: 0,
          shouldPayForPassingStart: PassStartPayments.NotSet,
          lastFieldNr: 0,
        },
        {
          name: "Gloin",
          money: 3000,
          specialCards: [],
          color: BLUE,
          fieldNr: 0,
          isInPrison: false,
          nrTurnsToWait: 0,
          isGameLost: false,
          strategy: StrategyNames.manual,
          nrOfHousesPurchasedInTurn: 0,
          nrOfHotelsPurchasedInRound: 0,
          shouldPayForPassingStart: PassStartPayments.NotSet,
          lastFieldNr: 0,
        }
      ])

const getChanceCardsStateTemplate = (): {chanceCards: { [key: string ]: tChanceCardsHolderState}} => ({
    chanceCards: {
        'Chance cards red': {
            cardsSetName: 'Chance cards red',
            lastDrawnCardIndex: 0,
            cardsInOrder: [
                {
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
                    ],
                    isBorrowedToPlayer: false
                },
                {
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
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Wracasz do Madrytu.",
                        en: '"You return to Madrit",'
                    },
                    actions: [
                        {
                            type: Commands.GoToField,
                            payload: 13, // indexing start as 0
                        }
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Mandat za szybko jazdę. Płacisz 30 $.",
                        en: "Overspeed ticket, you pay $30",
                    },
                    actions: [
                        {
                            type: Commands.Pay,
                            payload: 30,
                        }
                    ],
                    isBorrowedToPlayer: false
                }, 
                {
                    descriptions: {
                        pl: "Cofasz się o trzy pola.",
                        en: "You go back 3 fields",
                    },
                    actions: [
                        {
                            type: Commands.GoBack,
                            payload: 3,
                        }
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Wracasz na start.",
                        en: "You go back to start",
                    },
                    actions: [
                        {
                            type: Commands.GoToField,
                            payload: 0, // indexing start as 0
                        }
                    ],
                    isBorrowedToPlayer: false
                }, 
                {
                    descriptions: {
                        pl: "Rozwiązałeś dobrze krzyżówkę. Jako 1 nagrodę otrzymujesz 200 $.",
                        en: "You solved crossword correctly, as a reward you get $200",
                    },
                    actions: [
                        {
                            type: Commands.GetMoney,
                            payload: 200
                        }
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Idziesz do więzienia. Nie przechodzisz przez start. Nie otrzymujesz premii 400 $.",
                        en: "You go to jail. You don't pass start field, and you don't get $400 for passing it",
                    },
                    actions: [
                        {
                            type: Commands.GoToFieldConditionalyPassStart,
                        }
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Płacisz opłatę za szkołę 300 $.",
                        en: "You pay school fee: $300",
                    },
                    actions: [
                        {
                            type: Commands.Pay,
                            payload: 300,
                        }
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Idziesz do Neapolu. Jeżeli przechodzisz przez start otrzymujesz 400 $.",
                        en: "You go to Neapol (forward direction). If you pass start, you gain $400 (for passing start field)",
                    },
                    actions: [
                        {
                            type: Commands.GoToFieldConditionalyPassStart,
                            payload: 6, // indexing start as 0
                        }
            
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Piłeś w czasie pracy, płacisz karę 40 $.",
                        en: "You were drinking at work, you are fined $40",
                    },
                    actions: [
                        {
                            type: Commands.Pay,
                            payload: 400,
                        }            
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Wracasz do Brukseli. Jeżeli przechodzi przez start otrzymujesz 400 $.",
                        en: "You return to Brussels (forwad direction). If hou pass start filed, you gain $400 (for passing start field)",
                    },
                    actions: [
                        {
                            type: Commands.GoToFieldConditionalyPassStart,
                            payload: 20, // indexing start as 0
                        }
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Bank wypłaca Ci procenty w wysokości 100 $.",
                        en: "Bank pays you $100 interest",
                    },
                    actions: [
                        {
                            type: Commands.GetMoney,
                            payload: 100
                        }
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Idziesz do Kolei Wschodnich. Jeżeli przechodzisz przez start otrzymujesz 400 $.",
                        en: "You go to Eastern Railway (forward). If you pass start field, you gain $400.",
                    },
                    actions: [
                       {
                            type: Commands.GoToFieldConditionalyPassStart,
                            payload: 35, // indexing start as 0
                        }
                    ],
                    isBorrowedToPlayer: false
                },
                {
                    descriptions: {
                        pl: "Bank wpłaca Ci należne odsetki w wysokości 300 $.",
                        en: "Bank pays you $300 interest",
                    },
                    actions: [
                        {
                            type: Commands.Pay,
                            payload: 300
                        }
                    ],
                    isBorrowedToPlayer: false
                },
                {
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
                    },
                    isBorrowedToPlayer: false
                }            
            ]
          },  
        'Chance cards blue': {
          cardsSetName: 'Chance cards red',
          lastDrawnCardIndex: 0,
          cardsInOrder: [
            {
                descriptions: {
                    pl: "Płacisz na budowę szpitala 400 $.",
                    en: 'You donate building a hospital, you pay $400',
                },
                actions: [
                    {
                        type: Commands.Pay,
                        payload: 400,
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Otrzymujesz w spadku 200 $.",
                    en: 'You inherit $200',
                },
                actions: [
                    {
                        type: Commands.GetMoney,
                        payload: 200,
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Masz urodziny otrzymujesz od każdego gracza po 20 $.",
                    en: 'You have birthday, each player pays you $20',
                },
                actions: [
                    {
                        type: Commands.GetMoneyFromEachPlayer,
                        payload: 20,
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Idziesz do więzienia. Nie przechodzisz przez start, nie otrzymujesz 400 $.",
                    en: "You go to jail. You don't pass start field, and you don't get $400 for passing it",
                },
                actions: [
                    {
                        type: Commands.GoToFieldConditionalyPassStart,
                    }
                ],
                isBorrowedToPlayer: false
            }, 
            {
                descriptions: {
                    pl: "Bank omylił się na twoją korzyść otrzymujesz 400 $.",
                    en: 'Bank commited a mistake for your benefit: you gain $400',
                },
                actions: [
                    {
                        type: Commands.GetMoney,
                        payload: 400,
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Płacisz składkę ubezpieczeniową w wysokości 20 $.",
                    en: 'You pay insurance rate: $20',
                },
                actions: [
                    {
                        type: Commands.Pay,
                        payload: 20,
                    }
                ],
                isBorrowedToPlayer: false
            }, 
            {
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
                },
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Wracasz na start.",
                    en: 'You go back to start',
                },
                actions: [
                    {
                        type: Commands.GoToField,
                        payload: 0
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Z magazynu, w którym kupujesz otrzymujesz rabat w wysokości 20 $.",
                    en: 'You get a $20 discount from warehouse you purchase goods from',
                },
                actions: [
                    {
                        type: Commands.GetMoney,
                        payload: 20,
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Otrzymujesz roczną rentę w wysokości 200 $.",
                    en: 'You get $200 rent',
                },
                actions: [
                    {
                        type: Commands.GetMoney,
                        payload: 200,
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Wracasz do Wiednia.",
                    en: 'You go back to Wien',
                },
                actions: [
                    {
                        type: Commands.GoBack,
                        payload: 39
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Płacisz za kartę 20 $ lub ciągniesz szansę z drugiego zestawu.",
                    en: 'You are fined $20 or you draw a chance card from red pile',
                },
                actions: [
                    {
                        type: Commands.PayOrDrawFromRed,
                        payload: 20,
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Zająłeś II miejsce w konkursie piękności otrzymujesz z banku 200 $.",
                    en: 'You won second price in beauty contest, you gt $200',
                },
                actions: [
                    {
                        type: Commands.GetMoney,
                        payload: 200,
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Otrzymujesz zwrot nadpłaconego podatku dochodowego 40 $.",
                    en: 'You get a tax refund: $40',
                },
                actions: [
                    {
                        type: Commands.GetMoney,
                        payload: 40,
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Bank wypłaci ci należne 7% odsetek od kapitałów - otrzymujesz 50 $.",
                    en: 'Bank pays you 7% of interest, you gain $50',
                },
                actions: [
                    {
                        type: Commands.GetMoney,
                        payload: 50,
                    }
                ],
                isBorrowedToPlayer: false
            },
            {
                descriptions: {
                    pl: "Płacisz koszty leczenia w wysokości 20 $.",
                    en: 'You pay medical care fee: $20'
                },
                actions: [
                    {
                        type: Commands.Pay,
                        payload: 20,
                    }
                ],
                isBorrowedToPlayer: false
            }
          ]
        }
    }
})
