import { useEffect } from "react";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { getBoardCaretaker } from "../../Functions/getBoardCaretaker";
import { BoardCaretaker } from "../../Logic/BoardCaretaker";
import BoardField from "./BoardField/BoardFiled";
import BoardSide from "./BoardSide/BoardSide";
import { useStyles } from "./styles";
import { TOP, RIGHT, LEFT, BOTTOM, iBoardSide, tBoardSideDirections } from './types'

const TOP_LEFT_CORNER_FIELD_INDEX = 20;
const TOP_RIGHT_CORNER_FIELD_INDEX = 30;
const BOTTOM_RIGHT_CORNER_FIELD_INDEX = 0;
const BOTTOM_LEFT_CORNER_FIELD_INDEX = 10;

const getEdgeIndex = (direction: tBoardSideDirections) => {
    switch (direction) {
        case BOTTOM: return BOTTOM_RIGHT_CORNER_FIELD_INDEX;
        case LEFT: return BOTTOM_LEFT_CORNER_FIELD_INDEX;
        case TOP: return TOP_LEFT_CORNER_FIELD_INDEX;
        case RIGHT: return TOP_RIGHT_CORNER_FIELD_INDEX;
        default: throw new Error('Unknown direction')
    }
}
const getEdgeData = (direction: tBoardSideDirections) => {
    const index = getEdgeIndex(direction);
    const name = BoardCaretaker.fieldNames[index];
    const boardCaretaker: any = getBoardCaretaker();
    return ({
            name,
            type: boardCaretaker.getFieldByName(name)?.type
        })
}
const getClassName = (direction: tBoardSideDirections) => {
    switch(direction) {
        case BOTTOM: return 'bottomRight';
        case TOP: return 'topLeft';
        case LEFT: return 'bottomLeft';
        case RIGHT: return 'topRight';
        default: throw new Error('Unknown direction')
    }
}

const BoardEdge = ({direction}: iBoardSide) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const {type, name} = getEdgeData(direction)
    const className = getClassName(direction);
    const classContent = classes[`${className}`];
    return (
        <div className={classContent} >
            <BoardField name={name} type={type} direction={direction} />
        </div>
    )
}

export const Board = () => {
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    // const boardCaretaker: any = getBoardCaretaker();
    // useEffect(
    //     () => {
    //         if (boardCaretaker) {
    //             BoardCaretaker.fieldNames.forEach((fieldName: any) => console.log(fieldName, boardCaretaker?.getFieldByName(fieldName) || boardCaretaker))
    //         }               
    //     }, [boardCaretaker])

    return(
        <div className={classes.board}>
            <BoardEdge direction={TOP} />
            <BoardEdge direction={RIGHT} />
            <BoardEdge direction={BOTTOM} />
            <BoardEdge direction={LEFT} />

            <BoardSide direction={TOP} />
            <BoardSide direction={RIGHT} />
            <BoardSide direction={BOTTOM} />
            <BoardSide direction={LEFT} />
            <div className={classes.middleBoard}> </div>
        </div>
    )
}