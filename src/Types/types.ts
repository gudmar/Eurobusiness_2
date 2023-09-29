export type tSubscription = (state: any) => void

export interface iSubscription<MessageType extends string> {
    callback: tSubscription,
    id: string,
    messageType: MessageType,
}

export type tAction<PayloadType> = {
    type: PayloadType,
    payload: any,
}

export type tCombineStringUnions<T> = T extends string ? T : never;
