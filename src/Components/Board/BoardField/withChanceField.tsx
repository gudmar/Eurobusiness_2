import { memo } from "react"
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { tChanceType } from "../../../Data/types";
import { getFieldState } from "../../../hooks/useField";
import { useStyles } from "./styels";

const withChanceField = (onClick: () => void) => (props: any) => {
    const {
        type, info, icon,
    } = getFieldState(props.name as tChanceType)
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <div className={`${classes.questionMarkWrapper}  ${classes.singleWidth}`}>
            <div className={classes.empty}></div>
            <div className={classes.icon}>{icon}</div>
            <div className={classes.fieldNumber}>X</div>
        </div>
    )
}

export const ChanceBlueField = memo(withChanceField(() => {}))
export const ChanceRedField = memo(withChanceField(() => {}))
