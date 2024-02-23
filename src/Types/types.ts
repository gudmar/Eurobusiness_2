import { tColors } from "../Data/types";
import { tBankState } from "../Logic/Bank/types";
import { tEstateField, tField } from "../Logic/boardTypes";
import { tChanceCardState } from "../Logic/Chance/ChanceCardHolder";
import { tDiceState, TestModes } from "../Logic/Dice/types";
import { iPlayerSnapshot } from "../Logic/Player/types";

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

export interface iDictionary {
    [key: string]: any,
}

export type tCombineStringUnions<T> = T extends string ? T : never;

// export type tClassFromInterface<Args extends [], Interface> = new (...args: Args) => Interface

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
