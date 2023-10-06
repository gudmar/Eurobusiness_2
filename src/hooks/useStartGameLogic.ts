import { useEffect } from "react"
import { boardInOrder, descriptors } from "../Data/boardFields"
import { BoardCreator } from "../Logic/BoardCaretaker"
import { DiceTestModeDecorator } from "../Logic/Dice/Dice"
import { Players } from "../Logic/Players/Players"

export const useStartGameLogic = () => {
    useEffect(() => {
        new BoardCreator(boardInOrder, descriptors)
        
    }, [])
}
