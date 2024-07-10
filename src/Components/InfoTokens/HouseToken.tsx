import { Color } from "../../Functions/Color/Color";
import { InfoToken } from "./InfoToken";
import { useClasses } from "./styles"

interface HouseInteriorProps {
    color: string,
    ammount: number,
}

const HouseInterior = ({color,ammount}: HouseInteriorProps) => {
    const classes = useClasses();
    const colorInstance = new Color(color);
    const contrast = colorInstance.contrastColor;

    return (
        <div className={classes.houseLayout} style={{backgroundColor:'transparent'}}>
                <div className={classes.roof} style={{borderBottomColor: color}}></div>
                <div className={classes.houseNoRoof} style={{backgroundColor: color}}>
                    <span className={classes.moveUp} style={{color: contrast}}>{ammount}</span>
                </div>
        </div>
    )
}

export interface Props {
    color: string,
    ammount: number,
}

export const HouseToken = ({color, ammount}: Props) => {
    return (
        <InfoToken
            mainColor = {color}
            alt = {`${ammount} houses on this estate`}
            tooltip = {`${ammount} houses`}
        >
            <HouseInterior color={color} ammount={ammount}/>
        </InfoToken>
    )
}
