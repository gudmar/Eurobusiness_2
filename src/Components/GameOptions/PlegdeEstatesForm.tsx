import { REFRESH_GAME_OPTIONS } from "../../Constants/cleaners";
import { useImportCleaner } from "../../Contexts/CleaningContext/CleaningContext";
import { Commander } from "../../Logic/Commander/Commander";
import { Button } from "../Button/Button";
import { useStyles } from "./styles";
import { tEstateOptions } from "./types";

const PlegdeEstatesForm = (({ estate, estateName, playerName }: tEstateOptions) => {
    const classes = useStyles()
    const refreshGameState = useImportCleaner(REFRESH_GAME_OPTIONS);
    const isAllowed = estate?.reason === 'Allowed'
    console.log('Estate', estate)
    if (estate?.reason) {
        return (
            <div className={classes.reason}>
                {
                    isAllowed
                        ? 
                            <Button
                                label={`Plegde, gain $${estate.price}`} 
                                disabled={!isAllowed} 
                                action={
                                    () => {
                                        Commander.plegde(estateName, playerName);
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

export default PlegdeEstatesForm
