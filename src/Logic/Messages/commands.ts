// COMMANDER MESSAGES

// Commands are given as a result of final decision.
// Player gets on field, 
// Player asks Judge about possibilities,
// Player receives array of messages (of possibilities)
// Player asks his Strategy what decision to take,
// Strategy orders CommanderProxy to run some commands that will change state
// CommanderProxy needed to separate Strategies (multiple different implementations) from
// functions that do jobs on low level (like pay)

// This here are types for Commander functions running commands on low level

export const PAY = 'pay';
export const GAIN = 'gain';
export const PAY_EACH_HOUSE = 'payForEachHouse';
export const PAY_EACH_HOTEL = 'payForEachHotel';
export const GO_TO_FIELD = 'goToField';
export const GO_TO_FIELD_CONDITIONALLY_PASS_START = 'goToFieldConditionallyPassStart'
export const GO_BACK = 'goBack';
export const GO_TO_JAIL_NO_START_PASS = 'goToJailNoStartPass';
export const FREE_FROM_JAIL = 'freeFromJail'
export const GAIN_FROM_EACH_PLAYER = 'gainFromEachPlayer';
export const PAY_OR_DRAW_FROM_RED = 'payOrDrawFromRed';

// Transactions
export const PURCHASE_ESTATE_FROM_BANK = 'purchaseEstateFromBank';
export const AUCTION_ESTATE = 'startAuctionEstate';
export const MORTGAGE ='mortgage';
export const BUY_FROM_MORTGAGE = 'buyOutFromMortgage'
export const BUY_HOUSE = 'buyHouse';
export const SELL_HOUSE = 'sellHouseToBank'
export const BUY_HOTEL = 'buyHotelAndGiveAway4Houses'
export const SELL_HOTEL = 'sellHotelIfEnoughHouses'
export const AUCTION_CARD = 'auctionGetFromJailCard'

//Auction estate from bank
export const WHO_PARTICIPATES = 'whoParticipatesInAuction' // to all players, initial price, estate, 
export const RESIGNATION = 'iResign'; // palyer resigns
export const NEXT_OFFER = 'nextOffer' // to all interested players, estate, next minimal price, 
export const SOLD_FROM_BANK = 'estateSoldFromBank'

// Movement
export const PASSED_START = 'passedStart'
export const VISITED_FIELD = 'visitedField';

// Auction from player
// WHO_PARTICIPATES, RESIGNATION, NEXT_OFFER  // the same as for auctionWstate from bank
export const SOLD_FROM_PLAYER = 'soldFromPlayer'


export type tChanceMessages = 
    typeof PAY |
    typeof GAIN |
    typeof PAY_EACH_HOUSE |
    typeof PAY_EACH_HOTEL |
    typeof GO_TO_FIELD |
    typeof GO_TO_FIELD_CONDITIONALLY_PASS_START |
    typeof GO_BACK |
    typeof GO_TO_JAIL_NO_START_PASS |
    typeof FREE_FROM_JAIL |
    typeof GAIN_FROM_EACH_PLAYER |
    typeof PAY_OR_DRAW_FROM_RED


