import { PRISON_FIELD_NR_INDEXED_FROM_0, TURNS_TO_WAIT_TO_GET_OUT_OF_JAIL } from "../../Constants/constants";
import { BOARD_SIZE } from "../../Data/const";
import { tColors, } from "../../Data/types";
import { addUniqueArrayItems } from "../../Functions/addArrayUniqueItems";
import { displayError, displayInfo } from "../../Functions/displayMessage";
import { shiftBoardIndexBy1 } from "../../Functions/shiftIndex";
import { BoardCreator } from "../BoardCaretaker";
import { tEstateField } from "../boardTypes";
import { ChanceCardHolder } from "../Chance/ChanceCardHolder";
import { DiceTestModeDecorator } from "../Dice/Dice";
import { TestModes } from "../Dice/types";
import { Game } from "../Game/Game";
import { Players } from "../Players/Players";
import { iPlayer } from "../Players/types";
import { DoneThisTurn } from "../types";
import { addBuildingsToEstates, payForBuildings, returnHousesBeforeBuildingHotelsToBank, takeBuildingsFromBank, throwWhenBuildingsCannotBePurchased, updateNrBuildingsPlayerBoughtThisTurn } from "./buyBuildingsCommands";
import { tBuyBuilding, tChanceCardPayload, tHandleBankOwnedEstateActions, tRefreshFunction, tSellBuildingsArgs } from "./types";
import { getPlayerByColor, getPlayerByName, removeHousesToBuildHotels, removeSoldHousessFromBuildings, returnBuildingsToBank, returnMoneyToPlayer } from "./utils";

type asyncBool = Promise<boolean>

export class Commander {

    private static get _players() {return Players.instance};
    private static get _chanceCardHolders() {return ChanceCardHolder.instances}

    // ============= Chance cards ===========================
    static borrowACard({description, playerColor}: tChanceCardPayload) {
        const isBorrowed = ChanceCardHolder.borrowCard(description);
        if (!isBorrowed) throw new Error(`Card [${description}] could not be reserved in chance cards holder`);
        if (!Commander._players) throw new Error('Players instance does not exist')
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
        if (!Commander._players) throw new Error('Players instance does not exist')
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
        const newList: string[] = addUniqueArrayItems(Commander._testDice.fieldsToVisit, listOfFields) as string[];
        Commander._testDice.fieldsToVisit = newList;
    }

    static removeFieldsToVisit(fieldsToRemove: string[])  {
        const listCp = [...Commander._testDice.fieldsToVisit];
        const newList = listCp.reduce((acc: string[], item) => {
            if (fieldsToRemove.includes(item)) return acc;
            acc.push(item);
            return acc;
        }, [])
        Commander._testDice.fieldsToVisit = newList;
    }
    static logTestDiceState() {Commander._testDice.logState()}
    // Write handlers for DiceForTests

    // ===================  Move player ===========================


    static doAfterTimenout(timeout: number, cb: () => void): asyncBool {
        const result = new Promise<boolean>((resolve) => {
            const t = setTimeout(() => {
                cb();
                clearTimeout(t)
                resolve(true)
            }, timeout)    
        })
        return result;
    }

    static async step(player: iPlayer, nrOfSteps: number): asyncBool {
        const currentPosition = player.fieldNr;
        if (nrOfSteps <= 0) return Promise.resolve(true);
        const nextDesiredPosition = currentPosition + 1 < BOARD_SIZE ? currentPosition + 1 : 0;
        const isDone = await this.doAfterTimenout(500, () => {player.fieldNr = nextDesiredPosition})
        await Commander.step(player, nrOfSteps - 1)
        return isDone;

    }

    static async animateMovingPlayer(player: iPlayer, desiredPosition: number): asyncBool {
        const currentPosition = player.fieldNr;
        const nrOfSteps = desiredPosition > currentPosition ? desiredPosition - currentPosition - 1: BOARD_SIZE - currentPosition + desiredPosition - 1;
        const lastFieldNr = player.fieldNr;
        const isDone = await Commander.step(player, nrOfSteps);
        player.lastFieldNr=lastFieldNr;
        return isDone;
    }

    static nextPlayer() {
        Game.instance.nextPlayer();
    }

    static async moveCurrentPlayer(): asyncBool {
        const { currentPlayersName: playerName } = Players.instance.state;
        const playerColor = Players.playerNameToPlayerColor(playerName);
        const isDone = await Commander.movePlayer(playerColor);
        return isDone;
    }

