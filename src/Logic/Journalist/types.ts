import { tObject } from "../types";
import { GET_MONEY, PAY } from "./const";
import { tStateModifierArgs } from "./utils/types";

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
    GoToJail = 'Go to jail',
    UseSpecialCard = 'Use special card',
    SellSpecialCard = 'Sell special card',
    GetMoney = 'Get money',
    EndTurn = 'End turn',
}

export type tOptionAction = {
    type: OptionTypes,
    payload?: any
}

export type tOption = {
    isMandatory: boolean,
    actions: tOptionAction[],
}

export type tRejection = {
    reason: string,
}

type tJournalistOutput = tOption | tRejection;

type tJournalistOutputArray = tJournalistOutput[];
// Rejection[] as array because there may be a different reason for each estate

export type tJournalistOutputArrayOrRejection = tJournalistOutputArray | tRejection;
type tJournalistOutputObject = tObject<any>;
// When all entries are rejections, it may better to show a single reason?

type tJournalistOutputBooleanOrRejection = boolean | tRejection;

type tPayments = {   
    visigingOtherPlayersEstate?: tJournalistOutput,
    // payload: {target: player name / bank, ammount: number}
    visitingPaymentField?: tJournalistOutput,
    chanceCardPayment?: tJournalistOutput,
}

type tGetMoney = {
    passingStart: tJournalistOutput,
    otherPlayerVisited: tJournalistOutput,
}

export type tJournalistState = {
    // buyBuildings:  tJournalistOutputArrayOrRejection[] | tJournalistOutputArrayOrRejection;
    buyBuildings: tOption | tRejection,
    // { reason: HousePurchaseLimitReached || 'not this turn phase' }  | 
    // {
    //     isMandatory: false, type: BuyBuildings, payload: { GREECE: [permits], ITALY: [permits]}
    // }
    // sellBuildings: tJournalistOutputArrayOrRejection;
    sellBuildings: tJournalistOutput,
    // buyEstate?: tJournalistOutput;
    // auctionEstate?: tJournalistOutput;
    handleStayOnBankOwnedEstate?: tJournalistOutput;
    sellEstates: tJournalistOutput;
    plegdeEstates: tJournalistOutput;
    unplegdeEstates: tJournalistOutput;
    [PAY]?: tPayments; // When on not guarded parking, there is no reason to explain why not to pay
    [GET_MONEY]?: tGetMoney;
    goToJail?: tJournalistOutput;
    specialCards?: tJournalistOutput;
    drawChanceCard?: tJournalistOutput;
    move: boolean;
    endTurn: tJournalistOutput;
    playerName?: string;
}

export type tJournalistOptionsUnderDevelopement = {
    buyBuildings?:  tJournalistOutputObject;
    sellBuildings?: tJournalistOutputObject;
    // buyEstate?: tJournalistOutput;
    handleStayOnBankOwnedEstate?: tJournalistOutput;
    // auctionEstate?: tJournalistOutput;
    sellEstates?: tJournalistOutput;
    plegdeEstates?: tJournalistOutput;
    unplegdeEstates?: tJournalistOutput;
    specialCards?: tJournalistOutput;
    drawChanceCard?: tJournalistOutput;
    pay?: tPayments; // When on not guarded parking, there is no reason to explain why not to pay
    [GET_MONEY]?: tGetMoney;
    goToJail?: tJournalistOutput;
    move?: tJournalistOutputBooleanOrRejection;
    endTurn?: tJournalistOutput;
}

export type tSellEstatePrivilage = {
    reason: string,
    initialPrice: number,
}

export type tSellEstatesOptions = {
    [countryName: string]: {
        [cityName: string]: tRejection
    } | tRejection
} | tRejection;

export type tBuilderFunction = (args: tStateModifierArgs) => tJournalistOptionsUnderDevelopement;

export type tThrowIfNotInOrderArgs = {
    expectedBeforeFunction: tBuilderFunction,
    expectedAfterFunction: tBuilderFunction,
    sequence: tBuilderFunction[],
}

