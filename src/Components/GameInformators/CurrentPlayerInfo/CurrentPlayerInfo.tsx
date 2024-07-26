import { useCurrentPlayer } from "../../../hooks/useCurrentPlayer";
import { useStyles } from "./styles";

export const CurrentPlayerInfo = () => {
    const { currentPlayerColor, currentPlayerName } = useCurrentPlayer();
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.title}>Current player: </div>
            <div className={classes.color} style={{backgroundColor: currentPlayerColor}}></div>
            <div>{currentPlayerName}</div>
        </div>
    )
};
