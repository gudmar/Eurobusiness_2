import { findEntry } from "../../../Functions/findEntry";
import { TurnPhases } from "../../types";
import { GET_MONEY } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { tCustomError, tStateModifierArgs } from "./types";

export enum MovementReasons {
    NotTargetPlayer = 'You have to be the current player to move',
    AlreadyMoved = 'You already moved',
    MandatoryActionLeft = 'You have a mandatory action to perform before move',
    LostGame = 'You lost the game',
    InJail = 'Prisoners cannot move',
}

const getMandatoryOptionLocation = (pathToMandatoryAction?: string) => {
    if (!pathToMandatoryAction) return '';
    const locationToMessageMap = {
        goToJail: 'Player has to go to jail',
        handleStayOnBankOwnedEstate: 'Player has to take part in estate auction',
        drawChanceCard: 'Player has to draw a chance card',
        pay: 'Player has to pay',
        [GET_MONEY]: 'Player did not receive money',
    };
    const reason = Object.entries(locationToMessageMap).find(([key, value]) => {
        const isThisTheCase = pathToMandatoryAction.includes(key);
        return isThisTheCase;
    });
    if (!reason) return '';
    return reason;
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

const throwIfMandatoryActionLeft = (args: tStateModifierArgs): void => {
    const { options } = args;
    const { result: isMandatory, path } = findEntry(options!, [ 'isMandatory', true ]);
    const whatMandatoryAction = getMandatoryOptionLocation(path);
    if (isMandatory) throw new Error(
        `${MovementReasons.MandatoryActionLeft}. ${whatMandatoryAction}.`
    )
}

const getCurrentPlayerParam = (args: tStateModifierArgs, paramName: string) => {
    const { options, state, playerName} = args;
    const players = options?.players?.playersList;
    const currentPlayer = players?.find(({name}) => playerName === name);
    if (!currentPlayer) throw new Error(`No player named ${playerName}`)
    if (paramName in Object.keys(currentPlayer)) {
        const param = (currentPlayer as any)?.[paramName];
        return param;
    }
    throw new Error(`No param named ${paramName} in player ${playerName}`)
}

const isInPrison = (args: tStateModifierArgs) => {
    const result = getCurrentPlayerParam(args, 'isInPrison');
    return result;
}

const isGameLost = (args: tStateModifierArgs) => {
    const result = getCurrentPlayerParam(args, 'isGameLost');
    return result;
}

const throwIfInPrison = (args: tStateModifierArgs) => {
    const isPlayerInPrison = isInPrison(args);
    if (isPlayerInPrison) throw new Error(MovementReasons.InJail);
}

const throwIfGameLost = (args: tStateModifierArgs) => {
    const isPlayersGameLost = isGameLost(args);
    if (isPlayersGameLost) throw new Error(MovementReasons.LostGame);
}

export const getMoveOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName} = args;
    try {
        if (!options) throw new Error('getMoveOptions: game options undefined');
        throwIfPlayerNotTargetPlayer(args);
        throwIfGameLost(args);
        throwIfAlreadyMoved(args);
        throwIfMandatoryActionLeft(args);
        throwIfInPrison(args);
    } catch(error: unknown) {
        const reason = (error as tCustomError)?.message
        if (!reason) throw error;
        state.move = { reason };
    }
    return args.state
}
