import { boardInOrder, descriptors } from "../Data/boardFields";
import { BoardCreator } from "../Logic/BoardCaretaker";
import { useCreateSingleton } from "./useCreateSingleton"

export const useBoardCaretaker = () => {
    const boardCaretaker = useCreateSingleton(BoardCreator, boardInOrder, descriptors);

    return { boardCaretaker };
}