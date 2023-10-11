import { useCalculatedPawnPosition } from "../../Contexts/fieldLocation/useCalculatedPawnPosition";

import { tColors } from "../../Data/types";
import { useClasses } from "./styles";

export const Pawn = ({color}: {color: tColors}) => {
    const classes = useClasses();
    const {top, left} = useCalculatedPawnPosition(color);
    return (
        <div className={classes.pawn} style={{backgroundColor: color, opacity: 0.7, top: left + 'px', left: top + 'px'}}></div>
    )
}
