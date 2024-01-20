import { title } from "process";
import { PRISON_FIELD_NR_INDEXED_FROM_0, TURNS_TO_WAIT_TO_GET_OUT_OF_JAIL } from "../../Constants/constants";
import { BOARD_SIZE } from "../../Data/const";
import { tColors } from "../../Data/types";
import { addUniqueArrayItems } from "../../Functions/addArrayUniqueItems";
import { displayError, displayInfo } from "../../Functions/displayMessage";
import { Bank } from "../Bank/Bank";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";
import { DiceTestModeDecorator } from "../Dice/Dice";
import { TestModes } from "../Dice/types";
import { Players } from "../Players/Players";
import { tChanceCardPayload } from "./types";


export class Commander {

    private static get _players() {return Players.instance};
    private static get _chanceCardHolders() {return ChanceCardHolder.instances}
    private static _getPlayerByColor(playerColor: tColors) {
        const player = Players.getPlayerByColor(playerColor);
        if (!player) {
            displayError({title: 'Not allowed', message: `Player with color ${playerColor} not found`});
        }
        return player;
    }


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
        console.log(newMode)
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

    // ===================  Move player ===========================

    static movePlayer(playerColor: tColors) {
        const player = Commander._getPlayerByColor(playerColor);
        const testMode = Commander._testDice.testingMode;
        if ([TestModes.getGetAwayFromJailFail, TestModes.getGetAwayFromJailPass].includes(testMode)) {
            displayError({title: 'Unpossible operation', message: `Dices are in test mode [${testMode}]. This mode is not designed to allow player move`})
            return;
        }
        if (!player) return;
        const fieldNr = player.fieldNr;
        const {throws, sum, doublets} = Commander._testDice.throwToMove(fieldNr);
        if (doublets >=2) Commander.putPlayerToJail(playerColor)
        const nextFieldNr = (sum + player.fieldNr) % BOARD_SIZE;
        if (testMode === TestModes.none) {
            displayInfo({title: 'Dice throw result:', message: `Dice throws shows: [${throws.flat().join(', ')}]. Moving ${playerColor} player to field nr ${nextFieldNr}`})
        } else {
            displayInfo({
                title: 'Dice throw result:',
                message: `
                    Game in test mode [${testMode}]. Doublets 0, dice result [${sum}], going to field [${nextFieldNr}]
                `
            })
        }
        
        player.fieldNr = nextFieldNr;
    }

    // ====================  Put player to jail ======================

    static putPlayerToJail(playerColor: tColors) {
        const player = Commander._getPlayerByColor(playerColor);
        if (!player) return;
        displayInfo({title: 'You messed somthing up', message: 'You go to jail'});
        player.fieldNr = PRISON_FIELD_NR_INDEXED_FROM_0;
        player.isInPrison = true;
        player.nrTurnsToWait = TURNS_TO_WAIT_TO_GET_OUT_OF_JAIL;
    }

}
