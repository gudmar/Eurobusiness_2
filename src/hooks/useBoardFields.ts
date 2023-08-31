import { useEffect, useRef } from "react"
import { boardInOrder, descriptors } from "../Data/boardFields";
import { BoardCaretaker, BoardCreator } from "../Logic/BoardCaretaker";

const initialCaretaker: any = null;

export const useBoardFields = () => {
    const caretaker = useRef(initialCaretaker);
    const boardFeilds = useRef([])
    useEffect(() => {
        const creator = new BoardCreator(boardInOrder, descriptors);
        const CARETAKER = creator.provideCaretaker();
        caretaker.current = CARETAKER;
        boardFeilds.current = BoardCaretaker.fieldNames.map(
            (fieldName: string) => CARETAKER.getFieldByName(fieldName));
    }, [])
    return ({
        caretaker: caretaker.current,
        fields: boardFeilds.current,
        fieldNames: BoardCaretaker.fieldNames,
    })
}
