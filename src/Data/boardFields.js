import {
    OtherTypes,
    EstateTypes,
    ChanceTypes,
} from '../Types/fields'

import {
    countries, notCountryTypes
} from '../Const/countries'
import { AMSTERDAM, ATENY, BARCELONA, BONN, BRUKSELA, CHANCE_BLUE, CHANCE_BLUE_LEFT, CHANCE_BLUE_RIGHT, CHANCE_BLUE_TOP, CHANCE_RED, CHANCE_RED_LEFT, CHANCE_RED_RIGHT, CHANCE_RED_TOP, EAST_RAILWAYS, FRANKFURT, FREE_PARKING, GLASGOW, GOTEBORG, GO_TO_JAIL, GUARDED_PARKING, INSBRUK, JAIL, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, NORTH_RAILWAYS, POWER_STATION, ROME, ROTTERDAM, SALONIKI, SEWILLA, SOUTH_RAILWAY, START, SZTOKHOLM, TAX, WATER_PLANT, WEST_RAILWAYS, WIEDEN } from '../Const/fieldNames';
import start from '../../public/BoardIcons/Start.svg';
import questionRed from '../../public/BoardIcons/questionRed.svg';
import questionBlue from '../../public/BoardIcons/questionBlue.svg';
import freePark from '../../public/BoardIcons/freePark.svg';
import jail from '../../public/BoardIcons/jail.svg';
import goToJail from '../../public/BoardIcons/goToJail.js'
import railway from '../../public/BoardIcons/railway.svg'
import powerStation from '../../public/BoardIcons/electricPlant.svg'
import waterPlant from '../../public/BoardIcons/waterPlant.svg'
import tax from '../../public/BoardIcons/tax.svg'

