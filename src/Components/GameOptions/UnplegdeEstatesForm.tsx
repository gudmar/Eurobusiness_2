import { REFRESH_GAME_OPTIONS } from "../../Constants/cleaners";
import { useImportCleaner } from "../../Contexts/CleaningContext/CleaningContext";
import { Commander } from "../../Logic/Commander/Commander";
import { Players } from "../../Logic/Players/Players";
import { Button } from "../Button/Button";
import { ALLOWED } from "./cosnt";
import { useStyles } from "./styles";
import { tPlegdeEstatesFromArgs } from "./types";

const isPlayerWealthyEnough = (playerName: string, price: number) => {
    const player = Players.getPlayerByName(playerName);
    const result = player.money >= (price || Number.MAX_SAFE_INTEGER);
    return result;
}

const UnplegdeEstatesForm = (({ estate, estateName, playerName }: tPlegdeEstatesFromArgs) => {
    const classes = useStyles()
    const refreshGameState = useImportCleaner(REFRESH_GAME_OPTIONS);
    const hasMoney = isPlayerWealthyEnough(playerName, estate?.price);
    const isDisabled = estate?.reason === ALLOWED && hasMoney;
    if (estate?.reason) {
        return (
            <div className={classes.reason}>
                {
                    isDisabled
                        ? 
                            <Button
                                label={`Unplegde, pay $${estate.price}`} 
                                disabled={!isDisabled} 
                                action={
                                    () => {
                                        Commander.unplegde(estateName, estate.price, playerName);
                                        refreshGameState();
                                    }
                                }
                            />
                        :
                            <>{estate!.reason}</>
                }
            </div>
        )
    }
    return <></>
}) as () => JSX.Element

export default UnplegdeEstatesForm
