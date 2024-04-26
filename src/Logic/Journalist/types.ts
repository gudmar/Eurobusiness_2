import { tObject } from "../types";

export enum Messages {
    optionsChanged = 'Options changed',
}

export enum OptionTypes {
    Move = 'Move pawn to next field',
    BuyEstate = 'Buy estate that just standed on',
    AuctionEstate = 'Let all players auction estate in case no will to purchase',
    AuctionOwnedEstate = 'Let all players auction estate already owned by player',
    BuyBuildings = 'Buy buildings',
    SellBuildings = 'Sell buildings',
    Mortgage = 'Mortgage',
    BuyOut = 'Buy out from mortgage',
    DrawChanceCard = 'Draw a chance card',
    Pay = 'Pay some fee',
    GoToJail = 'Go to jail'
}

export type tOption = {
    isMandatory: boolean,
    type: OptionTypes,
    payload?: any
}

export type tRejection = {
    reason: string,
}

type tJournalistOutput = tOption | tRejection;

type tJournalistOutputArray = tJournalistOutput[];
// Rejection[] as array because there may be a different reason for each estate

type tJournalistOutputArrayOrRejection = tJournalistOutputArray | tRejection;
type tJournalistOutputObject = tObject<any>;
// When all entries are rejections, it may better to show a single reason?

type tJournalistOutputBooleanOrRejection = boolean | tRejection;

export type tJournalistState = {
    buyBuildings:  tJournalistOutputArrayOrRejection;
    sellBuildings: tJournalistOutputArrayOrRejection;
    buyEstate?: tJournalistOutput;
    sellEstates: tJournalistOutputArrayOrRejection;
    plegdeEstates: tJournalistOutputArrayOrRejection;
    unplegdeEstates: tJournalistOutputArrayOrRejection;
    pay?: tJournalistOutput; // When on not guarded parking, there is no reason to explain why not to pay
    getMoney?: tJournalistOutput;
    goToJail?: tJournalistOutput;
    move: boolean;
    endPhase: boolean;
}

export type tJournalistOptionsUnderDevelopement = {
    buyBuildings?:  tJournalistOutputObject;
    sellBuildings?: tJournalistOutputArrayOrRejection;
    buyEstate?: tJournalistOutput;
    sellEstates?: tJournalistOutputArrayOrRejection;
    plegdeEstates?: tJournalistOutputArrayOrRejection;
    unplegdeEstates?: tJournalistOutputArrayOrRejection;
    pay?: tJournalistOutput; // When on not guarded parking, there is no reason to explain why not to pay
    getMoney?: tJournalistOutput;
    goToJail?: tJournalistOutput;
    move?: tJournalistOutputBooleanOrRejection;
    endPhase?: tJournalistOutputBooleanOrRejection;
}
