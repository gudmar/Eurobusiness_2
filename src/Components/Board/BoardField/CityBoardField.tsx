import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedCityField, tCity } from "../../../Data/types"
import { useCityField } from "../../../hooks/useField"
import { useStyles } from "./styels";
import { LEFT, RIGHT, TOP, BOTTOM, tBoardSideDirections } from "../types";

const CityBoardField = (fieldDescriptor: iNamedCityField & {direction: tBoardSideDirections }) => {
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
    const containerClass = classes[`cityFieldWrapper${fieldDescriptor.direction}`]
    const colorBarClass = classes[`colorBar${fieldDescriptor.direction}`]
    const titleClass = classes[`title${fieldDescriptor.direction}`] + ' ' + classes.fontCityName;
    const priceClass = classes[`price${fieldDescriptor.direction}`] + ' ' + classes.fontCityPrice;
    const emptyClass = classes[`empty${fieldDescriptor.direction}`]
    const priceUpsideDownClass = classes[`priceUpsideDown${fieldDescriptor.direction}`] + ' ' + classes.fontCityPrice;
    const titleUpsideDownClass = classes[`titleUpsideDown${fieldDescriptor.direction}`] + ' ' + classes.fontCityName;
    const titleFieldNumberClass = classes[`fieldNumber${fieldDescriptor.direction}`] + ' ' + classes.fontCityNumber;
    return (
        <div className={`${containerClass} ${classes.singleWidth} ${classes.fieldWrapper}`}>
            <div className={colorBarClass} style={{backgroundColor: color}}></div>
            <div className={titleClass}>{name}</div>
            <div className={priceClass}>{price}</div>
            <div className={emptyClass}></div>
            <div className={priceUpsideDownClass}>{price}</div>
            <div className={titleUpsideDownClass}>{name}</div>
            <div className={titleFieldNumberClass}>X</div>
        </div>
    )
}

export default CityBoardField
