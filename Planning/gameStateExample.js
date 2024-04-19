const BALIN = 'Balin';
const DWALIN = 'Dwalin';
const DORIN = 'Dorin';
const GLOIN = 'Gloin';

const state = {
    bank: {
      nrOfHotels: 12,
      nrOfHouses: 32
    },
    dice: {
      testingMode: "none",
      fieldsToVisit: [],
      indexOnNextFieldToVisit: 0,
      nrThatDiceWillSelectInTestMode: 4
    },
    boardFields: [
      {
        name: "Start",
        type: "Start",
        Icon: {},
        visit: [
          -400
        ],
        wait: 0,
        index: 0
      },
      {
        name: "Saloniki",
        type: "City",
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
        owner: "yellow",
        nrOfHouses: 4,
        isPlegded: false,
        color: "#ffff00",
        nrOfHotels: 0,
        index: 1
      },
      {
        name: "Chance blue_bottom",
        index: 2,
        Icon: {},
        type: "Chance blue"
      },
      {
        name: "Ateny",
        type: "City",
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
        owner: "yellow",
        nrOfHouses: 2,
        isPlegded: false,
        color: "#ffff00",
        nrOfHotels: 0,
        index: 3
      },
      {
        name: "Guarded Parking",
        type: "Guarded Parking",
        Icon: {},
        visit: [
          400
        ],
        wait: 0,
        index: 4
      },
      {
        type: "Railway",
        country: "Railways",
        price: 400,
        mortgage: 200,
        visit: [
          50,
          100,
          200,
          400
        ],
        owner: "red",
        isPlegded: true,
        Icon: {},
        name: "South Railway",
        index: 5
      },
      {
        name: "Neapol",
        type: "City",
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
        owner: "green",
        nrOfHouses: 0,
        isPlegded: true,
        color: "#ff0000",
        nrOfHotels: 0,
        index: 6
      },
      {
        name: "Chance red_bottom",
        index: 7,
        Icon: {},
        type: "Chance red"
      },
      {
        name: "Mediolan",
        type: "City",
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
        owner: "blue",
        nrOfHouses: 0,
        isPlegded: false,
        color: "#ff0000",
        nrOfHotels: 1,
        index: 8
      },
      {
        name: "Rome",
        type: "City",
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
        owner: "blue",
        nrOfHouses: 4,
        isPlegded: false,
        color: "#ff0000",
        nrOfHotels: 0,
        index: 9
      },
      {
        name: "Jail",
        type: "Jail",
        Icon: {},
        wait: 2,
        index: 10
      },
      {
        name: "Barcelona",
        type: "City",
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
        owner: "blue",
        nrOfHouses: 0,
        isPlegded: true,
        color: "#0000FF",
        nrOfHotels: 0,
        index: 11
      },
      {
        type: "Plant",
        country: "Plant",
        price: 300,
        mortgage: 150,
        visit: [
          "10 x thrown dice result",
          "20 x thrown dice result"
        ],
        owner: "red",
        isPlegded: false,
        Icon: {},
        name: "Power Station",
        index: 12
      },
      {
        name: "Sewilla",
        type: "City",
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
        type: "City",
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
        type: "Railway",
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
        Icon: {},
        name: "West Railways",
        index: 15
      },
      {
        name: "Liverpool",
        type: "City",
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
        Icon: {},
        type: "Chance blue"
      },
      {
        name: "Glasgow",
        type: "City",
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
        type: "City",
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
        type: "Free park",
        Icon: {},
        visit: [
          0
        ],
        wait: 1,
        index: 20
      },
      {
        name: "Rotterdam",
        type: "City",
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
        Icon: {},
        type: "Chance red"
      },
      {
        name: "Bruksela",
        type: "City",
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
        type: "City",
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
        type: "Railway",
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
        Icon: {},
        name: "North Railways",
        index: 25
      },
      {
        name: "Malmo",
        type: "City",
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
        type: "City",
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
        type: "Plant",
        country: "Plant",
        price: 300,
        mortgage: 150,
        visit: [
          "10 x thrown dice result",
          "20 x thrown dice result"
        ],
        owner: "Bank",
        isPlegded: false,
        Icon: {},
        name: "Water Plant",
        index: 28
      },
      {
        name: "Stockholm",
        type: "City",
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
        type: "Go to jail",
        Icon: {},
        wait: 0,
        index: 30
      },
      {
        name: "Frankfurt",
        type: "City",
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
        type: "City",
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
        Icon: {},
        type: "Chance blue"
      },
      {
        name: "Bonn",
        type: "City",
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
        type: "Railway",
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
        Icon: {},
        name: "East Railways",
        index: 35
      },
      {
        name: "Chance red_right",
        index: 36,
        Icon: {},
        type: "Chance red"
      },
      {
        name: "Insbruck",
        type: "City",
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
        type: "Tax",
        Icon: {},
        visit: [
          200
        ],
        wait: 0,
        index: 38
      },
      {
        name: "Wien",
        type: "City",
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
    ],
    players: [
      {
        name: "Balin",
        money: 1234,
        specialCards: [],
        color: "yellow",
        fieldNr: 9,
        isInPrison: false,
        nrTurnsToWait: 0,
        isGameLost: false,
        strategy: "manual",
        nrOfHousesPurchasedInTurn: 0,
        nrOfHotelsPurchasedInRound: 0,
      },
      {
        name: "Dwalin",
        money: 4321,
        specialCards: [
          "Wychodzisz wolny z więzienia. Kartę należy zachować do wykorzystania lub sprzedania."
        ],
        color: "red",
        fieldNr: 13,
        isInPrison: false,
        nrTurnsToWait: 0,
        isGameLost: false,
        strategy: "manual",
        nrOfHousesPurchasedInTurn: 0,
        nrOfHotelsPurchasedInRound: 0,
      },
      {
        name: "Dorin",
        money: 4135,
        specialCards: [
          "Wychodzisz wolny z więzienia. Kartę można zachować lub sprzedać."
        ],
        color: "green",
        fieldNr: 24,
        isInPrison: false,
        nrTurnsToWait: 0,
        isGameLost: false,
        strategy: "manual",
        nrOfHousesPurchasedInTurn: 0,
        nrOfHotelsPurchasedInRound: 0,
      },
      {
        name: "Gloin",
        money: 5133,
        specialCards: [],
        color: "blue",
        fieldNr: 39,
        isInPrison: false,
        nrTurnsToWait: 0,
        isGameLost: false,
        strategy: "manual",
        nrOfHousesPurchasedInTurn: 0,
        nrOfHotelsPurchasedInRound: 0,
      }
    ],
    chanceCards: {
      "Chance cards blue": {
        cardsInOrder: [
          {
            descriptions: {
              pl: "Masz urodziny otrzymujesz od każdego gracza po 20 $.",
              en: "You have birthday, each player pays you $20"
            },
            actions: [
              {
                type: "Get money from each player,",
                payload: 20
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Otrzymujesz zwrot nadpłaconego podatku dochodowego 40 $.",
              en: "You get a tax refund: $40"
            },
            actions: [
              {
                type: "Gain ammount of money",
                payload: 40
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Zająłeś II miejsce w konkursie piękności otrzymujesz z banku 200 $.",
              en: "You won second price in beauty contest, you gt $200"
            },
            actions: [
              {
                type: "Gain ammount of money",
                payload: 200
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Z magazynu, w którym kupujesz otrzymujesz rabat w wysokości 20 $.",
              en: "You get a $20 discount from warehouse you purchase goods from"
            },
            actions: [
              {
                type: "Gain ammount of money",
                payload: 20
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Bank omylił się na twoją korzyść otrzymujesz 400 $.",
              en: "Bank commited a mistake for your benefit: you gain $400"
            },
            actions: [
              {
                type: "Gain ammount of money",
                payload: 400
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Płacisz składkę ubezpieczeniową w wysokości 20 $.",
              en: "You pay insurance rate: $20"
            },
            actions: [
              {
                type: "Pay",
                payload: 20
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Wychodzisz wolny z więzienia. Kartę należy zachować do wykorzystania lub sprzedania.",
              en: "You get out of prison. Card should be kept for usage or selling"
            },
            actions: [
              {
                type: "Get free from jail card effect"
              }
            ],
            metadata: {
              isCollectable: true
            },
            isBorrowedToPlayer: true
          },
          {
            descriptions: {
              pl: "Bank wypłaci ci należne 7% odsetek od kapitałów - otrzymujesz 50 $.",
              en: "Bank pays you 7% of interest, you gain $50"
            },
            actions: [
              {
                type: "Gain ammount of money",
                payload: 50
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Płacisz koszty leczenia w wysokości 20 $.",
              en: "You pay medical care fee: $20"
            },
            actions: [
              {
                type: "Pay",
                payload: 20
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Idziesz do więzienia. Nie przechodzisz przez start, nie otrzymujesz 400 $.",
              en: "You go to jail. You don't pass start field, and you don't get $400 for passing it"
            },
            actions: [
              {
                type: "Go to field conditionaly pass start"
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Płacisz za kartę 20 $ lub ciągniesz szansę z drugiego zestawu.",
              en: "You are fined $20 or you draw a chance card from red pile"
            },
            actions: [
              {
                type: "Pay or draw a chance card from red pile",
                payload: 20
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Wracasz na start.",
              en: "You go back to start"
            },
            actions: [
              {
                type: "Go to field",
                payload: 0
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Otrzymujesz w spadku 200 $.",
              en: "You inherit $200"
            },
            actions: [
              {
                type: "Gain ammount of money",
                payload: 200
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Wracasz do Wiednia.",
              en: "You go back to Wien"
            },
            actions: [
              {
                type: "Go back x fields",
                payload: 39
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Otrzymujesz roczną rentę w wysokości 200 $.",
              en: "You get $200 rent"
            },
            actions: [
              {
                type: "Gain ammount of money",
                payload: 200
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Płacisz na budowę szpitala 400 $.",
              en: "You donate building a hospital, you pay $400"
            },
            actions: [
              {
                type: "Pay",
                payload: 400
              }
            ],
            isBorrowedToPlayer: false
          }
        ],
        cardsSetName: "Chance cards blue",
        lastDrawnCardIndex: 0
      },
      "Chance cards red": {
        cardsInOrder: [
          {
            descriptions: {
              pl: "Wracasz na start.",
              en: "You go back to start"
            },
            actions: [
              {
                type: "Go to field",
                payload: 0
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Idziesz do Kolei Wschodnich. Jeżeli przechodzisz przez start otrzymujesz 400 $.",
              en: "You go to Eastern Railway (forward). If you pass start field, you gain $400."
            },
            actions: [
              {
                type: "Go to field conditionaly pass start",
                payload: 35
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Mandat za szybko jazdę. Płacisz 30 $.",
              en: "Overspeed ticket, you pay $30"
            },
            actions: [
              {
                type: "Pay",
                payload: 30
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Bank wpłaca Ci należne odsetki w wysokości 300 $.",
              en: "Bank pays you $300 interest"
            },
            actions: [
              {
                type: "Pay",
                payload: 300
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Idziesz do więzienia. Nie przechodzisz przez start. Nie otrzymujesz premii 400 $.",
              en: "You go to jail. You don't pass start field, and you don't get $400 for passing it"
            },
            actions: [
              {
                type: "Go to field conditionaly pass start"
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
                type: "Get free from jail card effect"
              }
            ],
            metadata: {
              isCollectable: true
            },
            isBorrowedToPlayer: true
          },
          {
            descriptions: {
              pl: "Idziesz do Neapolu. Jeżeli przechodzisz przez start otrzymujesz 400 $.",
              en: "You go to Neapol (forward direction). If you pass start, you gain $400 (for passing start field)"
            },
            actions: [
              {
                type: "Go to field conditionaly pass start",
                payload: 6
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Wracasz do Brukseli. Jeżeli przechodzi przez start otrzymujesz 400 $.",
              en: "You return to Brussels (forwad direction). If hou pass start filed, you gain $400 (for passing start field)"
            },
            actions: [
              {
                type: "Go to field conditionaly pass start",
                payload: 20
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Remontujesz swoje domy. Płacisz do banku za każdy dom 50 $, za każdy hotel 200 $.",
              en: "You renovate your houses. You pay $50 for each house and $200 for each hotel"
            },
            actions: [
              {
                type: "Pay for each house",
                payload: 50
              },
              {
                type: "Pay for each hotel",
                payload: 200
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Płacisz opłatę za szkołę 300 $.",
              en: "You pay school fee: $300"
            },
            actions: [
              {
                type: "Pay",
                payload: 300
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Wracasz do Madrytu.",
              en: "You return to Madrit",
            },
            actions: [
              {
                type: "Go to field",
                payload: 13
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Cofasz się o trzy pola.",
              en: "You go back 3 fields"
            },
            actions: [
              {
                type: "Go back x fields",
                payload: 3
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Rozwiązałeś dobrze krzyżówkę. Jako 1 nagrodę otrzymujesz 200 $.",
              en: "You solved crossword correctly, as a reward you get $200"
            },
            actions: [
              {
                type: "Gain ammount of money",
                payload: 200
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Bank wypłaca Ci procenty w wysokości 100 $.",
              en: "Bank pays you $100 interest"
            },
            actions: [
              {
                type: "Gain ammount of money",
                payload: 100
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Piłeś w czasie pracy, płacisz karę 40 $.",
              en: "You were drinking at work, you are fined $40"
            },
            actions: [
              {
                type: "Pay",
                payload: 400
              }
            ],
            isBorrowedToPlayer: false
          },
          {
            descriptions: {
              pl: "Zobowiązany jesteś zmodernizować swoje miasto, płacisz za każdy dom 80 $,za każdy hotel 230 $",
              en: "You are obliged to modernize your cities, you pay $80 for each house and $230 for each hotel"
            },
            actions: [
              {
                type: "Pay for each house",
                payload: 80
              },
              {
                type: "Pay for each hotel",
                payload: 230
              }
            ],
            isBorrowedToPlayer: false
          }
        ],
        cardsSetName: "Chance cards red",
        lastDrawnCardIndex: 0
      }
    },
    game: {
      currentPlayer: BALIN,
      playersOrder: [BALIN, DWALIN, DORIN, GLOIN],
      turnPhase: 'Before move'
    },
    name: "ChanceCards",
    description: "1. Chance cards sold\n2. Players saved as an array"
  }
