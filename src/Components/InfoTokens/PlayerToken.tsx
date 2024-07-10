import { InfoToken } from "./InfoToken";
import { useClasses } from "./styles"

interface PlayerInteriorProps {
    color: string,
}

const PlayerInterior = ({color}: PlayerInteriorProps) => {
    const classes = useClasses();
    return (
        <div className={classes.playerLayout} style={{backgroundColor:'transparent'}}>
                <div className={classes.head} style={{backgroundColor: color}}></div>
                <div className={classes.corps} style={{backgroundColor: color}}></div>
        </div>
    )
}

export interface Props {
    color: string,
    name: string,
}

export const PlayerToken = ({color, name}: Props) => {
    return (
        <InfoToken
            mainColor = {color}
            alt = {`This indicates an estate owned by ${name}`}
            tooltip = {`Estate is owned by ${name}`}
        >
            <PlayerInterior color={color}/>
        </InfoToken>
    )
}
