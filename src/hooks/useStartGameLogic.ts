import { useEffect } from "react"
import { boardInOrder, descriptors } from "../Data/boardFields"
import { BoardCreator } from "../Logic/BoardCaretaker"

export const useStartGameLogic = () => {
    useEffect(() => {
        new BoardCreator(boardInOrder, descriptors)
    }, [])
}
