import { Color } from "../../Functions/Color/Color";
import { InfoToken } from "./InfoToken";
import { useClasses } from "./styles"

interface PlegdedInteriorProps {
    color: string,
}

const PlegdedInterior = ({color }: PlegdedInteriorProps) => {
    const classes = useClasses();
    const colorInstance = new Color(color);
    const contrastingColor = colorInstance.contrastColor
    return (
        <div className={classes.plegded} style={{backgroundColor:'transparent', color}}>
            {/* &times; */}
            <div className={`${classes.xLeft} ${classes.x}`} style={{backgroundColor: color}}></div>
            <div className={`${classes.xRight} ${classes.x}`} style={{backgroundColor: color}}></div>
        </div>
    )
}

export interface Props {
    color: string,
}

export const PlegdedToken = ({ color }: Props) => {
    return (
        <InfoToken
            mainColor = {color}
            alt = {`This estate is mortgaged`}
            tooltip = {`Plegded`}
        >
            <PlegdedInterior color={color}/>
        </InfoToken>
    )
}
