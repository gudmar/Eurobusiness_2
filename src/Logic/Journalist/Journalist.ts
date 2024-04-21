import { tGameState } from "../../Functions/PersistRetrieveGameState/types";
import { getGameState } from "../../Functions/PersistRetrieveGameState/utils";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { getTestableOptions } from "./getOptions";
import { Messages, tJournalistState } from "./types";

export abstract class Journalist  extends SubscribtionsHandler<Messages, tJournalistState> {
    // static interviewState(state: tGameState) {

    // }
    static interviewState() {
        const state: tGameState = getGameState();
        const result = getTestableOptions(state);
        return result;
    }
}
