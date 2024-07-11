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
    locationAfterTransaction: tLocationAfterTransaction[],
    nrOfSoldHotels: number,
    nrOfSoldHouses: number,
    price: number,
}

type tPresentSingleSellBuildingOption = {
    description: string,
    option: tSellBuildingOption,
}

const AfterTransactionDetails = ({details}: {details: tLocationAfterTransaction[]}) => {
    return (
        <table>
            <tr><th>City</th><th>Houses left</th><th>Hotels left</th></tr>
            {
                details.map(({cityName, nrOfHouses, nrOfHotels}) => (
                    <tr key={cityName}><td><b>{cityName}</b></td><td>{nrOfHouses}</td><td>{nrOfHotels}</td></tr>
                ))
            }
        </table>
    )
}

const PresentSingleSellBuildingOption = ({description, option}: tPresentSingleSellBuildingOption) => {
    const { locationAfterTransaction, nrOfSoldHouses, nrOfSoldHotels, price } = option;
    console.log('option', description, option)
    const [afterTransactionVisible, setAfterTransactionVisible] = useState<boolean>(false);
    const classes = useStyles();
    return (
        <div className={classes.buildingSellOptionSummary}>
            <b>Nr of houses to sell: </b> <span>{nrOfSoldHouses}</span>
            <b>Nr of hotels to sell: </b> <span>{nrOfSoldHotels}</span>
            <b>Earn: </b> <span>{price}</span>
            <div className={classes.leftAfterBuildingsSold}>
                Peep what is left after operation
                <div className={`${afterTransactionVisible ? classes.afterSellBuildingsVisible : classes.afterSellBuildingsHidden}`}>
                    <AfterTransactionDetails details={locationAfterTransaction}/>
                </div>
            </div>
        </div>
    )
}

type tSellSingleBuildingOptionEntry = [string, tSellBuildingOption]

const PresentSellBuildingsOptions = ({sellOptions}: tObject<any>) => {
    const sellOptionsEntries = Object.entries(sellOptions) as never as tSellSingleBuildingOptionEntry[];
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {
                sellOptionsEntries.map(([description, option]: tSellSingleBuildingOptionEntry) => (<PresentSingleSellBuildingOption key={description} description={description} option={option}/>))
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
    const useEstateContent =  useCallback(getUseEstatesContent(PresentSellBuildingsOptions, sellOptionsFromProps), []);
    const [selectedCountryName, setSelectedCountryName] = useState('');
    const classes = useStyles();
    const rejectionReason = getRejectionReason(gameOptions, 'sellBuildings');

    // const {
    //     permits: sellOptions,
    //     setSelectedCountryName, 
    //     selectedCountryName, 
    //     rejectionReason
    // } = usePossibleTransactions(gameOptions, SELL_BUILDINGS);
    const {
        EstateContent,
        setPresentedContryName,
        setPresentedEstatesName,
        presentedCountryName,
        presentedEstateName
    } = useEstateContent();
    const countries = Object.entries(sellOptionsFromProps);
    if (sellOptionsFromProps.reason) return <>{sellOptionsFromProps.reason}</>
    return (
        <div className={classes.container}>
            {
                countries.map(([countryName, option]) => (
                    <div key={countryName}>
                        <Button
                            label={countryName}
                            selected={selectedCountryName === countryName}
                            disabled={false}
                            action={() => setSelectedCountryName(countryName)}
                        />
                        <PresentSellBuildingsOptions sellOptions={option}/>
                    </div>
                ))
            }
        </div>
    )
}
