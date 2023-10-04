import React from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedNonCityEstates, tNonCityEstates } from "../../../Data/types"
import { useNonCityEstatesField } from "../../../hooks/useField"
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
    const enterpriseFieldWrapper = classes[`enterpriseFieldWrapper${fieldDescriptor.direction}`]
    const titleClass = classes[`title${fieldDescriptor.direction}`]
    const priceClass = classes[`price${fieldDescriptor.direction}`]
    return (
        <div className={`${enterpriseFieldWrapper} ${classes.singleWidth} ${classes.fieldWrapper}`}>
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
