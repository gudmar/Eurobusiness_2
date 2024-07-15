import { useState } from "react";
import { tCity } from "../../Data/types";
import { Commander } from "../../Logic/Commander/Commander";
import { OptionTypes, tJournalistState } from "../../Logic/Journalist/types";
import { tObject } from "../../Logic/types";
import { Button } from "../Button/Button";
import { useStyles } from "./styles";
import { getRejectionReason } from "./usePossibleTransactions";

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
    index: number
}

const getPresentEvenOrOdd = (classes: tObject<any>, index: number) => {
    const isEven = index % 2 === 0;
    const result = isEven ? classes.oddElement : classes.evenElement;
    return result;
}


const AfterTransactionDetails = (props: {details: tLocationAfterTransaction[], index: number}) => {
    const classes = useStyles();
    return (
        <table className={`${classes.fullWidthTable} ${getPresentEvenOrOdd(classes, props.index)}`}>
            <thead>
                <tr>
                    <th className={classes.centerTable}>City</th>
                    <th className={classes.centerTable}>Houses left</th>
                    <th className={classes.centerTable}>Hotels left</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.details.map(({cityName, nrOfHouses, nrOfHotels}) => (
                        <tr key={cityName}>
                            <td className={classes.centerTable}><i>{cityName}</i></td>
                            <td className={classes.centerTable}>{nrOfHouses}</td>
                            <td className={classes.centerTable}>{nrOfHotels}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

const Variants = ({variants, isVisible, index}: { variants: tSellBuildingOption, isVisible: boolean, index: number }) => {
    const { locationsAfterTransaction } = variants;
    const classes = useStyles();
    return (
        <div className={`${classes.buildingSellOptionSummary} ${isVisible ? classes.visible : classes.hidden}`}>
            <div className={classes.leftAfterBuildingsSold}>
                <div className={classes.sellOption}  onClick={Commander.sellBuildings}>Select option {index} </div>
                <div>
                    <AfterTransactionDetails details={locationsAfterTransaction} index={index}/>
                </div>
            </div>
        </div>
    )
}

const PresentSingleSellBuildingOption = ({description, optionVariants, index}: tPresentSingleSellBuildingOption) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => isVisible ? setIsVisible(false) : setIsVisible(true)
    const classes = useStyles();
    return (
        <div className={classes.variantsContainer}>
            <div
                className={`${classes.title} ${getPresentEvenOrOdd(classes, index)}`}
                onClick = {toggleVisibility}
            >{description}</div>
            { optionVariants.map((variant, index) => <Variants 
                    key={JSON.stringify(variant)}
                    index={index}
                    isVisible={isVisible}
                    variants={variant}
                />) }
        </div>
    )
}

type tSellSingleBuildingOptionEntry = [string, tSellBuildingOption[]]

const PresentSellBuildingsOptions = ({sellOptions}: tObject<any> ) => {
    const sellOptionsEntries = Object.entries(sellOptions) as never as tSellSingleBuildingOptionEntry[];
    const classes = useStyles();
    return (
        <div className={classes.horizontalContainer}>
            {
                sellOptionsEntries.filter(([, value]) => Array.isArray(value)).map(
                    ([description, option]: tSellSingleBuildingOptionEntry, index) => (
                        <PresentSingleSellBuildingOption
                            key={description}
                            index={index}
                            description={description}
                            optionVariants={option}
                        />
                ))
            }
        </div>
    )
}

const getSellBuildings = (gameOptions: tJournalistState) => {
    const sellActions = (gameOptions as any).sellBuildings.actions;
    if (sellActions.reason) return sellActions.reason;
    const sellBuildings = sellActions.find((action: {type: string, payload: any}) => {
        const {type, payload} = action;
        if (type === OptionTypes.SellBuildings) return true;
        return false
    })
    return sellBuildings.payload
}

export const SellBuildings = ({gameOptions}: {gameOptions: tJournalistState}) => {
    const sellOptionsFromProps = getSellBuildings(gameOptions);
    const [selectedCountryName, setSelectedCountryName] = useState('');
    const classes = useStyles();
    const rejectionReason = getRejectionReason(gameOptions, 'sellBuildings');
    const [option, setOption] = useState<any>(null);
    if (rejectionReason) {
        return (
            <div>{rejectionReason}</div>
        )
    }
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