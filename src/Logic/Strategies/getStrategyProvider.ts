import { EasyStrategy } from "./EasyStrategy";
import { HardStrategy } from "./HardStrategy";
import { ManualStrategy } from "./ManualStrategy";
import { NormalStrategy } from "./NormalStrategy";
import { StrategyNames } from "./types";

const strategyMapping = {
    [StrategyNames.manual]: ManualStrategy,
    [StrategyNames.easy]: EasyStrategy,
    [StrategyNames.normal]: NormalStrategy,
    [StrategyNames.hard]: HardStrategy,
}

export const getStrategyProvider = (strategyName: StrategyNames) => {
        const strategy = new strategyMapping[strategyName]();
        return strategy
}