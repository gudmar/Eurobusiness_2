import { tNamedBoardField } from "../../Data/types";

export const createBoardDescriptor = (boardInOrder: string[], fieldsData: any): tNamedBoardField[] => {
    const boardDescriptor = boardInOrder.map((fieldName: string): tNamedBoardField => {
        const fieldEntries = fieldsData[`${fieldName}`]
        fieldEntries.name = fieldName;
        return fieldEntries;
    })
    return boardDescriptor;
}
