import {
    tBoard,
} from './types'

import { 
    AMSTERDAM, ATENY, AUSTRIA, BANK, BARCELONA, BENELUX, BONN, BRUKSELA, CHANCE_BLUE, 
    CHANCE_RED, EAST_RAILWAYS, FRANKFURT, FREE_PARK,
    GLASGOW, GOTEBORG, GO_TO_JAIL, GREECE, GUARDED_PARKING, INSBRUK, 
    ITALY, 
    JAIL, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, 
    NEAPOL, NORTH_RAILWAYS, PLANT, POWER_STATION, RAILWAY, RAILWAYS, RFN, ROME, ROTTERDAM, 
    SALONIKI, SEWILLA, SOUTH_RAILWAY, SPAIN, START, SWEEDEN, SZTOKHOLM, TAX, 
    THROW_10, 
    THROW_20, 
    UK, 
    WATER_PLANT, WEST_RAILWAYS, WIEDEN
} from './const';
import start from '../Icons/Start.svg';
import questionRed from '../Icons/questionRed.svg';
import questionBlue from '../Icons/questionBlue.svg';
import freePark from '../Icons/freePark.svg';
import jail from '../Icons/jail.svg';
import goToJail from '../Icons/goToJail.svg';
import railway from '../Icons/railway.svg'
import powerStation from '../Icons/electricPlant.svg'
import waterPlant from '../Icons/waterPlant.svg'
import tax from '../Icons/tax.svg'
import parkingIcon from '../Icons/park.svg';
import { CITY } from './const';

const YELLOW = '#ffff00';
const RED = '#ff0000';
const BLUE = '#0000FF';
const ORANGE = '#ff8800';
const GREEN = '#00ff00';
const VIOLET = '#ff00ff';
const BROWN = 'brown';
const BLACK = '#222222'

