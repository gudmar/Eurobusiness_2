import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { BLUE } from "../../../Data/const";
import { useChanceCardsDescriptions } from "../../../hooks/LogicHookups/useChanceCards";
import { useStyles } from "./styles";

const Card = ({color, description, isBorrowed}: any) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    return (
        <div className={`${classes.card} ${ color === BLUE ? classes.blueCard : classes.redCard} ${isBorrowed ? classes.borrowed : ''}`}>
            <div className={`${classes.oval} ${classes.center}`}>{description}</div>
        </div>
    )
}

export const ChanceCardsPresenter = ({section}: any) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const {
        descriptions, borrowedDescriptions,
    } = useChanceCardsDescriptions(section);
    return (
        <div className={classes.container}>
            {descriptions.map((description) => <Card color={section} description={description} isBorrowed={borrowedDescriptions.includes(description)}/>)}
        </div>
    )
}
