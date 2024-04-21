import { tObject } from "../Logic/types";

export type tStateModifier<State, Options> = ({state, options}: {state: State, options?: Options}) => State;

export const applyStateModifiers = <State extends tObject<any>, Options>(args: {state: State, options: Options}, listOfModifiers: tStateModifier<State, Options>[]) => {
    const {state, options} = args;
    if (options === undefined) return state;
    const result = listOfModifiers.reduce((modifeidState, modifier) => {
      const nextState = modifier({state: modifeidState, options});
      return nextState;
    }, state)
    return result;
  }
  