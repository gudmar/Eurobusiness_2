import { memo } from "react"
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedChance, tChanceType } from "../../../Data/types";
import { getFieldState } from "../../../hooks/useField";
import { tBoardSideDirections } from "../types";
import { useStyles } from "./styels";

const withChanceField = (onClick: () => void) => (fieldDescriptor: iNamedChance & {direction: tBoardSideDirections}) => {
    const fieldState = getFieldState(fieldDescriptor.name as tChanceType)
    
    // const {
    //     type, info, Icon,
    // } = fieldState;
    const Icon = fieldState.Icon
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    const questionMarkWrapper = classes[`questionMarkWrapper${fieldDescriptor.direction}`]
    return (
        <div className={`${questionMarkWrapper} ${classes.singleWidth} ${classes.fieldWrapper}`}>
            <div className={classes.empty}></div>
            <div className={`${classes.icon} ${classes[fieldDescriptor.direction]}`}><Icon /></div>
            <div className={classes[`fieldNumber${fieldDescriptor.direction}`]}>X</div>
        </div>
    )
}
export const ChanceBlueField = memo(withChanceField(() => {}))
export const ChanceRedField = memo(withChanceField(() => {}))
