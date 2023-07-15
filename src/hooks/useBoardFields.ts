import { useEffect, useRef } from "react"
import { boardInOrder, descriptors } from "../Data/boardFields";
import { BoardCreator } from "../Logic/BoardCaretaker";

const initialCaretaker: any = null;

export const useBoardFields = () => {
    const caretaker = useRef(initialCaretaker);
    useEffect(() => {
        const creator = new BoardCreator(boardInOrder, descriptors);
        caretaker.current = creator.provideCaretaker();
    }, [])
}