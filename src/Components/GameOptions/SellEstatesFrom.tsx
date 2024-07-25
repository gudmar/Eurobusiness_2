import { SellEstatesReasons } from "../../Logic/Journalist/utils/getSellEstatesOptions";
import { Button } from "../Button/Button";
import { Informator } from "../Information/Infromator";
import { useStyles } from "./styles";

export const SellEstatesAlternative = ({estateName, ...props}: {estateName: string, [key: string]: any}) => {
    if (estateName === 'reason') return <>{props.estateValue}</>;
    return null;
}

const SellEstatesForm = ((props: any) => {
    const {estate } = props;
    const {reason, initialPrice} = estate;
    const isAllowed = reason === SellEstatesReasons.Allowed;
    const classes = useStyles();
    return (
        <div className={classes.reason}>
            {
                isAllowed
                    ? 
                        <Button
                            label={`Start auction with $${initialPrice}`} 
                            disabled={!isAllowed} 
                            action={
                                () => {
                                    Informator.instance.displayError({
                                        title: 'Auction estates',
                                        message: 'Not implemented yet'
                                    })
                                }
                            }
                        />
                    :
                        <>{estate!.reason}</>
            }
        </div>
    )
}) as () => JSX.Element

export default SellEstatesForm;
