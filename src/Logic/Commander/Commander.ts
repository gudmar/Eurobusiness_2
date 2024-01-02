import { Bank } from "../Bank/Bank";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";
import { Players } from "../Players/Players";
import { tChanceCardPayload } from "./types";


export class Commander {

    private static get _players() {return Players.instance};
    private static get _chanceCardHolders() {return ChanceCardHolder.instances}

    static borrowACard({description, playerColor}: tChanceCardPayload) {
        console.log('%cCommander: borrow a card', 'background-color: red; color: white;')
        const isBorrowed = ChanceCardHolder.borrowCard(description);
        console.log('ChanceCardHolder instances', ChanceCardHolder.instances)
        if (!isBorrowed) throw new Error(`Card [${description}] could not be reserved in chance cards holder`);
        try {
            const result = Commander._players.borrowSpecialCard({description, playerColor});
            if (!result) {
                throw new Error('Did not succeed in giving the card to the player')
            }
        } catch(e) {
            console.error(e)
            ChanceCardHolder.returnCard(description);
        }
    }
    static returnACard({description, playerColor}: tChanceCardPayload) {
        console.log('%cCommander: return a card', 'background-color: blue; color: white;')
        const isReturned = ChanceCardHolder.returnCard(description);
        if (!isReturned) throw new Error(`Card [${description}] could not be returned in chance cards holder`);
        try {
            const result = Commander._players.returnSpecialCard({description, playerColor});
            if (!result) throw new Error('Did not succeed in getting the card from the player')
        } catch(e) {
            console.error(e)
            ChanceCardHolder.borrowCard(description);
        }
    }
}
