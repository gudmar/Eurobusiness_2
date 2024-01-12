import { iSubscription, tSubscription } from "../Types/types"

// implementations should extend iSubscribtionHandler<SubscriptionMessageType extends string, StateType>

export abstract class SubscribtionsHandler<SubscriptionMessageType extends string, StateType> {
    private _subscribtions: iSubscription<SubscriptionMessageType>[] =[];
    logSubscribtions() {console.log('Subscribtions: ', this._subscribtions)}
    subscribe(subscription: iSubscription<SubscriptionMessageType>) {
        this._subscribtions.push(subscription);
    }

    subscribeDebug(callback: tSubscription, id: string, messageType: SubscriptionMessageType){
        this._subscribtions.push({callback, id, messageType});
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