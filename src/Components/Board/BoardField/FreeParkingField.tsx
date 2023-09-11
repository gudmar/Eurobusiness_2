import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedOtherField, tOtherTypes } from "../../../Data/types";
import { useOtherField } from "../../../hooks/useField";
import { tBoardSideDirections } from "../types";
import { useStyles } from "./styels";

const FreeParkingField = (fieldDescriptor: iNamedOtherField & {direction: tBoardSideDirections}) => {
    const {
        name,
        type,
        visit,
        info,
        wait,
        Icon,
    } = useOtherField(fieldDescriptor.name as tOtherTypes)
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <div className={`${classes.fieldWrapper}  ${classes.leftTopField}  ${classes.doubleWidth}`}>
            <div className={classes.titleBarTopLeft}>{name}</div>
            <div className={classes.iconTopLeft}><Icon /></div>
            <div className={classes.titleBarTopLeftUpside}>{name}</div>
            <div className={classes.fieldNumberTopLeft}>X</div>
        </div>
    )
}

export default FreeParkingField
