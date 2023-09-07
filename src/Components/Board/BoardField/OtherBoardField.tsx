import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedOtherField, tOtherTypes } from "../../../Data/types";

import { useOtherField } from "../../../hooks/useField";
import { tBoardSideDirections } from "../types";
import { useStyles } from "./styels";

const OtherBoardField = (fieldDescriptor: iNamedOtherField & {direction: tBoardSideDirections}) => {
    const {
        name,
        type,
        visit,
        info,
        wait,
        Icon,
    } = useOtherField(fieldDescriptor.name as tOtherTypes);
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    const ActualIcon = Icon || (() => <></>)
    const containerDirectionClass = classes[`enterpriseFieldWrapper${fieldDescriptor.direction}`]
    return (
        <div className={`${classes.fieldWrapper}  ${classes.singleWidth} ${containerDirectionClass}`}>
            <div className={classes[`title${fieldDescriptor.direction}`]}>{name}</div>
            <div className={classes[`price${fieldDescriptor.direction}`]}>{visit}</div>
            <div className={`${classes.icon} ${classes[fieldDescriptor.direction]}`}><ActualIcon /></div>
            <div className={classes[`priceUpsideDown${fieldDescriptor.direction}`]}>{visit}</div>
            <div className={classes[`titleUpsideDown${fieldDescriptor.direction}`]}>{name}</div>
            <div className={classes[`fieldNumber${fieldDescriptor.direction}`]}>X</div>
        </div>
    )
}

export default OtherBoardField
