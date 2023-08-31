import { iSubscription } from "../Types/types"

export abstract class SubscribtionsHandler<SubscriptionMessageType extends string, StateType> {
    private _subscribtions: iSubscription<SubscriptionMessageType>[] =[];

    subscribe(subscription: iSubscription<SubscriptionMessageType>) {
        this._subscribtions.push(subscription);
    }

    runAllSubscriptions(type: SubscriptionMessageType, data: StateType) {
        this._subscribtions.forEach((subscription) => {
            if (type === subscription.messageType) {
                subscription.callback(data);
            }
        })
    }

    unsubscribe(type: SubscriptionMessageType, id: string) {
        const newSubscriptions = this._subscribtions.filter((subscription) => 
            !(subscription.messageType === type && subscription.id === id)
        )
        this._subscribtions = newSubscriptions;
    }
}