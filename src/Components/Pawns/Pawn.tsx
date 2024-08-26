import { LOST_PLAYER_DISPLAY_COLOR } from "../../Constants/constants";
import { useCalculatedPawnPosition } from "../../Contexts/fieldLocation/useCalculatedPawnPosition";
import { useReport } from "../../Contexts/GameInformator.ts/GameInformator";

import { tColors } from "../../Data/types";
import { Players } from "../../Logic/Players/Players";
import { useClasses } from "./styles";

export const Pawn = ({color, isLost}: {color: tColors, isLost: boolean}) => {
    const name = Players.playerColorToPlayerName(color)
    const classes = useClasses();
    const {displayPlayerInfo} = useReport();

    const {top, left} = useCalculatedPawnPosition(color);
    const displayColor = isLost ? LOST_PLAYER_DISPLAY_COLOR : color;
    return (
        <div 
            className={classes.pawn} 
            style={{backgroundColor: displayColor, opacity: 0.7, top: left + 'px', left: top + 'px'}}
            onClick={() => displayPlayerInfo(name)}
        ></div>
    )
}
