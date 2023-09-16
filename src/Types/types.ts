import { tCountries, tEstateTypes, tVisitPayment } from "../Data/types"

export type tSubscription = <T>(state: T) => void

export interface iSubscription<MessageType extends string> {
    callback: tSubscription,
    id: string,
    messageType: MessageType,
}

export type tAction<PayloadType> = {
    type: PayloadType,
    payload: any,
}
