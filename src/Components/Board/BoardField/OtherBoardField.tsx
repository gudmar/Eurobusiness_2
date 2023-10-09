import { LegacyRef, useEffect } from "react";
import { useSubscribeToFieldLocation } from "../../../Contexts/fieldLocation/useFieldLocation";
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
        index,
    } = state
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    const nodeReference = useSubscribeToFieldLocation(index);
    const containerDirectionClass = classes[`enterpriseFieldWrapper${fieldDescriptor.direction}`]
    return (
        <div ref={nodeReference as unknown as LegacyRef<HTMLDivElement>} className={`${classes.fieldWrapper}  ${classes.singleWidth} ${containerDirectionClass}`}>
            <div className={classes[`title${fieldDescriptor.direction}`]}>{name}</div>
            <div className={classes[`price${fieldDescriptor.direction}`]}>{visit}</div>
            <div className={`${classes.icon} ${classes[fieldDescriptor.direction]}`}><Icon /></div>
            <div className={classes[`priceUpsideDown${fieldDescriptor.direction}`]}>{visit}</div>
            <div className={classes[`titleUpsideDown${fieldDescriptor.direction}`]}>{name}</div>
            <div className={classes[`fieldNumber${fieldDescriptor.direction}`]}>{index+1}</div>
        </div>
    )
}

export default OtherBoardField
