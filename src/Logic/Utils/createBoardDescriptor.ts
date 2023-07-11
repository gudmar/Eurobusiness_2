import { tBoardField } from "../../Data/types";

export const createBoardDescriptor = (boardeInOrder: string[], fieldsData: any): tBoardField[] => {
    const boardDescriptor = boardeInOrder.map((fieldName: string): tBoardField => {
        return fieldsData[`${fieldName}`]
    })
    return boardDescriptor;
}
