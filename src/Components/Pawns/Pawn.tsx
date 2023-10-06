import { tColors } from "../../Data/types";
import { usePawnFieldIndex } from "../../hooks/usePawnFieldIndex";
import { usePawnPosition } from "../../hooks/usePawnPosition";
import { useStyles } from "../Board/styles";

export const Pawn = ({color}: {color: tColors}) => {
    const classes: {[key:string]: string} = useStyles();
    const {x, y} = usePawnPosition(color);
    const fieldIndex = usePawnFieldIndex(color);
    return (
        <div className={classes.pawn} style={{backgroundColor: color}}></div>
    )
}
