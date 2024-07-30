import { useState } from "react";
import { CLEAN_SELL_SPECIAL_CARDS } from "../../Constants/cleaners";
import { useIncludeCleaer } from "../../Contexts/CleaningContext/CleaningContext";
import { Button } from "../Button/Button";
import { Informator } from "../Information/Infromator";
import { useStyles } from "./styles";
import { tGameOptions } from "./types";

const extractSpecialCards = (gameOptions: tGameOptions) => {
    const result = gameOptions?.specialCards?.actions?.[0]?.payload || [];
    return result;
}

const extractReason = (GameOptions: tGameOptions) => {
    const reason = GameOptions?.specialCards?.reason;
    return reason;
}

const SellCards = (props: any) => {
    const specialCards: string[] = extractSpecialCards(props?.gameOptions);
    const reason: string = extractReason(props?.gameOptions);
    const [selectedCard, setSelectedCard] = useState('');
    useIncludeCleaer(CLEAN_SELL_SPECIAL_CARDS, () => setSelectedCard(''));
    const classes = useStyles()
    if (specialCards.length) return (
        <div className={classes.bigButtons}>
            { specialCards.map((cardContent) => (
                <Button
                    label={`Auction: [${cardContent}]`}
                    disabled={false}
                    selected={selectedCard === cardContent}
                    action={
                        () => {
                            setSelectedCard(cardContent)
                            Informator.instance.displayError({
                                title: 'Auction special cards',
                                message: 'Not implemented yet'
                            })
                        }
                    }
                />
            ))}
        </div>
    )
    if (reason) return <div className={classes.smallReason}>{reason}</div>
    return <>No cards to sell</>
}

export default SellCards;
