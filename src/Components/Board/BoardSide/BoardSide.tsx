import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { getBoardCaretaker } from "../../../Functions/getBoardCaretaker";
import BoardField from "../BoardField/BoardFiled";
import { iBoardSide } from "../types"
import { useStyles } from "./styles";
import { tBoardSideDirections, BOTTOM, TOP, LEFT, RIGHT }  from '../types';
import { BoardCaretaker } from "../../../Logic/BoardCaretaker";

const getDescendigRange = (start: number, count: number) => {
    const arr = new Array(count).fill(0);
    const result = arr.map((val, index) => start - index);
    return result;
}

const getFieldIndexesForSide = (side: tBoardSideDirections) => {
    switch(side) {
        case BOTTOM: return getDescendigRange(10, 9);
        case LEFT: return getDescendigRange(20, 9);
        case TOP: return getDescendigRange(30, 9).reverse();
        case RIGHT: return getDescendigRange(40, 9)
        default: throw new Error('Unknown direction')
    }
}

const getFieldNames = (direction: tBoardSideDirections) => {
    const indexes = getFieldIndexesForSide(direction);
    const names = BoardCaretaker.fieldNames;
    const boardCaretaker: any = getBoardCaretaker();
    const result = indexes.map((index) => {
        return ({
            name: names[index - 1],
            type: boardCaretaker.getFieldByName(names[index - 1]).type
        })
    })
    return result;
}

const BoardSide = ({
    direction
}: iBoardSide) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const directionClassName: string = `fieldBar${direction}`;
    const fieldData = getFieldNames(direction)
    // const fieldIndexes = getFieldIndexesForSide(direction);
    // const boardCaretaker: any = getBoardCaretaker();
    return (
        <div className={`${classes.fieldBar} ${classes[directionClassName]}`}>
            {
                fieldData.map(({name, type}, index) => <BoardField key={index} name={name} type={type} direction={direction} index={index + 1}/>)
            }
        </div>
    )
}

export default BoardSide