export const descriptors: tBoard = {
    [START]: {
        type: START,
        // boardFieldNumber: 1,
        visit: [-400],
        icon: start,
        info: `You stop on the OtherTypes.START field, that means You get  $400. Notihing to do here.`,
    },
    [ATENY]: {
        type: CITY,
        country: GREECE,
        price: 120,
        mortage: 60,
        housePrice: 100,
        hotelPrice: 100,
        visit: [ 10, 40, 120, 360, 640, 900 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 2, // 2 cities in the country
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        // boardFieldNumber: 2,
        isPlegded: false, // zastawiony
        color: YELLOW,
        
    },
    [CHANCE_BLUE]: {
        type: CHANCE_BLUE,
        info: 'Draw a blue chance card',
        icon: questionBlue,
    },
    [CHANCE_RED]: {
        type: CHANCE_RED,
        info: 'Draw a red chance card',
        icon: questionRed,
    },
    // [CHANCE_BLUE_LEFT]: {
    //     type: ChanceTypes.CHANCE_BLUE,
    //     info: 'Draw a blue chance card',
    //     icon: questionBlue,
    // },
    // [CHANCE_RED_LEFT]: {
    //     type: ChanceTypes.CHANCE_RED,
    //     info: 'Draw a red chance card',
    //     icon: questionRed,
    // },
    // [CHANCE_BLUE_TOP]: {
    //     type: ChanceTypes.CHANCE_BLUE,
    //     info: 'Draw a blue chance card',
    //     icon: questionBlue,
    // },
    // [CHANCE_RED_TOP]: {
    //     type: ChanceTypes.CHANCE_RED,
    //     info: 'Draw a red chance card',
    //     icon: questionRed,
    // },
    // [CHANCE_BLUE_RIGHT]: {
    //     type: ChanceTypes.CHANCE_BLUE,
    //     info: 'Draw a blue chance card',
    //     icon: questionBlue,
    // },
    // [CHANCE_RED_RIGHT]: {
    //     type: ChanceTypes.CHANCE_RED,
    //     info: 'Draw a red chance card',
    //     icon: questionRed,
    // },
    [SALONIKI]: {
        country: GREECE,
        type: CITY,
        price: 120,
        mortage: 60,
        housePrice: 100,
        hotelPrice: 100,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,
        visit: [ 10, 40, 120, 360, 640, 900 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 2,
        // boardFieldNumber: 4,
        isPlegded: false,
        color: YELLOW,
    },
    [GUARDED_PARKING]: {
        type: GUARDED_PARKING,
        // boardFieldNumber: 5,
        visit: [400],
        info: 'You pay $400 for staying one extra trun here. This is mandatory,',
        icon: parkingIcon,
    },
    [FREE_PARK]: {
        type: FREE_PARK,
        // boardFieldNumber: 11,
        visit: [0],
        wait: 1,
        info: 'You spend one extra turn here. The only good news is, there is no fee for staying here',
        icon: freePark,
    },
    [JAIL]: {
        type: JAIL,
        // boardFieldNumber: 11,
        wait: 2,
        info: 'You spend 2 extra turns here.',
        icon: jail,
    },
    [GO_TO_JAIL]: {
        type: GO_TO_JAIL,
        // boardFieldNumber: 31,
        info: 'You go to field 11, jail and spend 2 extra turns there.',
        icon: goToJail,
    },
    [SOUTH_RAILWAY]: {
        country: RAILWAYS,
        type: RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: BANK,
        // nrInSet: 4,
        // boardFieldNumber: 6,
        isPlegded: false,
        icon: railway,
    },
    [NEAPOL]: {
        country: ITALY,
        type: CITY,
        price: 200,
        mortage: 100,
        housePrice: 100,
        hotelPrice: 100,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 15, 60, 150, 540, 800, 1100 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 7,
        isPlegded: false,
        color: RED,
    },
    [MEDIOLAN]: {
        country: ITALY,
        type: CITY,
        price: 200,
        mortage: 100,
        housePrice: 100,
        hotelPrice: 100,        
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 15, 60, 150, 540, 800, 1100 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 9,
        isPlegded: false,
        color: RED,
    },
    [ROME]: {
        country: ITALY,
        type: CITY,
        price: 240,
        mortage: 120,
        housePrice: 100,
        hotelPrice: 100,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 20, 80, 200, 600, 900, 1200 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 10,
        isPlegded: false,
        color: RED,
    },
    [BARCELONA]: {
        country: SPAIN,
        type: CITY,
        price: 280,
        mortage: 140,
        housePrice: 200,
        hotelPrice: 200,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 20, 100, 300, 900, 1250, 1500 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 12,
        isPlegded: false,
        color: BLUE,
    },
    [POWER_STATION]: {
        country: PLANT,
        type: PLANT,
        price: 300,
        mortage: 150,
        owner: BANK,
        // boardFieldNumber: 13,
        // nrInSet: 2,
        visit: [ THROW_10, THROW_20],
        isPlegded: false,
        icon: powerStation,
    },
    [SEWILLA]: {
        country: SPAIN,
        type: CITY,
        price: 280,
        mortage: 140,
        housePrice: 200,
        hotelPrice: 200,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 20, 100, 300, 900, 1250, 1500 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 14,
        isPlegded: false,
        color: BLUE,
    },
    [MADRIT]: {
        country: SPAIN,
        type: CITY,
        price: 320,
        mortage: 160,
        housePrice: 200,
        hotelPrice: 200,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 25, 120, 360, 1000, 1400, 1800 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 15,
        isPlegded: false,
        color: BLUE,
    },
    [WEST_RAILWAYS]: {
        country: RAILWAYS,
        type: RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: BANK,
        // nrInSet: 4,
        // boardFieldNumber: 16,
        isPlegded: false,
        icon: railway,
    },
    [LIVERPOOL]: {
        country: UK,
        type: CITY,
        price: 360,
        mortage: 180,
        housePrice: 200,
        hotelPrice: 200,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 30, 140, 400, 1100, 1500, 1900 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 17,
        isPlegded: false,
        color: ORANGE,
    },
    [GLASGOW]: {
        country: UK,
        type: CITY,
        price: 360,
        mortage: 180,
        housePrice: 200,
        hotelPrice: 200,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 30, 140, 400, 1100, 1500, 1900 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 19,
        isPlegded: false,
        color: ORANGE,
    },
    [LONDON]: {
        country: UK,
        type: CITY,
        price: 400,
        mortage: 200,
        housePrice: 200,
        hotelPrice: 200,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 35, 160, 440, 1200, 1600, 2000 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 20,
        isPlegded: false,
        color: ORANGE,
    },
    [ROTTERDAM]: {
        country: BENELUX,
        type: CITY,
        price: 440,
        mortage: 220,
        housePrice: 300,
        hotelPrice: 300,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 35, 180, 500, 1400, 1750, 2100 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 22,
        isPlegded: false,
        color: GREEN,
    },
    [BRUKSELA]: {
        country: BENELUX,
        type: CITY,
        price: 440,
        mortage: 220,
        housePrice: 300,
        hotelPrice: 300,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 35, 180, 500, 1400, 1750, 2100 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 24,
        isPlegded: false,
        color: GREEN,
    },
    [AMSTERDAM]: {
        country: BENELUX,
        type: CITY,
        price: 480,
        mortage: 240,
        housePrice: 300,
        hotelPrice: 300,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 40, 200, 600, 1500, 1850, 2200 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 25,
        isPlegded: false,
        color: GREEN,
    },
    [NORTH_RAILWAYS]: {
        country: RAILWAYS,
        type: RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: BANK,
        // nrInSet: 4,
        // boardFieldNumber: 26,
        isPlegded: false,
        icon: railway,
    },
    [MALMO]: {
        country: SWEEDEN,
        type: CITY,
        price: 520,
        mortage: 260,
        housePrice: 300,
        hotelPrice: 300,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 45, 220, 600, 1600, 1950, 2300 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 27,
        isPlegded: false,
        color: VIOLET,
    },
    [GOTEBORG]: {
        country: SWEEDEN,
        type: CITY,
        price: 520,
        mortage: 260,
        housePrice: 300,
        hotelPrice: 300,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 45, 220, 600, 1600, 1950, 2300 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 28,
        isPlegded: false,
        color: VIOLET,
    },
    [WATER_PLANT]: {
        country: PLANT,
        type: PLANT,
        price: 300,
        mortage: 150,
        owner: BANK,
        // nrInSet: 2,
        // boardFieldNumber: 29,
        visit: [ THROW_10, THROW_20],
        isPlegded: false,
        icon: waterPlant
    },
    [SZTOKHOLM]: {
        country: SWEEDEN,
        type: CITY,
        price: 560,
        mortage: 280,
        housePrice: 300,
        hotelPrice: 300,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 50, 240, 720, 1700, 2050, 2400 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        isPlegded: false,
        // boardFieldNumber: 30,
        color: VIOLET,
    },
    [FRANKFURT]: {
        country: RFN,
        type: CITY,
        price: 600,
        mortage: 300,
        housePrice: 400,
        hotelPrice: 400,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 55, 260, 780, 1900, 2200, 2550 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 32,
        isPlegded: false,
        color: BROWN,
    },
    [KOLONIA]: {
        country: RFN,
        type: CITY,
        price: 600,
        mortage: 300,
        housePrice: 400,
        hotelPrice: 400,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 55, 260, 780, 1900, 2200, 2550 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 33,
        isPlegded: false,
        color: BROWN,
    },
    [BONN]: {
        country: RFN,
        type: CITY,
        price: 640,
        mortage: 320,
        housePrice: 400,
        hotelPrice: 400,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 50, 300, 900, 2000, 2400, 2800 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 35,
        isPlegded: false,
        color: BROWN,
    },
    [EAST_RAILWAYS]: {
        country: RAILWAYS,
        type: RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: BANK,
        // nrInSet: 4,
        // boardFieldNumber: 36,
        isPlegded: false,
        icon: railway,
    },
    [INSBRUK]: {
        country: AUSTRIA,
        type: CITY,
        price: 700,
        mortage: 350,
        housePrice: 400,
        hotelPrice: 400,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 70, 350, 1000, 2200, 2600, 3000 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 38,
        isPlegded: false,
        color: BLACK,
    },
    [TAX]: {
        type: TAX,
        visit: [200],
        info: 'You pay $200, nothing more happens here.',
        icon: tax,
    },
    [WIEDEN]: {
        country: AUSTRIA,
        type: CITY,
        price: 700,
        mortage: 350,
        housePrice: 400,
        hotelPrice: 400,
        // nrOfHousesToPurchase: 0,
        // nrOfHousesToSell: 0,
        // nrOfHotelsToSell: 0,
        // nrOfHotelsToBuy: 0,        
        visit: [ 70, 350, 1000, 2200, 2600, 3000 ], // 0 houses, 1 house, 2 houses...
        owner: BANK,
        nrOfHouses: 0, // 5 houses === hotel
        // nrInSet: 3,
        // boardFieldNumber: 40,
        isPlegded: false,
        color: BLACK,
    },
}

export const boardInOrder = [
    START, SALONIKI, CHANCE_BLUE, ATENY, GUARDED_PARKING, SOUTH_RAILWAY, NEAPOL, CHANCE_RED, MEDIOLAN, ROME, 
    JAIL, BARCELONA, POWER_STATION, SEWILLA, MADRIT, WEST_RAILWAYS, LIVERPOOL, CHANCE_BLUE, GLASGOW, LONDON, 
    FREE_PARK, ROTTERDAM, CHANCE_RED, BRUKSELA, AMSTERDAM, NORTH_RAILWAYS, MALMO, GOTEBORG, WATER_PLANT, SZTOKHOLM, 
    GO_TO_JAIL, FRANKFURT, KOLONIA, CHANCE_BLUE, BONN, EAST_RAILWAYS, CHANCE_RED, INSBRUK, TAX, WIEDEN
];
