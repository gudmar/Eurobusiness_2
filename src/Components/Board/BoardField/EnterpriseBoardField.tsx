import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedNonCityEstates, tNonCityEstates } from "../../../Data/types"
import { useNonCityEstatesField } from "../../../hooks/useField"
import { useStyles } from "./styels";

const EnterpriseBoardField = (fieldDescriptor: iNamedNonCityEstates) => {
    const {
        country,
        type,
        price,
        mortage,
        visit,
        owner,
        isPlegded,
        icon,
        name
    } = useNonCityEstatesField(fieldDescriptor.name as tNonCityEstates)
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <div className={classes.enterpriseFieldWrapper}>
            <div className={classes.title}>{name}</div>
            <div className={classes.price}>{price}</div>
            <div className={classes.icon}>{icon}</div>
            <div className={classes.priceUpsideDown}>{price}</div>
            <div className={classes.titleUpsideDown}>{name}</div>
            <div className={classes.fieldNumber}>X</div>
        </div>
    )
}

export default EnterpriseBoardField
