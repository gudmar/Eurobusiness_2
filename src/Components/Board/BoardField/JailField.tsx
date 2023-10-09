import { LegacyRef } from "react";
import { useSubscribeToFieldLocation } from "../../../Contexts/fieldLocation/useFieldLocation";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedOtherField, tOtherTypes } from "../../../Data/types";
import { useOtherField } from "../../../hooks/useField";
import { tBoardSideDirections } from "../types";
import { useStyles } from "./styels";

const JailField = (fieldDescriptor: iNamedOtherField & {direction: tBoardSideDirections}) => {
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
    const nodeReference = useSubscribeToFieldLocation(index);
    return (
        <div ref={nodeReference as unknown as LegacyRef<HTMLDivElement>} className={`${classes.fieldWrapper}  ${classes.leftBottomField}  ${classes.doubleWidthVertical}`}>
            <div className={classes.titleBarBottomLeft}>{name}</div>
            <div className={classes.iconBottomLeft}><Icon /></div>
            <div className={classes.titleBarBottomLeftUpside}>{name}</div>
            <div className={classes.fieldNumberBottomLeft}>{index+1}</div>
        </div>
    )

}

export default JailField
