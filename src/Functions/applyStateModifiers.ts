import { tObject } from "../Logic/types";

export type tStateModifier<State, Options> = ({state, options, playerName}: {state: State, options?: Options, playerName: string}) => State;

export const applyStateModifiers = <State extends tObject<any>, Options>(args: {state: State, options: Options, playerName: string}, listOfModifiers: tStateModifier<State, Options>[]) => {
    const {state, options, playerName} = args;
    if (options === undefined) return state;
    const result = listOfModifiers.reduce((modifeidState, modifier) => {
      const nextState = modifier({state: modifeidState, options, playerName});
      return nextState;
    }, state)
    return result;
  }
  