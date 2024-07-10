import { Color } from "../../Functions/Color/Color";
import { InfoToken } from "./InfoToken";
import { useClasses } from "./styles"

interface HotelInteriorProps {
    color: string,
}

const HotelInterior = ({color }: HotelInteriorProps) => {
    const classes = useClasses();
    const colorInstance = new Color(color);
    const contrastingColor = colorInstance.contrastColor
    return (
        <div className={classes.hotelLayout} style={{backgroundColor:'transparent'}}>
            <div className={classes.hotelCeiling} style={{backgroundColor:  color}} />
            <div className={classes.hotelLeftWall} style={{backgroundColor: color}} />
            <div className={classes.hotelRightWall} style={{backgroundColor: color}} />
            <div className={classes.hotelWindow11} style={{backgroundColor: contrastingColor}}/>
            <div className={classes.hotelWindow12} style={{backgroundColor: contrastingColor}}/>
            <div className={classes.hotelWindow21} style={{backgroundColor: contrastingColor}}/>
            <div className={classes.hotelWindow22} style={{backgroundColor: contrastingColor}}/>
            <div className={classes.hotelFloor1} style={{backgroundColor: color}} />
            <div className={classes.hotelFloor2} style={{backgroundColor: color}} />
            <div className={classes.hotelWall} style={{backgroundColor:   color}} />
            <div className={classes.ground}  style={{backgroundColor:     color}} />
        </div>
    )
}

export interface Props {
    color: string,
}

export const HotelToken = ({ color }: Props) => {
    return (
        <InfoToken
            mainColor = {color}
            alt = {`Hotel on this estae`}
            tooltip = {`A hotel on this estate`}
        >
            <HotelInterior color={color}/>
        </InfoToken>
    )
}
