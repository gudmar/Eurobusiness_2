export const applyStateModifiers = <State, Options>(args: {state: State, options: Options}, listOfModifiers: (({state, options}: {state: State, options: Options}) => State)[]) => {
    const {state, options} = args;
    if (options === undefined) return state;
    const result = listOfModifiers.reduce((modifeidState, modifier) => {
      const nextState = modifier({state: modifeidState, options});
      return nextState;
    }, state)
    return result;
  }
  