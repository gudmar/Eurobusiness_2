import { useEffect } from "react"
import { boardInOrder, descriptors } from "../Data/boardFields"
import { Bank } from "../Logic/Bank/Bank"
import { BoardCreator } from "../Logic/BoardCaretaker"
import { DiceTestModeDecorator } from "../Logic/Dice/Dice"
import { Players } from "../Logic/Players/Players"

export const useStartGameLogic = () => {
    // useEffect(() => {
    //     console.log('Starting game logic')
    //     new BoardCreator(boardInOrder, descriptors)
    //     new Bank();
    // }, [])
}
