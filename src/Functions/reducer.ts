export type tReducerAction = <S extends iGenericState, Payload>(state: S, payload?: Payload) => S;

// interface iGenericState {
//     [key: string]: unknown
// }
type iGenericState = any

// export interface tReducerLogic {
//     [key: string]: tReducerAction,
//     // [key: string]: any,
// }
type tReducerLogic = any

export type tActionFunction<ActionType, ActionPayload> = (payload?: ActionPayload) => ({type: ActionType, payload?: ActionPayload})
export type tDispatchArgs<ActionType, ActionPayload> =  {type: ActionType, payload?: ActionPayload}

// export const getReducer = <State extends iGenericState, Type extends string, Payload>(reducerLogic: tReducerLogic) => (state: State, {type, payload}: {type: Type, payload: Payload}) => {
export const getReducer = <State extends iGenericState, Type extends string, Payload>(reducerLogic: tReducerLogic) => 
        (state: State, {type, payload}: {type: Type, payload?: Payload}) => {
    const newStateGetter = reducerLogic[type];
    console.log(type, payload)
    const newState = newStateGetter(state, payload);
    return newState;
};

type tDispatchFunctionMandatoryPayload<Types, Payload> = (args: {type: Types, payload: Payload}) => void
type tDispatchFunctionNoPayload<Types> = (args: {type: Types}) => void
// export type tDispatchFunction<Types, Payload> = tDispatchFunctionMandatoryPayload<Types, Payload> | tDispatchFunctionNoPayload<Types>
export type tDispatchFunction<Types, Payload> = (args: {type: Types, payload?: Payload}) => void
