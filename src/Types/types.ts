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

// export type tClassFromInterface<Args extends [], Interface> = new (...args: Args) => Interface

export type tClassFromInterface<Args, Interface> = Args extends [] ? new (...args: Args) => Interface : new () => Interface

export type tToBeImplemented = any;

export interface iAny {
    [key: string] : any,
}
