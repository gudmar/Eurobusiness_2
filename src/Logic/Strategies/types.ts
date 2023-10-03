import { iBank } from "../Bank/types";
import { iBoardCaretaker } from "../boardTypes";
import { tOption, tOptions } from "../Judge/types";
import { iAllPlayers } from "../Players/types";

export interface iStrategyArgs {
    players: iAllPlayers,
    board: iBoardCaretaker,
    bank: iBank,
    options: tOptions,
}

export interface iStrategy {
    selectOption(args: iStrategyArgs): Promise<tOption>,
    // Promise, because of manual player,
    // This returns a promise resolving to option because Strategy
    // is likely to change often in developement / test process,
    // where Commander that will do the job is an implemention 
    // detail, but constatn due to not changing game rules and rest of the game

}
