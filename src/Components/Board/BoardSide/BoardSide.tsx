import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iBoardSide } from "../types"
import { useStyles } from "./styles";

const BoardSide = ({
    direction
}: iBoardSide) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const directionClassName: string = `fieldBar${direction}`
    return (
        <div className={`${classes.fieldBar} ${classes[directionClassName]}`}>

        </div>
    )
}

export default BoardSide