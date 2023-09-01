import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { tOtherTypes } from "../../../Data/types";
import { useOtherField } from "../../../hooks/useField";
import { useStyles } from "./styels";

const OtherBoardField = (props: any) => {
    const {
        name,
        type,
        visit,
        info,
        wait,
        icon,
    } = useOtherField(props.name as tOtherTypes)
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <div className={classes.enterpriseFieldWrapper}>
            <div className={classes.title}>{name}</div>
            <div className={classes.price}>{visit}</div>
            <div className={classes.icon}>{icon}</div>
            <div className={classes.priceUpsideDown}>{visit}</div>
            <div className={classes.titleUpsideDown}>{name}</div>
            <div className={classes.fieldNumber}>X</div>
        </div>
    )
}

export default OtherBoardField
