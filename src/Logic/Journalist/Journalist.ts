import { tGameState } from "../../Functions/PersistRetrieveGameState/types";
import { getGameState } from "../../Functions/PersistRetrieveGameState/utils";
import { SubscribtionsHandler } from "../SubscrbtionsHandler";
import { Messages, tJurnalistState } from "./types";



export abstract class Journalist  extends SubscribtionsHandler<Messages, tJurnalistState> {
    // static interviewState(state: tGameState) {

    // }
    static interviewState() {
        const state: tGameState = getGameState();

    }
}
