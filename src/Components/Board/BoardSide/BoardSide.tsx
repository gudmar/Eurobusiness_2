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
        case BOTTOM: return getDescendigRange(10, 10);
        case LEFT: return getDescendigRange(20, 10);
        case TOP: return getDescendigRange(30, 10);
        case RIGHT: return getDescendigRange(40, 10)
        default: throw new Error('Unknown direction')
    }
}

const getFieldNames = (direction: tBoardSideDirections) => {
    const indexes = getFieldIndexesForSide(direction);
    const names = BoardCaretaker.fieldNames;
    const boardCaretaker: any = getBoardCaretaker();
    // console.log(names)
    const result = indexes.map((index) => {
        // console.log('NAME', names[index - 1])
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
    // console.log(fieldData)
    // const fieldIndexes = getFieldIndexesForSide(direction);
    // const boardCaretaker: any = getBoardCaretaker();
    return (
        <div className={`${classes.fieldBar} ${classes[directionClassName]}`}>
            {
                fieldData.map(({name, type}) => <BoardField key={name} name={name} type={type} direction={direction} />)
            }
        </div>
    )
}

export default BoardSide