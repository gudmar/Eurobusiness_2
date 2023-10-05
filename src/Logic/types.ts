import { iSubscription, tSubscription } from "../Types/types";

export interface iSubscribtionHandler<SubscriptionMessageType extends string, StateType> {
    subscribe: (subscribtion: iSubscription<SubscriptionMessageType>) => void;
    subscribeDebug: (callback: tSubscription, id: string, messageType: SubscriptionMessageType) => void;
    runAllSubscriptions: (type: SubscriptionMessageType, data: StateType) => void,
    unsubscribe: (type: SubscriptionMessageType, id: string) => void,
}
