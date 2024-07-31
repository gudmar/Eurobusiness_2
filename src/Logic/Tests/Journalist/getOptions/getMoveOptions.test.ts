import { WATER_PLANT, YELLOW } from "../../../../Data/const";
import { getTestableOptions } from "../../../Journalist/getOptions";
import { OptionTypes, tOption, tRejection } from "../../../Journalist/types";
import { GO_TO_JAIL_INDEX } from "../../../Journalist/utils/getGoToJailOptions";
import { MovementReasons } from "../../../Journalist/utils/getMoveOptions";
import { TAX_FIELD_INDEX } from "../../../Journalist/utils/getPaymentOptions";
import { TurnPhases } from "../../../types";
import { getMockedGameState } from "../getGameStateMock/getGameStateMock";
import { BALIN, DORIN } from "../getGameStateMock/getStateTemplate";
import { RED_CHANCE_FIELD_INDEX, WATER_PLANT_FIELD_INDEX } from "./const";

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
        const state = getMockedGameState({
            currentPlayer: [DORIN],
            setGamePhase: TurnPhases.AfterMove,
            movePlayers: [[GO_TO_JAIL_INDEX, DORIN]],
        });
        const result = getTestableOptions(state, DORIN);
        const moveResult = (result?.move as tRejection)?.reason;
        expect(moveResult).toEqual(MovementReasons.MandatoryActionLeft);
    });
    it('Should allow to move, when player is on bank-owned field', () => {
        // in afterMove phase there should be an auction, and afterMove is handled by alreadyMoved
        // So if in beforeMove phase and is on bank field, means no one bought this field in auction
        const BANK_OWNED_FIELD_INDEX = 1;
        const state = getMockedGameState({
            currentPlayer: [DORIN],
            setGamePhase: TurnPhases.BeforeMove,
            movePlayers: [[BANK_OWNED_FIELD_INDEX, DORIN]],
        });
        const result = getTestableOptions(state, DORIN);
        console.log('move', result?.move)
        const moveResult = (result?.move as tOption)?.actions[0].type;
        expect(moveResult).toEqual(OptionTypes.Move);
    });
    it('Should allow to move, when player is on draw chance card field', () => {
        //After move player cannot move anyway, so when player can move, he already took the card in previous turn        
        const state = getMockedGameState({
            currentPlayer: [DORIN],
            setGamePhase: TurnPhases.BeforeMove,
            movePlayers: [[RED_CHANCE_FIELD_INDEX, DORIN]],
        });
        const result = getTestableOptions(state, DORIN);
        const moveResult = (result?.move as tOption)?.actions[0].type;
        expect(moveResult).toEqual(OptionTypes.Move);
    });
    it('Should allow to move, when player is no a non plegded field owned by another player, as payment was made in previous turn', () => {
        const state = getMockedGameState({
            currentPlayer: [DORIN],
            setGamePhase: TurnPhases.BeforeMove,
            movePlayers: [[WATER_PLANT_FIELD_INDEX, DORIN]],
            estatesDelta: [
                { estateName: WATER_PLANT, props: { owner: YELLOW, isPlegded: false } },
            ],
        });
        const result = getTestableOptions(state, DORIN);
        const moveResult = (result?.move as tOption)?.actions[0].type;
        expect(moveResult).toEqual(OptionTypes.Move);
    });
    it('Should allow to move, when player on a tax field, as he already payed tax in previous turn, or is in afterMove phase', () => {
        const state = getMockedGameState({
            currentPlayer: [DORIN],
            setGamePhase: TurnPhases.BeforeMove,
            movePlayers: [[TAX_FIELD_INDEX, DORIN]],
        });
        const result = getTestableOptions(state, DORIN);
        const moveResult = (result?.move as tOption)?.actions[0].type;
        expect(moveResult).toEqual(OptionTypes.Move);
    });
    it('Should allow to move when player on start field, as he already took money for start', () => {
        const state = getMockedGameState({
            currentPlayer: [DORIN],
            setGamePhase: TurnPhases.BeforeMove,
            movePlayers: [[0, DORIN]],
        });
        const result = getTestableOptions(state, DORIN);
        const moveResult = (result?.move as tOption)?.actions[0].type;
        expect(moveResult).toEqual(OptionTypes.Move);
    });
});
