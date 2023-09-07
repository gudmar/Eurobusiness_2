import { useEffect } from "react";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { getBoardCaretaker } from "../../Functions/getBoardCaretaker";
import { BoardCaretaker } from "../../Logic/BoardCaretaker";
import BoardSide from "./BoardSide/BoardSide";
import { useStyles } from "./styles";
import { TOP, RIGHT, LEFT, BOTTOM } from './types'

export const Board = () => {
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    const boardCaretaker: any = getBoardCaretaker();
    // useEffect(
    //     () => {
    //         if (boardCaretaker) {
    //             BoardCaretaker.fieldNames.forEach((fieldName: any) => console.log(fieldName, boardCaretaker?.getFieldByName(fieldName) || boardCaretaker))
    //         }               
    //     }, [boardCaretaker])

    return(
        <div className={classes.board}>
            <BoardSide direction={TOP} />
            <BoardSide direction={RIGHT} />
            <BoardSide direction={BOTTOM} />
            <BoardSide direction={LEFT} />
            <div className={classes.middleBoard}> </div>
        </div>
    )
}