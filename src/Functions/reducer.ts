export type tReducerAction = <S extends iGenericState, Payload>(state: S, payload?: Payload) => S;

type iGenericState = any

type tReducerLogic = any

export type tActionFunction<ActionType, ActionPayload> = (payload?: ActionPayload) => ({type: ActionType, payload?: ActionPayload})
export type tDispatchArgs<ActionType, ActionPayload> =  {type: ActionType, payload?: ActionPayload}

export const getReducer = <State extends iGenericState, Type extends string, Payload>(reducerLogic: tReducerLogic) => 
        (state: State, {type, payload}: {type: Type, payload?: Payload}) => {
    const newStateGetter = reducerLogic[type];
    console.log(type, payload)
    console.log('State in reducer', JSON.stringify(state))
    const newState = newStateGetter(state, payload);
    return newState;
};

export type tDispatchFunction<Types, Payload> = (args: {type: Types, payload?: Payload}) => void
