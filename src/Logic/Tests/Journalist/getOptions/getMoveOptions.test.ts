import { getTestableOptions } from "../../../Journalist/getOptions";
import { tRejection } from "../../../Journalist/types";
import { MovementReasons } from "../../../Journalist/utils/getMoveOptions";
import { TurnPhases } from "../../../types";
import { getMockedGameState } from "../getGameStateMock/getGameStateMock";
import { BALIN, DORIN } from "../getGameStateMock/getStateTemplate";

describe('Testing getMoveOptions', () => {
    it('Should return NotTargetPlayer reason, when player is not current turn player', () => {
        const state = getMockedGameState({
            currentPlayer: [DORIN],
            setGamePhase: TurnPhases.BeforeMove
        });
        const result = getTestableOptions(state, BALIN);
        const moveResult = (result?.move as tRejection)?.reason;
        expect(moveResult).toEqual(MovementReasons.NotTargetPlayer);
    });
    it('Should return an AlreadyMoved reason, when player already did his move', () => {
        const state = getMockedGameState({
            currentPlayer: [DORIN],
            setGamePhase: TurnPhases.AfterMove
        });
        const result = getTestableOptions(state, DORIN);
        const moveResult = (result?.move as tRejection)?.reason;
        expect(moveResult).toEqual(MovementReasons.AlreadyMoved);
    });
    it('Should return a gameLost reason, when player already lost his game', () => {
        const state = getMockedGameState({
            currentPlayer: [DORIN],
            setGameLost: [DORIN],
            setGamePhase: TurnPhases.BeforeMove
        });
        const result = getTestableOptions(state, DORIN);
        const moveResult = (result?.move as tRejection)?.reason;
        expect(moveResult).toEqual(MovementReasons.LostGame);
    });
    it('Should return an InJail reason, when player is in jail', () => {
        const state = getMockedGameState({
            currentPlayer: [DORIN],
            toJail: [DORIN],
            setGamePhase: TurnPhases.BeforeMove
        });
        const result = getTestableOptions(state, DORIN);
        const moveResult = (result?.move as tRejection)?.reason;
        expect(moveResult).toEqual(MovementReasons.InJail);
    });
    it('Should return a Mandatory action left when player has to go to jail', () => {

    });
    it('Should return a mandatory action left, when player is on bank-owned field', () => {

    });
    it('Should return a mandatory action left, when player has to draw a chance card', () => {

    });
    it('Should return a mandatory action left, when player has to pay another player for staying on his field', () => {

    });
    it('Should return a mandatory action left when player has to pay for a tax field', () => {

    });
    it('Should return a mandatory action left when player has to receive money for passing the start field', () => {

    });
    it('Should not return any reason when player is allowed to move', () => {

    })
});
