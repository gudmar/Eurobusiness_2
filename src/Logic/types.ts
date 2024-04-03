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

export type tObject<Value> = { [key: string]: Value}
