import { tOption } from "../Judge/types";
import { iStrategy, iStrategyArgs } from "./types";

export class EasyStrategy implements iStrategy {
    async selectOption({
        players, board, bank, options
    }: iStrategyArgs): Promise<tOption> {
        return options[0];
    }
}
