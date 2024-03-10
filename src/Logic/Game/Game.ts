import { CHANCE_CARDS_BLUE, CHANCE_CARDS_RED } from "../../Data/chanceCards";
import { Bank } from "../Bank/Bank";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";
import { DiceTestModeDecorator } from "../Dice/Dice";
import { Players } from "../Players/Players";
import { iPlayerDescriptor } from "../Players/types";
import { TurnPhases } from "../types";

type tGameConstructionArgs = {
    playersData: iPlayerDescriptor[]
}

export class Game {
    static instance: Game;
    turnPhase = TurnPhases.BeforeMove;
    constructor({
        playersData
    }: tGameConstructionArgs){
        if (!Game.instance) {
            new ChanceCardHolder(CHANCE_CARDS_BLUE);
            new ChanceCardHolder(CHANCE_CARDS_RED);    
            new Bank();
            new Players({
                DiceClass: DiceTestModeDecorator, 
                players: playersData,
            })
            Game.instance = this;
            this.turnPhase =TurnPhases.BeforeMove
        }
        return Game.instance
    }

}