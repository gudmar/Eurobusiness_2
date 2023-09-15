import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedOtherField, tOtherTypes } from "../../../Data/types";
import { useOtherField } from "../../../hooks/useField";
import { tBoardSideDirections } from "../types";
import { useStyles } from "./styels";

const StartField = (fieldDescriptor: iNamedOtherField & {direction: tBoardSideDirections}) => {
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
            <div className={`${classes.fieldWrapper}  ${classes.rightBottomField}  ${classes.doubleWidth}`}>
                <div className={classes.titleBarBottomRight}>{name}</div>
                <div className={classes.iconBottomRight}>
                    <Icon /><Icon /><Icon /><Icon /><Icon /><Icon />
                </div>
                <div className={classes.titleBarBottomRightUpside}>{name}</div>
                <div className={classes.fieldNumberBottomRight}>{index+1}</div>
            </div>
        )
}

export default StartField
