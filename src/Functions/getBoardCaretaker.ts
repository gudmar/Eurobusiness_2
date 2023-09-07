import { boardInOrder, descriptors } from "../Data/boardFields";
import { BoardCaretaker, BoardCreator } from "../Logic/BoardCaretaker";

export const getBoardCaretaker: () => BoardCaretaker = () => {
    const boardCreator = new BoardCreator(boardInOrder, descriptors);
    const boardCaretaker = boardCreator.provideCaretaker();
    // console.log('All fields:', boardCreator.fields)
    return boardCaretaker;
}