    static async movePlayer(playerColor: tColors): asyncBool {
        if (Game.isInAfterMovePhase) {
            displayError({
                title: 'Illegal operaton',
                message: 'Already moved this turn'
            });
            return false;
        }
        const player = getPlayerByColor(playerColor);
        const testMode = Commander._testDice.testingMode;
        if ([TestModes.getGetAwayFromJailFail, TestModes.getGetAwayFromJailPass].includes(testMode)) {
            displayError({title: 'Unpossible operation', message: `Dices are in test mode [${testMode}]. This mode is not designed to allow player move`})
            return true;
        }
        if (!player) return true;
        const fieldNr = player.fieldNr;
        const {throws, sum, doublets} = Commander._testDice.throwToMove(fieldNr);
        if (doublets >=2) Commander.putPlayerToJail(playerColor)
        // const nextFieldNr = (sum + player.fieldNr) % BOARD_SIZE;
        const nextFieldNr = shiftBoardIndexBy1(sum + player.fieldNr);
        Game.setAfterMoveState();
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
        if (![TestModes.none, TestModes.visitFieldsFromList].includes(testMode)) { 
            player.fieldNr = nextFieldNr;
            return true
        }
        else {
            const isDone = await Commander.animateMovingPlayer(player, nextFieldNr);
            return isDone;
        }
        
    }

    // ====================  Put player to jail ======================

    static putPlayerToJail(playerColor: tColors) {
        const player = getPlayerByColor(playerColor);
        if (!player) return;
        displayInfo({title: 'You messed somthing up', message: 'You go to jail'});
        player.fieldNr = PRISON_FIELD_NR_INDEXED_FROM_0;
        player.isInPrison = true;
        player.nrTurnsToWait = TURNS_TO_WAIT_TO_GET_OUT_OF_JAIL;
    }

    // ===================  Next game state =============

    static async tick(): asyncBool {
        Commander.nextPlayer();
        const isPawnMoveDone = await Commander.moveCurrentPlayer();
        return isPawnMoveDone;
    }

    // ==================  Buy buildings ===============
    static buyBuildings(args: tBuyBuilding) {
        // throwWhenBuildingsCannotBePurchased(args); // Not needed, data that is send to this function is already after validation
        takeBuildingsFromBank(args);
        returnHousesBeforeBuildingHotelsToBank(args);
        removeHousesToBuildHotels(args);
        updateNrBuildingsPlayerBoughtThisTurn(args);
        payForBuildings(args);
        addBuildingsToEstates(args);
    }

    // =================  Buy estate ===============
    static buyEstateForStandardPrice(args: tHandleBankOwnedEstateActions) {
        const { estateName, playerName } = args;
        const standardEstatePrice = (BoardCreator.instance.getEstateByName(estateName) as tEstateField)?.price;
        const player = getPlayerByName(playerName);
        BoardCreator.instance.changeEstateOwner(estateName, player.color);
        player.money -= standardEstatePrice;
    }

    // =================== Sell estate =============
    static sellBuildings(args: tSellBuildingsArgs) {
        const {nrOfHotels, nrOfHouses, price, locationAfterTransaction, playerName} = args;
        if (price === 0) return;
        removeSoldHousessFromBuildings(args);
        returnBuildingsToBank(args);
        returnMoneyToPlayer(playerName, price)
    }

    // ================== Plegde ==================
    static plegde(estateName: string, interestedPlayerName: string) {
        const estate = BoardCreator.instance.getEstateByName(estateName);
        const {owner, isPlegded, mortgage} = estate;
        if (isPlegded) throw new Error(`${estateName} is already plegded`)
        const player = getPlayerByColor(owner as tColors);
        if (player.name !== interestedPlayerName) throw new Error(`Interested player is ${interestedPlayerName}, where estate owner is ${player.name}. You cannot plegde some one elses estate`)
        if (!player) throw new Error(`Could not find player ${owner}`);
        player.money = player.money + mortgage;
        estate.isPlegded = true;
    }
    // =============== Unplegde =============
    static unplegde(estateName: string, price: number, interestedPlayerName: string) {
        const estate = BoardCreator.instance.getEstateByName(estateName);
        const {owner, isPlegded } = estate;
        if (!isPlegded) throw new Error(`${estateName} is already not plegded`)
        const player = getPlayerByColor(owner as tColors);
        if (player.name !== interestedPlayerName) throw new Error(`Interested player is ${interestedPlayerName}, where estate owner is ${player.name}. You cannot unplegde some one elses estate`)
        if (!player) throw new Error(`Could not find player ${owner}`);
        if (player.money < price) throw new Error('Player is too poor to buy out this estate')
        player.money = player.money - price;
        estate.isPlegded = false;
    }
    // =========== End turn ===============
    static endTurn() {
        Game.setBeforeMoveState();
        Players.nextTurn();
    }

    //=========== Get money =============
    static getPassStartMoney(playerName: string, ammount: number, refreshFunction: tRefreshFunction) {
        if (Game.instance.wasDoneThisTurn(DoneThisTurn.GotMoneyForStart)) return;
        const player = getPlayerByName(playerName);
        player.money += ammount;
        Game.instance.addDoneThisTurn(DoneThisTurn.GotMoneyForStart);
        displayInfo({title: `Player ${playerName} received money`, message: `For passing start`});
        refreshFunction();
    }

    static surrender(playerName: string, refreshFunction: tRefreshFunction) {2
        Players.surrenderPlayer(playerName);
        displayInfo({title: `Player lost the game`, message: `${playerName} lost the game`});
        Commander.nextPlayer();
        refreshFunction();
    }
}
