
import { tEstateField } from "../Logic/boardTypes";
import { Commands } from "../Logic/Commander/commands";

export type tSubscription = (state: any) => void

export interface iSubscription<MessageType extends string> {
    callback: tSubscription,
    id: string,
    messageType: MessageType,
}

export type tActionPayloadTypes = string | number | boolean | object

export type tAction<PayloadType=Commands> = {
    type: PayloadType,
    payload?: tActionPayloadTypes,
}

export interface iDictionary {
    [key: string]: any,
}

export type tCombineStringUnions<T> = T extends string ? T : never;

export type tRef<Type> = {current: Type | null}

export type tClassFromInterface<Args, Interface> = Args extends [] ? new (...args: Args) => Interface : new () => Interface

export type tToBeImplemented = any;

export interface iAny {
    [key: string] : any,
}

export interface iProps { [key: string]: unknown }

export interface iMessage {
    title: string,
    message: string,
}

export type tSelectedEstate = tEstateField | null;

export type tGetSubscribtionType = {
    callback: tSubscription,
    estateInstance: tSelectedEstate,
    subscribtionId: string
}

export type tPrimitive = number | string | bigint | symbol | null | undefined | boolean;

export type tPrimitiveEntry = [string, tPrimitive]

export type tEntry = [string, any]
