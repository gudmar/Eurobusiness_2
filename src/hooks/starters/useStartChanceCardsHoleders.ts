import { useEffect } from "react"
import { CHANCE_CARDS_BLUE, CHANCE_CARDS_RED } from "../../Data/chanceCards";
import { ChanceCardHolder } from "../../Logic/Chance/ChanceCardHolder";

export const useStartChanceCardsHolders = () => {
    useEffect(() => {
        // new ChanceCardHolder(CHANCE_CARDS_BLUE);
        // new ChanceCardHolder(CHANCE_CARDS_RED);
        // return (() => ChanceCardHolder.clearAllInstances());
    }, [])
}