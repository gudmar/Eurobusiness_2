import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { getBoardCaretaker } from "../../../Functions/getBoardCaretaker";
import BoardField from "../BoardField/BoardFiled";
import { iBoardSide } from "../types"
import { useStyles } from "./styles";

const BoardSide = ({
    direction
}: iBoardSide) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const directionClassName: string = `fieldBar${direction}`
    const boardCaretaker: any = getBoardCaretaker();
    return (
        <div className={`${classes.fieldBar} ${classes[directionClassName]}`}>
            <BoardField />
        </div>
    )
}

export default BoardSide