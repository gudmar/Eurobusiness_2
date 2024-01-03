import { useEffect } from "react";
import { getUuid } from "../Functions/getUuid";
import { SubscribtionsHandler } from "../Logic/SubscrbtionsHandler";
import { tSubscription } from "../Types/types";

export const getUseSubscribtion = <SubscribtionType extends SubscribtionsHandler<any, unknown>>(messageType: string) => (observationTarget: SubscribtionType, callback: tSubscription) => {
    useEffect(() => {
        const uuid = getUuid();
        observationTarget.subscribe({ messageType, id: uuid, callback });
        return () => observationTarget.unsubscribe(messageType, uuid);
    })
} 