import { InfoToken } from "./InfoToken";
import { useClasses } from "./styles"

interface HouseInteriorProps {
    color: string,
}

const HouseInterior = ({color}: HouseInteriorProps) => {
    const classes = useClasses();
    return (
        <div className={classes.houseLayout} aria-role={'none'} style={{backgroundColor:'transparent'}}>
                <div className={classes.roof} style={{borderBottomColor: color}}></div>
                <div className={classes.houseNoRoof} style={{backgroundColor: color}}></div>
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
            <HouseInterior color={color}/>
        </InfoToken>
    )
}
