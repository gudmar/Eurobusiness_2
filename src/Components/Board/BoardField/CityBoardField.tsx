import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedCityField, tCity } from "../../../Data/types"
import { useCityField } from "../../../hooks/useField"
import { useStyles } from "./styels";

const CityBoardField = (fieldDescriptor: iNamedCityField) => {
    const {
        name,
        type,
        country,
        price,
        mortage,
        housePrice,
        hotelPrice,
        visit,
        owner,
        nrOfHouses,
        color,
        isPlegded
    } = useCityField(fieldDescriptor.name as tCity)
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <div className={classes.cityFieldWrapper}>
            <div className={classes.colorBar} style={{backgroundColor: color}}></div>
            <div className={classes.title}>{name}</div>
            <div className={classes.price}>{price}</div>
            <div className={classes.empty}></div>
            <div className={classes.priceUpsideDown}>{price}</div>
            <div className={classes.titleUpsideDown}>{name}</div>
            <div className={classes.fieldNumber}>X</div>
        </div>
    )
}

export default CityBoardField