export const descriptors = {
    [START]: {
        type: OtherTypes.START,
        boardFieldNumber: 1,
        visit: [-400],
        icon: start,
        info: `You stop on the OtherTypes.START field, that means You get  $400. Notihing to do here.`,
    },
    [ATENY]: {
        type: EstateTypes.CITY,
        country: countries.GREECE,
        price: 120,
        mortage: 60,
        housePrice: 100,
        hotelPrice: 100,
        visit: [ 10, 40, 120, 360, 640, 900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 2, // 2 cities in the country
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        boardFieldNumber: 2,
        isPlegded: false, // zastawiony
    },
    [CHANCE_BLUE]: {
        type: ChanceTypes.CHANCE_BLUE,
        info: 'Draw a blue chance card',
        icon: questionBlue,
    },
    [CHANCE_RED]: {
        type: ChanceTypes.CHANCE_RED,
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
        country: countries.GREECE,
        type: EstateTypes.CITY,
        price: 120,
        mortage: 60,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,
        visit: [ 10, 40, 120, 360, 640, 900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 2,
        boardFieldNumber: 4,
        isPlegded: false,
    },
    [GUARDED_PARKING]: {
        type: 'guardedPark',
        boardFieldNumber: 5,
        visit: [400],
        info: 'You pay $400 for staying one extra trun here. This is mandatory,',
    },
    [FREE_PARKING]: {
        type: OtherTypes.FREE_PARK,
        boardFieldNumber: 11,
        visit: [0],
        wait: 1,
        info: 'You spend one extra turn here. The only good news is, there is no fee for staying here',
        icon: freePark,
    },
    [JAIL]: {
        type: OtherTypes.JAIL,
        boardFieldNumber: 11,
        wait: 2,
        info: 'You spend 2 extra turns here.',
        icon: jail,
    },
    [GO_TO_JAIL]: {
        type: OtherTypes.GO_TO_JAIL,
        boardFieldNumber: 31,
        info: 'You go to field 11, jail and spend 2 extra turns there.',
        icon: goToJail,
    },
    [SOUTH_RAILWAY]: {
        country: notCountryTypes.RAILWAYS,
        type: EstateTypes.RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 6,
        isPlegded: false,
        icon: railway,
    },
    [NEAPOL]: {
        country: countries.ITALY,
        type: EstateTypes.CITY,
        price: 200,
        mortage: 100,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 15, 60, 150, 540, 800, 1100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 7,
        isPlegded: false,
    },
    [MEDIOLAN]: {
        country: countries.ITALY,
        type: EstateTypes.CITY,
        price: 200,
        mortage: 100,
        housePrice: 100,
        hotelPrice: 100,        
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 15, 60, 150, 540, 800, 1100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 9,
        isPlegded: false,
    },
    [ROME]: {
        country: countries.ITALY,
        type: EstateTypes.CITY,
        price: 240,
        mortage: 120,
        housePrice: 100,
        hotelPrice: 100,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 20, 80, 200, 600, 900, 1200 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 10,
        isPlegded: false,
    },
    [BARCELONA]: {
        country: countries.SPAIN,
        type: EstateTypes.CITY,
        price: 280,
        mortage: 140,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 20, 100, 300, 900, 1250, 1500 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 12,
        isPlegded: false,
    },
    [POWER_STATION]: {
        country: notCountryTypes.PLANT,
        type: EstateTypes.POWER_STATION,
        price: 300,
        mortage: 150,
        owner: 'bank',
        nrInSet: 2,
        boardFieldNumber: 13,
        visit: [ '10 x thrown dice result', '20 x thrown dice result'],
        isPlegded: false,
        icon: powerStation,
    },
    [SEWILLA]: {
        country: countries.SPAIN,
        type: EstateTypes.CITY,
        price: 280,
        mortage: 140,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 20, 100, 300, 900, 1250, 1500 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 14,
        isPlegded: false,
    },
    [MADRIT]: {
        country: countries.SPAIN,
        type: EstateTypes.CITY,
        price: 320,
        mortage: 160,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 25, 120, 360, 1000, 1400, 1800 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 15,
        isPlegded: false,
    },
    [WEST_RAILWAYS]: {
        country: notCountryTypes.RAILWAYS,
        type: EstateTypes.RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 16,
        isPlegded: false,
        icon: railway,
    },
    [LIVERPOOL]: {
        country: countries.UK,
        type: EstateTypes.CITY,
        price: 360,
        mortage: 180,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 30, 140, 400, 1100, 1500, 1900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 17,
        isPlegded: false,
    },
    [GLASGOW]: {
        country: countries.UK,
        type: EstateTypes.CITY,
        price: 360,
        mortage: 180,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 30, 140, 400, 1100, 1500, 1900 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 19,
        isPlegded: false,
    },
    [LONDON]: {
        country: countries.UK,
        type: EstateTypes.CITY,
        price: 400,
        mortage: 200,
        housePrice: 200,
        hotelPrice: 200,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 35, 160, 440, 1200, 1600, 2000 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 20,
        isPlegded: false,
    },
    [ROTTERDAM]: {
        country: countries.BENELUX,
        type: EstateTypes.CITY,
        price: 440,
        mortage: 220,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 35, 180, 500, 1400, 1750, 2100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 22,
        isPlegded: false,
    },
    [BRUKSELA]: {
        country: countries.BENELUX,
        type: EstateTypes.CITY,
        price: 440,
        mortage: 220,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 35, 180, 500, 1400, 1750, 2100 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 24,
        isPlegded: false,
    },
    [AMSTERDAM]: {
        country: countries.BENELUX,
        type: EstateTypes.CITY,
        price: 480,
        mortage: 240,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 40, 200, 600, 1500, 1850, 2200 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 25,
        isPlegded: false,
    },
    [NORTH_RAILWAYS]: {
        country: notCountryTypes.RAILWAYS,
        type: EstateTypes.RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 26,
        isPlegded: false,
        icon: railway,
    },
    [MALMO]: {
        country: countries.SWEEDEN,
        type: EstateTypes.CITY,
        price: 520,
        mortage: 260,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 45, 220, 600, 1600, 1950, 2300 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 27,
        isPlegded: false,
    },
    [GOTEBORG]: {
        country: countries.SWEEDEN,
        type: EstateTypes.CITY,
        price: 520,
        mortage: 260,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 45, 220, 600, 1600, 1950, 2300 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 28,
        isPlegded: false,
    },
    [WATER_PLANT]: {
        country: notCountryTypes.PLANT,
        type: EstateTypes.WATER_PLANT,
        price: 300,
        mortage: 150,
        owner: 'bank',
        nrInSet: 2,
        boardFieldNumber: 29,
        visit: [ '10 x thrown dice result', '20 x thrown dice result'],
        isPlegded: false,
        icon: waterPlant
    },
    [SZTOKHOLM]: {
        country: countries.SWEEDEN,
        type: EstateTypes.CITY,
        price: 560,
        mortage: 280,
        housePrice: 300,
        hotelPrice: 300,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 50, 240, 720, 1700, 2050, 2400 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        isPlegded: false,
        boardFieldNumber: 30,
    },
    [FRANKFURT]: {
        country: countries.RFN,
        type: EstateTypes.CITY,
        price: 600,
        mortage: 300,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 55, 260, 780, 1900, 2200, 2550 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 32,
        isPlegded: false,
    },
    [KOLONIA]: {
        country: countries.RFN,
        type: EstateTypes.CITY,
        price: 600,
        mortage: 300,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 55, 260, 780, 1900, 2200, 2550 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 33,
        isPlegded: false,
    },
    [BONN]: {
        country: countries.RFN,
        type: EstateTypes.CITY,
        price: 640,
        mortage: 320,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 50, 300, 900, 2000, 2400, 2800 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 35,
        isPlegded: false,
    },
    [EAST_RAILWAYS]: {
        country: notCountryTypes.RAILWAYS,
        type: EstateTypes.RAILWAY,
        price: 400,
        mortage: 200,
        visit: [50, 100, 200, 400],
        owner: 'bank',
        nrInSet: 4,
        boardFieldNumber: 36,
        isPlegded: false,
        icon: railway,
    },
    [INSBRUK]: {
        country: countries.AUSTRIA,
        type: EstateTypes.CITY,
        price: 700,
        mortage: 350,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 70, 350, 1000, 2200, 2600, 3000 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 38,
        isPlegded: false,
    },
    [TAX]: {
        type: OtherTypes.TAX,
        visit: [200],
        info: 'You pay $200, nothing more happens here.',
        icon: tax,
    },
    [WIEDEN]: {
        country: countries.AUSTRIA,
        type: EstateTypes.CITY,
        price: 700,
        mortage: 350,
        housePrice: 400,
        hotelPrice: 400,
        nrOfHousesToPurchase: 0,
        nrOfHousesToSell: 0,
        nrOfHotelsToSell: 0,
        nrOfHotelsToBuy: 0,        
        visit: [ 70, 350, 1000, 2200, 2600, 3000 ], // 0 houses, 1 house, 2 houses...
        owner: 'bank',
        nrOfHouses: 0, // 5 houses === hotel
        nrInSet: 3,
        boardFieldNumber: 40,
        isPlegded: false,
    },
}

export const boardInOrder = [
    START, SALONIKI, CHANCE_BLUE, ATENY, GUARDED_PARKING, SOUTH_RAILWAY, NEAPOL, CHANCE_RED, MEDIOLAN, ROME, 
    JAIL, BARCELONA, POWER_STATION, SEWILLA, MADRIT, WEST_RAILWAYS, LIVERPOOL, CHANCE_BLUE, GLASGOW, LONDON, 
    FREE_PARKING, ROTTERDAM, CHANCE_RED, BRUKSELA, AMSTERDAM, NORTH_RAILWAYS, MALMO, GOTEBORG, WATER_PLANT, SZTOKHOLM, 
    GO_TO_JAIL, FRANKFURT, KOLONIA, CHANCE_BLUE, BONN, EAST_RAILWAYS, CHANCE_RED, INSBRUK, TAX, WIEDEN
];
