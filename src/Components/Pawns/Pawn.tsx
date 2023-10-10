import { useEffect } from "react";
import { useCalculatedPawnPosition } from "../../Contexts/fieldLocation/useCalculatedPawnPosition";

import { tColors } from "../../Data/types";
import { usePawnFieldIndex } from "../../hooks/usePawnFieldIndex";
import { usePawnPosition } from "../../hooks/usePawnPosition";
import { useStyles } from "./styles";

export const Pawn = ({color}: {color: tColors}) => {
    const classes: {[key:string]: string} = useStyles();
    const {top, left} = useCalculatedPawnPosition(color);
    return (
        <div className={classes.pawn} style={{backgroundColor: color, opacity: 0.7, top: left + 'px', left: top + 'px'}}></div>
    )
}
