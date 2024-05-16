import { tStateModifierArgs } from "./types";

export const getMayPlayerEndGameOptions = (args: tStateModifierArgs) => {
    // This should be the last function
    const { options, state, playerName } = args;
    return state;
}