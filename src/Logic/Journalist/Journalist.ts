import { tGameState } from "../../Functions/PersistRetrieveGameState/types";
import { getGameState } from "../../Functions/PersistRetrieveGameState/utils";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { getTestableOptions } from "./getOptions";
import { Messages, tJournalistState } from "./types";
import { getCurrentPlayer } from "./utils/commonFunctions";

export abstract class Journalist  extends SubscribtionsHandler<Messages, tJournalistState> {
    // static interviewState(state: tGameState) {

    // }
    static interviewState() {
        const state: tGameState = getGameState();
        const currentPlayerName = getCurrentPlayer(state).name;
        const result = getTestableOptions(state, currentPlayerName);
        return result;
    }
}
