import { tColors } from "../../Data/types"
import { Bank } from "../../Logic/Bank/Bank"
import { BoardCaretaker } from "../../Logic/BoardCaretaker"
import { tField } from "../../Logic/boardTypes"
import { ChanceCardHolder } from "../../Logic/Chance/ChanceCardHolder"
import { DiceTestModeDecorator } from "../../Logic/Dice/Dice"
import { ChanceField, CityField, NonCityEstatesField, OtherFieldTypesField } from "../../Logic/FieldCreators"
import { getGames, overwritteGames, throwErrorIfNameTaken } from "./localStorageOperations"
import { getGameState } from "./utils"

export const overwritteCurrentGameState = (name: string) => {
    const gameState = getGameState();
    const saves = getGames();
    const newSaves = {...saves, [name]: gameState}
    overwritteGames(newSaves);
}

export const saveCurrentGameState = (name: string) => {
    throwErrorIfNameTaken(name);
    overwritteCurrentGameState(name);
}

export const getAllSavedGameNames = () => {
    const games = getGames();
    const names = Object.keys(games);
    return names;
}
