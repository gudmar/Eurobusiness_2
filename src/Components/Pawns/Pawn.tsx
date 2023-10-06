import { tColors } from "../../Data/types";
import { usePawnFieldIndex } from "../../hooks/usePawnFieldIndex";
import { usePawnPosition } from "../../hooks/usePawnPosition";
import { useStyles } from "./styles";

export const Pawn = ({color}: {color: tColors}) => {
    const classes: {[key:string]: string} = useStyles();
    const {x, y} = usePawnPosition(color);
    const fieldIndex = usePawnFieldIndex(color);
    console.log(`Player ${color} created on field ${fieldIndex}`)
    return (
        <div className={classes.pawn} style={{backgroundColor: color, top: x + 'px', left: y + 'px'}}></div>
    )
}
