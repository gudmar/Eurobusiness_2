import { CHANCE_CARDS_BLUE, CHANCE_CARDS_RED } from "../../Data/chanceCards";
import { getNextArrayItem } from "../../Functions/getNextArrayItem";
import { throwIfNotContainKeys } from "../../Functions/throwIfNotContainKey";
import { Bank } from "../Bank/Bank";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";
import { DiceTestModeDecorator } from "../Dice/Dice";
import { tPlayerName } from "../Player/types";
import { Players } from "../Players/Players";
import { iPlayerDescriptor, iPlayersSnapshot } from "../Players/types";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { DoneThisTurn, TurnPhases } from "../types";
import { Messages, tGameConstructionArgs, tGameLogicState } from "./types";

export class Game extends SubscribtionsHandler<Messages, tGameLogicState | string>  {
    static instance: Game;
    static get state(): tGameLogicState {
        return {
            turnPhase: Game?.instance?._turnPhase || TurnPhases.BeforeMove,
            doneThisTurn: Game?.instance?._doneThisTurn || [],
        }
    }
    private _turnPhase = TurnPhases.BeforeMove;
    private _playersOrder: tPlayerName[] = [];
    private _currentPlayer: tPlayerName = '';
    private _doneThisTurn: DoneThisTurn[] = []
    static get isGameOver(){
        const result = Players.isOnlyPlayerLeft;
        return result;
    }
    constructor({
        playersData
    }: tGameConstructionArgs){
        super();

        if (!Game.instance) {
            this.createInitialInstance(playersData);
        }
        return Game.instance
    }

    static log() {
        const that = Game.instance
        console.log('GameLogic state', {
            turnPhase: that._turnPhase, playersOrder: that._playersOrder, currentPlayer: that._currentPlayer
        })
    }

    createInitialInstance(playersData: iPlayersSnapshot) {
        new ChanceCardHolder(CHANCE_CARDS_BLUE);
        new ChanceCardHolder(CHANCE_CARDS_RED);    
        new Bank();
        new Players({
            DiceClass: DiceTestModeDecorator, 
            players: playersData,
        })
        this._playersOrder = Players.players.map((player) => player.name);
        this._currentPlayer = Players._instance.currentPlayerName;
        Game.instance = this;
        this._turnPhase =TurnPhases.BeforeMove
        this._doneThisTurn = []
    }

    get state() {
        return {
            turnPhase: this._turnPhase,
            doneThisTurn: this._doneThisTurn,
        }
    }

    addDoneThisTurn(action: DoneThisTurn){
        this._doneThisTurn.push(action);
    }

    resetDoneThisTurn() { this._doneThisTurn = [] }

    wasDoneThisTurn(action: DoneThisTurn) {
        const result = this._doneThisTurn.includes(action);
        return result;
    }

    set state(val: tGameLogicState) {
        throwIfNotContainKeys({
            keys: ['currentPlayer', 'playersOrder', 'turnPhase'],
            objectToValidate: val,
            source: this.constructor.name,
        })
        this._turnPhase = val.turnPhase;
        this.runAllSubscriptions(Messages.stateChanged, this.state)
    }

    static setAfterMoveState() {
        Game.instance._turnPhase = TurnPhases.AfterMove;
        Game.instance.runAllSubscriptions(Messages.stateChanged, this.state)
    }

    static setBeforeMoveState() {
        Game.instance._turnPhase = TurnPhases.BeforeMove;
        Game.instance.resetDoneThisTurn();
        Game.instance.runAllSubscriptions(Messages.stateChanged, this.state)
    }

    static get isInAfterMovePhase() {
        return Game.instance._turnPhase === TurnPhases.AfterMove;
    }

    nextPlayer() {
        Players.nextTurn();
        // DON'T DELETE:
        // const nextPlayer = getNextArrayItem(this._playersOrder, this._currentPlayer);
        // this._currentPlayer = nextPlayer as string;
        // this.runAllSubscriptions(Messages.currentPlayerChanged, this._currentPlayer)
        // this.runAllSubscriptions(Messages.stateChanged, this.state)
    }

    nextTurnPhase() {
        const phases = [TurnPhases.BeforeMove, TurnPhases.AfterMove];
        const nextPhase = getNextArrayItem(phases, this._turnPhase);
        this.runAllSubscriptions(Messages.turnPhasesChanged, this._turnPhase);
        this.runAllSubscriptions(Messages.stateChanged, this.state)
    }


    // Player does not load with the Game. There is some dupicated state here
}
