import { tNamedBoardField } from "../../Data/types";

export const createBoardDescriptor = (boardInOrder: string[], fieldsData: any): tNamedBoardField[] => {
    const boardDescriptor = boardInOrder.map((fieldName: string, index: number): tNamedBoardField => {
        const fieldEntries = fieldsData[`${fieldName}`]
        fieldEntries.name = fieldName;
        fieldEntries.index = index;
        return fieldEntries;
    })
    return boardDescriptor;
}
