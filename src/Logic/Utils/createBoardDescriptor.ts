import { tNamedBoardField } from "../../Data/types";

export const createBoardDescriptor = (boardeInOrder: string[], fieldsData: any): tNamedBoardField[] => {
    const boardDescriptor = boardeInOrder.map((fieldName: string): tNamedBoardField => {
        const fieldEntries = fieldsData[`${fieldName}`]
        fieldEntries.name = fieldName;
        return fieldEntries;
    })
    return boardDescriptor;
}
