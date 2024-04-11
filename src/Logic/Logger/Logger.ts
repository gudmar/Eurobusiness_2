import { getGameState } from "../../Functions/PersistRetrieveGameState/utils";
import { Game } from "../Game/Game";
import { Players } from "../Players/Players"

export class Logger {
    logPlayersState() {
        console.log('Players state: ', Players._instance.allPlayersStates);
    };
    logGameLogicState() {
        console.log('Game state: ', Game.state)
    };
    logComprehensiveGameState() {
        console.log('Comprehensive game state', getGameState())
    }
}