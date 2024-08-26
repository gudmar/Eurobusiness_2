import { ACTIONS, IS_MANDATORY } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { tStateModifierArgs } from "./types";

export enum GiveUpReasons {
    AlreadyLost = 'Player already lost game'
}

const throwIfAlreadyLostGame = (args: tStateModifierArgs) => {
    const playerName = args.playerName;
    const player = args.options?.players.playersList.find((player) => player.name === playerName);
    const isLost = player?.isGameLost;
    if (isLost) throw new Error(GiveUpReasons.AlreadyLost)
}

export const giveUp = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName} = args;
    try {
        throwIfAlreadyLostGame(args);
    } catch (e) {
        state.giveUp = {
            [IS_MANDATORY]: false,
            [ACTIONS]: [{type: OptionTypes.GiveUp}]
        }
        return state
    }
    state!.giveUp = {
        [ACTIONS]: [{ 
            type: OptionTypes.GiveUp,
            payload: playerName,
        }],
        [IS_MANDATORY]: false
    }
    return args.state;
}