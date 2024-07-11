import { useCallback, useState } from "react";
import { tCity } from "../../Data/types";
import { OptionTypes, tJournalistState } from "../../Logic/Journalist/types";
import { tObject } from "../../Logic/types";
import { Button } from "../Button/Button";
import { getUseEstatesContent } from "./getUseEstatesContent";
import { useStyles } from "./styles";
import { getRejectionReason, usePossibleTransactions } from "./usePossibleTransactions";

const SELL_BUILDINGS = 'sellBuildings';

type tLocationAfterTransaction = {
    cityName: tCity,
    nrOfHouses: number,
    nrOfHotels: number,
}

type tSellBuildingOption = {
    locationsAfterTransaction: tLocationAfterTransaction[],
    nrOfSoldHotels: number,
    nrOfSoldHouses: number,
    price: number,
}

type tPresentSingleSellBuildingOption = {
    description: string,
    optionVariants: tSellBuildingOption[],
}

const AfterTransactionDetails = (props: {details: tLocationAfterTransaction[]}) => {
    console.log('AfterTransactionDetails', props)
    return (
        <table>
            <thead>
                <tr><th>City</th><th>Houses left</th><th>Hotels left</th></tr>
            </thead>
            <tbody>
                {
                    props.details.map(({cityName, nrOfHouses, nrOfHotels}) => (
                        <tr key={cityName}><td><b>{cityName}</b></td><td>{nrOfHouses}</td><td>{nrOfHotels}</td></tr>
                    ))
                }
            </tbody>
        </table>
    )
}

const Variants = ({variants}: { variants: tSellBuildingOption }) => {
    const { locationsAfterTransaction, nrOfSoldHouses, nrOfSoldHotels, price } = variants;
    const classes = useStyles();
    const [afterTransactionVisible, setAfterTransactionVisible] = useState<boolean>(false);
    return (
        <div className={classes.buildingSellOptionSummary}>
            <b>Nr of houses to sell: </b> <span>{nrOfSoldHouses}</span>
            <b>Nr of hotels to sell: </b> <span>{nrOfSoldHotels}</span>
            <b>Earn: </b> <span>{price}</span>
            <div className={classes.leftAfterBuildingsSold}>
                Peep what is left after operation
                <div className={`${afterTransactionVisible ? classes.afterSellBuildingsVisible : classes.afterSellBuildingsHidden}`}>
                    <AfterTransactionDetails details={locationsAfterTransaction}/>
                </div>
            </div>
        </div>
    )
}

const PresentSingleSellBuildingOption = ({description, optionVariants}: tPresentSingleSellBuildingOption) => {
    // const { locationsAfterTransaction, nrOfSoldHouses, nrOfSoldHotels, price } = option;
    console.log('option', description, '(', optionVariants, ')') 

    const classes = useStyles();
    return (
        <div className={classes.variantsContainer}>
            { optionVariants.map((variant) => <Variants key={JSON.stringify(variant)} variants={variant} />) }
        </div>
    )
}

type tSellSingleBuildingOptionEntry = [string, tSellBuildingOption[]]

const PresentSellBuildingsOptions = ({sellOptions}: tObject<any> ) => {
    const sellOptionsEntries = Object.entries(sellOptions) as never as tSellSingleBuildingOptionEntry[];
    const classes = useStyles();
    console.log('Sell options entries', sellOptionsEntries)
    return (
        <div className={classes.horizontalContainer}>
            {
                sellOptionsEntries.filter(([, value]) => Array.isArray(value)).map(
                    ([description, option]: tSellSingleBuildingOptionEntry) => (
                        <PresentSingleSellBuildingOption
                            key={description}
                            description={description}
                            optionVariants={option}
                        />
                ))
            }
        </div>
    )
}

type tSellBuildingOptions = { [key: string]: tSellBuildingOption }

const getSellBuildings = (gameOptions: tJournalistState) => {
    const sellActions = (gameOptions as any).sellBuildings.actions;
    if (sellActions.reason) return sellActions.reason;
    console.log(gameOptions.sellBuildings)
    const sellBuildings = sellActions.find((action: {type: string, payload: any}) => {
        const {type, payload} = action;
        if (type === OptionTypes.SellBuildings) return true;
        return false
    })
    return sellBuildings.payload
}

export const SellBuildings = ({gameOptions}: {gameOptions: tJournalistState}) => {
    console.log('Game options', gameOptions)
    const sellOptionsFromProps = getSellBuildings(gameOptions);
    console.log('Sell(Options', sellOptionsFromProps)
    // const useEstateContent =  useCallback(getUseEstatesContent(PresentSellBuildingsOptions, sellOptionsFromProps), []);
    const [selectedCountryName, setSelectedCountryName] = useState('');
    const classes = useStyles();
    const rejectionReason = getRejectionReason(gameOptions, 'sellBuildings');
    const [option, setOption] = useState<any>(null);
    if (rejectionReason) {
        return (
            <div>{rejectionReason}</div>
        )
    }
    // const {
    //     permits: sellOptions,
    //     setSelectedCountryName, 
    //     selectedCountryName, 
    //     rejectionReason
    // } = usePossibleTransactions(gameOptions, SELL_BUILDINGS);
    // const {
    //     EstateContent,
    //     setPresentedContryName,
    //     setPresentedEstatesName,
    //     presentedCountryName,
    //     presentedEstateName
    // // } = useEstateContent();
    const countries = Object.entries(sellOptionsFromProps);
    if (sellOptionsFromProps.reason) return <>{sellOptionsFromProps.reason}</>
    return (
        <div className={classes.container}>
            <div className={`${classes.verticalContainer} ${classes.countryModule} `}>
            {
                countries.map(([countryName, countryOption]) => (
                    <div key={countryName}>
                        <Button
                            label={countryName}
                            selected={selectedCountryName === countryName}
                            disabled={false}
                            action={() => {
                                    setSelectedCountryName(countryName);
                                    setOption(countryOption)
                                }
                            }
                        />
                    </div>
                ))
            }
            </div>
            <div className={classes.actions}>{option && <PresentSellBuildingsOptions sellOptions={option}/>}</div>
        </div>
    )
}
