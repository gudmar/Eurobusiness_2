import { addUniqueArrayItems } from "../../Functions/addArrayUniqueItems";
import { Bank } from "../Bank/Bank";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";
import { DiceTestModeDecorator } from "../Dice/Dice";
import { TestModes } from "../Dice/types";
import { Players } from "../Players/Players";
import { tChanceCardPayload } from "./types";


export class Commander {

    private static get _players() {return Players.instance};
    private static get _chanceCardHolders() {return ChanceCardHolder.instances}

    // ============= Chance cards ===========================
    static borrowACard({description, playerColor}: tChanceCardPayload) {
        const isBorrowed = ChanceCardHolder.borrowCard(description);
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
// ======================== Test dice ======================
    private static get _testDice() {return new DiceTestModeDecorator() }

    static changeTestMode(newMode: TestModes) {
        Commander._testDice.testingMode = newMode;
    }
    static changeNrToBeSelectedOnDicesThrow(nr: number) {
        Commander._testDice.nrThatDiceWillSelectInTestMode = nr;
    }
    static changeFieldsToVisit(listOfFields: string[]) {
        Commander._testDice.fieldsToVisit = listOfFields;
    }

    static addFieldsToVisit(listOfFields: string[]) {
        console.log(Commander._testDice.fieldsToVisit)
        const newList: string[] = addUniqueArrayItems(Commander._testDice.fieldsToVisit, listOfFields) as string[];
        console.log(newList)
        Commander._testDice.fieldsToVisit = newList;
    }

    static removeFieldsToVisit(fieldsToRemove: string[])  {
        console.log(fieldsToRemove)
        const listCp = [...Commander._testDice.fieldsToVisit];
        const newList = listCp.reduce((acc: string[], item) => {
            console.log(item, fieldsToRemove, listCp)
            if (fieldsToRemove.includes(item)) return acc;
            acc.push(item);
            return acc;
        }, [])
        Commander._testDice.fieldsToVisit = newList;
    }
    static logTestDiceState() {Commander._testDice.logState()}
    // Write handlers for DiceForTests

}
