import { TurnPhases } from "../../types";
import { tJournalistOptionsUnderDevelopement } from "../types";
import { tCustomError, tStateModifierArgs } from "./types";

export enum MovementReasons {
    NotTargetPlayer = 'You have to be the curren player to move',
    AlreadyMoved = 'You already moved',
    TryToRunAway = 'You have a mandatory action to perform before move',
    LostGame = 'You lost the game',
    InJail = 'Prisoners cannot move',
}

const throwIfPlayerNotTargetPlayer = (args: tStateModifierArgs):void => {
    const { options, playerName} = args;
    const currentPlayerName = options?.players.currentPlayersName;
    if (currentPlayerName === playerName) throw new Error(MovementReasons.NotTargetPlayer)
}

const throwIfAlreadyMoved = (args: tStateModifierArgs): void => {
    const { options } = args;
    const isMoved = options?.game.turnPhase === TurnPhases.AfterMove;
    if (isMoved) throw new Error(MovementReasons.AlreadyMoved);
}

const throwIfAttemptToRunAway = (args: tStateModifierArgs): void => {
    const { options } = args;
}

export const getMoveOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName} = args;
    try {
        throwIfPlayerNotTargetPlayer(args);
        throwIfAlreadyMoved(args);
        throwIfAttemptToRunAway(args);
    } catch(error: unknown) {
        const reason = (error as tCustomError)?.message
        if (!reason) throw error;
        state.move = { reason };
    }
    // throw new Error('Implement Move Options')
    return args.state
}
