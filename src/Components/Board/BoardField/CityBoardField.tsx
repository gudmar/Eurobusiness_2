import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { iNamedCityField, tCity } from "../../../Data/types"
import { useCityField } from "../../../hooks/useField"
import { useStyles } from "./styels";
import { LEFT, RIGHT, TOP, BOTTOM, tBoardSideDirections } from "../types";
import { useSubscribeToFieldLocation } from "../../../Contexts/fieldLocation/useFieldLocation";
import { LegacyRef } from "react";
import { useClasses } from "../../Pawns/styles";
import { BANK } from "../../../Data/const";
import { PlayerToken } from "../../InfoTokens/PlayerToken";
import { HouseToken } from "../../InfoTokens/HouseToken";
import { HotelToken } from "../../InfoTokens/HotelToken";

const CityBoardField = (fieldDescriptor: iNamedCityField & {direction: tBoardSideDirections }) => {
    const {
        name,
        type,
        country,
        price,
        mortgage,
        housePrice,
        hotelPrice,
        visit,
        owner,
        nrOfHouses,
        nrOfHotels,
        color,
        isPlegded,
         index,
         logSubscribtions,
    } = useCityField(fieldDescriptor.name as tCity)
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);

    const nodeReference = useSubscribeToFieldLocation(index)
    
    const containerClass = classes[`cityFieldWrapper${fieldDescriptor.direction}`]
    const colorBarClass = classes[`colorBar${fieldDescriptor.direction}`]
    const titleClass = classes[`title${fieldDescriptor.direction}`] + ' ' + classes.fontCityName;
    const priceClass = classes[`price${fieldDescriptor.direction}`] + ' ' + classes.fontCityPrice;
    const emptyClass = classes[`empty${fieldDescriptor.direction}`]
    const priceUpsideDownClass = classes[`priceUpsideDown${fieldDescriptor.direction}`] + ' ' + classes.fontCityPrice;
    const titleUpsideDownClass = classes[`titleUpsideDown${fieldDescriptor.direction}`] + ' ' + classes.fontCityName;
    const titleFieldNumberClass = classes[`fieldNumber${fieldDescriptor.direction}`] + ' ' + classes.fontCityNumber;
    return (
        <div ref={nodeReference as unknown as LegacyRef<HTMLDivElement>} className={`${containerClass} ${classes.singleWidth} ${classes.fieldWrapper}`}>
            <div className={`${colorBarClass} ${classes.colorBar}`} style={{backgroundColor: color}}>
                {owner !== BANK && <PlayerToken color={color} name={owner}/>}
                {nrOfHouses > 0 && <HouseToken color={color} ammount={nrOfHouses}/>}
                {nrOfHotels > 0 && <HotelToken color={color}/>}
            </div>
            <div className={titleClass} onClick={logSubscribtions}>{name}</div>
            <div className={priceClass}>{price}</div>
            <div className={emptyClass}></div>
            <div className={priceUpsideDownClass}>{price}</div>
            <div className={titleUpsideDownClass}>{name}</div>
            <div className={titleFieldNumberClass}>{index+1}</div>
        </div>
    )
}

export default CityBoardField
