import { LegacyRef, memo } from "react"
import { useSubscribeToFieldLocation } from "../../../Contexts/fieldLocation/useFieldLocation";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedChance, tChanceType } from "../../../Data/types";
import { getFieldState, useChanceField } from "../../../hooks/useField";
import { tBoardSideDirections } from "../types";
import { useStyles } from "./styels";

const withChanceField = (onClick: () => void) => (fieldDescriptor: iNamedChance & {direction: tBoardSideDirections}) => {
    // const fieldState = getFieldState(fieldDescriptor.name as tChanceType)
    const {
        name, index, type, Icon
    } = useChanceField(fieldDescriptor.name as tChanceType)
    
    // const {
    //     type, info, Icon,
    // } = fieldState;
    // const Icon = fieldState.Icon
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    const nodeReference = useSubscribeToFieldLocation(index);
    const questionMarkWrapper = classes[`questionMarkWrapper${fieldDescriptor.direction}`]
    return (
        <div ref={nodeReference as unknown as LegacyRef<HTMLDivElement>} className={`${questionMarkWrapper} ${classes.singleWidth} ${classes.fieldWrapper}`}>
            <div className={classes.empty}></div>
            <div className={`${classes.icon} ${classes[fieldDescriptor.direction]}`}><Icon /></div>
            <div className={classes[`fieldNumber${fieldDescriptor.direction}`]}>{index + 1}</div>
        </div>
    )
}
export const ChanceBlueField = memo(withChanceField(() => {}))
export const ChanceRedField = memo(withChanceField(() => {}))
