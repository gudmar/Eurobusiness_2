import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedOtherField, tOtherTypes } from "../../../Data/types";
import { useOtherField } from "../../../hooks/useField";
import { tBoardSideDirections } from "../types";
import { useStyles } from "./styels";

const GoToJail = (fieldDescriptor: iNamedOtherField & {direction: tBoardSideDirections}) => {
    const {
        name,
        type,
        visit,
        info,
        wait,
        Icon,
        index,
    } = useOtherField(fieldDescriptor.name as tOtherTypes)
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <div className={`${classes.fieldWrapper}  ${classes.rightTopField}  ${classes.doubleWidth}`}>
            <div className={classes.titleBarTopRight}>{name}</div>
            <div className={classes.iconTopRight}><Icon /></div>
            <div className={classes.titleBarTopRightUpside}>{name}</div>
            <div className={classes.fieldNumberTopRight}>{index+1}</div>
        </div>
    )
}

export default GoToJail
