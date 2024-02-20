import { useCalculatedPawnPosition } from "../../Contexts/fieldLocation/useCalculatedPawnPosition";
import { useReport } from "../../Contexts/GameInformator.ts/GameInformator";

import { tColors } from "../../Data/types";
import { Players } from "../../Logic/Players/Players";
import { useClasses } from "./styles";

export const Pawn = ({color}: {color: tColors}) => {
    const name = Players.playerColorToPlayerName(color)
    const classes = useClasses();
    const {displayPlayerInfo} = useReport();

    const {top, left} = useCalculatedPawnPosition(color);
    return (
        <div 
            className={classes.pawn} 
            style={{backgroundColor: color, opacity: 0.7, top: left + 'px', left: top + 'px'}}
            onClick={() => displayPlayerInfo(name)}
        ></div>
    )
}
