import { CHANCE_CARDS_BLUE, CHANCE_CARDS_RED } from "../../Data/chanceCards";
import { getNextArrayItem } from "../../Functions/getNextArrayItem";
import { throwIfNotContainKeys } from "../../Functions/throwIfNotContainKey";
import { Bank } from "../Bank/Bank";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";
import { DiceTestModeDecorator } from "../Dice/Dice";
import { tPlayerName } from "../Player/types";
import { Players } from "../Players/Players";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { TurnPhases } from "../types";
import { Messages, tGameConstructionArgs, tGameLogicState } from "./types";

export class Game extends SubscribtionsHandler<Messages, tGameLogicState | string>  {
    static instance: Game;
    static get state(): tGameLogicState {
        return {
            currentPlayer: Game?.instance?._currentPlayer || '',
            turnPhase: Game?.instance?._turnPhase || TurnPhases.BeforeMove,
            playersOrder: Game?.instance?._playersOrder || []
        }
    }
    // static get state() { return Game.instance.state }
    private _turnPhase = TurnPhases.BeforeMove;
    private _playersOrder: tPlayerName[] = [];
    private _currentPlayer: tPlayerName = '';
    constructor({
        playersData
    }: tGameConstructionArgs){
        super();
        if (!Game.instance) {
            console.log('%cCreating players', 'background-color: black; color: white')
            console.log('Players data', playersData)
            new ChanceCardHolder(CHANCE_CARDS_BLUE);
            new ChanceCardHolder(CHANCE_CARDS_RED);    
            new Bank();
            new Players({
                DiceClass: DiceTestModeDecorator, 
                players: playersData,
            })
            this._playersOrder = Players.players.map((player) => player.name);
            this._currentPlayer = this._playersOrder[0];
            Game.instance = this;
            this._turnPhase =TurnPhases.BeforeMove
        }
        return Game.instance
    }

    get state() {
        return {
            currentPlayer: this._currentPlayer,
            playersOrder: this._playersOrder,
            turnPhase: this._turnPhase
        }
    }

    set state(val: tGameLogicState) {
        throwIfNotContainKeys({
            keys: ['currentPlayer', 'playersOrder', 'turnPhase'],
            objectToValidate: val,
            source: this.constructor.name,
        })
        console.log('%cSetting Game state', "background-color: orange")
        console.log(val)
        this._currentPlayer = val.currentPlayer;
        this._playersOrder = val.playersOrder;
        this._turnPhase = val.turnPhase;
        this.runAllSubscriptions(Messages.stateChanged, this.state)
    }

    nextPlayer() {
        const nextPlayer = getNextArrayItem(this._playersOrder, this._currentPlayer);
        this._currentPlayer = nextPlayer as string;
        this.runAllSubscriptions(Messages.currentPlayerChanged, this._currentPlayer)
        this.runAllSubscriptions(Messages.stateChanged, this.state)
    }

    nextTurnPhase() {
        const phases = [TurnPhases.BeforeMove, TurnPhases.AfterMove];
        const nextPhase = getNextArrayItem(phases, this._turnPhase);
        this.runAllSubscriptions(Messages.turnPhasesChanged, this._turnPhase);
        this.runAllSubscriptions(Messages.stateChanged, this.state)
    }
}
