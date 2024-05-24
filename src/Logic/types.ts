import { tColors } from "../Data/types";
import { iSubscription, tSubscription } from "../Types/types";

export interface iSubscribtionHandler<SubscriptionMessageType extends string, StateType> {
    subscribe: (subscribtion: iSubscription<SubscriptionMessageType>) => void;
    subscribeDebug: (callback: tSubscription, id: string, messageType: SubscriptionMessageType) => void;
    runAllSubscriptions: (type: SubscriptionMessageType, data: StateType) => void,
    unsubscribe: (type: SubscriptionMessageType, id: string) => void,
}

export interface iCityMemento {
    name: string,
    owner: string,
    nrOfHouses: number,
    isPlegded: boolean,
}

export interface iNonCityEstatesMemento {
    name: string,
    owner: string,
    isPlegded: boolean,
}

export interface iAction<Type, Payload> {
    type: Type,
    payload: Payload
}

export enum TurnPhases {
    BeforeMove = 'Before move',
    AfterMove = 'After move'
}

export enum DoneThisTurn {
    GotMoneyForStart = 'Got money for start',
    PayedForVisit = 'Payed for visit',
    DrawnChanceCard = 'Drawn chance card',
    IncrementedTurnsToWait = 'Incremented turns to wait',
    BoughtEstate = 'Bought an estate',
    GoneToJail = 'Player went to prison this turn'
    // Turn phases, so move could be included here,
    // Nr of houses build this turn could be inculded here
    // However too much implementation already done
}

export type tObject<Value> = { [key: string]: Value}
