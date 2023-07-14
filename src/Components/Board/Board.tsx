import { useThemesAPI } from "../../Contexts/ThemeContext";
import BoardSide from "./BoardSide/BoardSide";
import { useStyles } from "./styles";
import { TOP, RIGHT, LEFT, BOTTOM } from './types'

export const Board = () => {
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);

    return(
        <div className={classes.board}>
            <BoardSide direction={TOP} />
            <BoardSide direction={RIGHT} />
            <BoardSide direction={BOTTOM} />
            <BoardSide direction={LEFT} />
            <div className={classes.middleBoard}></div>
        </div>
    )
}