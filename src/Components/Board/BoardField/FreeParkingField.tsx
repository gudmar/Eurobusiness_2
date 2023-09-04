import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { tOtherTypes } from "../../../Data/types";
import { useOtherField } from "../../../hooks/useField";
import { useStyles } from "./styels";

const FreeParkingField = (props: any) => {
    const {
        name,
        type,
        visit,
        info,
        wait,
        Icon,
    } = useOtherField(props.name as tOtherTypes)
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    const ActualIcon = Icon || (() => <></>)
    return (
        <div className={`${classes.enterpriseFieldWrapper}  ${classes.singleWidth}`}>
            <div className={classes.title}>{name}</div>
            <div className={classes.price}>{visit}</div>
            <div className={classes.icon}><ActualIcon /></div>
            <div className={classes.priceUpsideDown}>{visit}</div>
            <div className={classes.titleUpsideDown}>{name}</div>
            <div className={classes.fieldNumber}>X</div>
        </div>
    )
}

export default FreeParkingField
