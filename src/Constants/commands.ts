// COMMANDER MESSAGES

import { tCombineStringUnions } from "../Types/types";

// Commands are given as a result of final decision. HOWEVER SOME constants are reused in message opretions
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

// DIVIDED into types to keep controll over it

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



export type tTransactionMessages = 
    typeof PURCHASE_ESTATE_FROM_BANK |
    typeof AUCTION_ESTATE |
    typeof MORTGAGE |
    typeof BUY_FROM_MORTGAGE |
    typeof BUY_HOUSE |
    typeof SELL_HOUSE |
    typeof BUY_HOTEL |
    typeof SELL_HOTEL |
    typeof AUCTION_CARD

export type tAuctionFromBankMessages = 
    typeof WHO_PARTICIPATES |
    typeof RESIGNATION |
    typeof NEXT_OFFER |
    typeof SOLD_FROM_BANK

export type tMovementMessages =
    typeof PASSED_START |
    typeof VISITED_FIELD

export type tAuctionFromPlayerMessages = 
    typeof SOLD_FROM_PLAYER

type tMessagesNotCombined = 
    tChanceMessages | 
    tTransactionMessages | 
    tAuctionFromBankMessages | 
    tAuctionFromPlayerMessages

export type tAllMessages = tCombineStringUnions<tMessagesNotCombined>;
