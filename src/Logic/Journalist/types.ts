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

type tRejection = {
    reason: string,
}

type tJurnalistOutput = tOption | tRejection;

type tJurnalistOutputArray = tJurnalistOutput[];
// Rejection[] as array because there may be a different reason for each estate

type tJurnalistOutputArrayOrRejection = tJurnalistOutputArray | tRejection;
// When all entries are rejections, it may better to show a single reason?

export type tJurnalistState = {
    buyBuildings:  tJurnalistOutputArrayOrRejection;
    sellBuildings: tJurnalistOutputArrayOrRejection;
    buyEstate?: tJurnalistOutput;
    sellEstates: tJurnalistOutputArrayOrRejection;
    plegdeEstates: tJurnalistOutputArrayOrRejection;
    unplegdeEstates: tJurnalistOutputArrayOrRejection;
    pay?: tJurnalistOutput; // When on not guarded parking, there is no reason to explain why not to pay
    getMoney?: tJurnalistOutput;
    goToJail?: tJurnalistOutput;
    move: boolean;
    endPhase: boolean;
}


