import { tFlattenedFieldTypes } from "../Data/types";
import { tEstateField } from "../Logic/boardTypes";
import { tGetSubscribtionType } from "../Types/types";

export const getEstateSubscribtion = ({callback, estateInstance, subscribtionId='edited-estate'}: tGetSubscribtionType) => {
    const name = estateInstance?.name;
    const messageType = name as tFlattenedFieldTypes
    const id = `${subscribtionId}-${name}`;
    const decoratedCb = (args: unknown) => { callback(args) }
    const subscribtion = {callback: decoratedCb, id, messageType};
    const subscribe = () => ((estateInstance as tEstateField)?.subscribe(subscribtion));
    const unsubscribe = () => ((estateInstance as tEstateField)?.unsubscribe(messageType, id));
    return {subscribe, unsubscribe};
}
