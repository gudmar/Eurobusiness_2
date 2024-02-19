import React, { LegacyRef, useEffect } from "react";
import { useSubscribeToFieldLocation } from "../../../Contexts/fieldLocation/useFieldLocation";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { BANK } from "../../../Data/const";
import { iNamedNonCityEstates, tNonCityEstates } from "../../../Data/types"
import { useNonCityEstatesField } from "../../../hooks/useField"
import { PlayerToken } from "../../InfoTokens/PlayerToken";
import { useClasses } from "../../Pawns/styles";
import { tBoardSideDirections } from "../types";
import { useStyles } from "./styels";


const EnterpriseBoardField = (fieldDescriptor: iNamedNonCityEstates & {direction: tBoardSideDirections}) => {
    const {
        country,
        type,
        price,
        mortgage,
        visit,
        owner,
        isPlegded,
        Icon,
        name,
        index
    } = useNonCityEstatesField(fieldDescriptor.name as tNonCityEstates)
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
useEffect(() => console.log(owner), [owner])
    const nodeReference = useSubscribeToFieldLocation(index);
    const enterpriseFieldWrapper = classes[`enterpriseFieldWrapper${fieldDescriptor.direction}`]
    const titleClass = classes[`title${fieldDescriptor.direction}`]
    const priceClass = classes[`price${fieldDescriptor.direction}`]
    return (
        <div ref={nodeReference as unknown as LegacyRef<HTMLDivElement>} className={`${enterpriseFieldWrapper} ${classes.singleWidth} ${classes.fieldWrapper}`}>
            {
                owner !== BANK && 
                    <div className={classes[`owner${fieldDescriptor.direction}`]}><PlayerToken color={'white'} name={owner}/></div>                    
            }
            <div className={titleClass}>{name}</div>
            <div className={priceClass}>{price}</div>
            <div className={`${classes.icon} ${classes[fieldDescriptor.direction]}`}><Icon /></div>
            <div className={classes[`priceUpsideDown${fieldDescriptor.direction}`]}>{price}</div>
            <div className={classes[`titleUpsideDown${fieldDescriptor.direction}`]}>{name}</div>
            <div className={classes[`fieldNumber${fieldDescriptor.direction}`]}>{index+1}</div>
        </div>
    )
}

export default EnterpriseBoardField
