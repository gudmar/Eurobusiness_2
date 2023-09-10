import { useEffect } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedOtherField, tOtherTypes } from "../../../Data/types";

import { useOtherField } from "../../../hooks/useField";
import { tBoardSideDirections } from "../types";
import { useStyles } from "./styels";

const OtherBoardField = (fieldDescriptor: iNamedOtherField & {direction: tBoardSideDirections}) => {
    const state = useOtherField(fieldDescriptor.name as tOtherTypes);
    const {
        name,
        type,
        visit,
        info,
        wait,
        Icon,
    } = state
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    const containerDirectionClass = classes[`enterpriseFieldWrapper${fieldDescriptor.direction}`]
    return (
        <div className={`${classes.fieldWrapper}  ${classes.singleWidth} ${containerDirectionClass}`}>
            <div className={classes[`title${fieldDescriptor.direction}`]}>{name}</div>
            <div className={classes[`price${fieldDescriptor.direction}`]}>{visit}</div>
            <div className={`${classes.icon} ${classes[fieldDescriptor.direction]}`}><Icon /></div>
            <div className={classes[`priceUpsideDown${fieldDescriptor.direction}`]}>{visit}</div>
            <div className={classes[`titleUpsideDown${fieldDescriptor.direction}`]}>{name}</div>
            <div className={classes[`fieldNumber${fieldDescriptor.direction}`]}>X</div>
        </div>
    )
}

export default OtherBoardField
