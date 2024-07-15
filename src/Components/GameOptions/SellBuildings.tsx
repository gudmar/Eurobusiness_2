import { useRef, useState } from "react";
import { tCity } from "../../Data/types";
import { useHighlightOnHover } from "../../hooks/useHighlightOnHover";
import { Commander } from "../../Logic/Commander/Commander";
import { OptionTypes, tJournalistState } from "../../Logic/Journalist/types";
import { tObject } from "../../Logic/types";
import { Button } from "../Button/Button";
import { useStyles } from "./styles";
import { tLocationAfterTransaction, tPresentSingleSellBuildingOption, tSellBuildingOption } from "./types";
import { getRejectionReason } from "./usePossibleTransactions";

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

const Variants = ({variants, isVisible, index, playerName}: { playerName: string, variants: tSellBuildingOption, isVisible: boolean, index: number }) => {
    const { locationsAfterTransaction } = variants;
    const selectionHandle = useRef<HTMLDivElement>(null);
    const classes = useStyles();
    const highlightOnHover = useHighlightOnHover(selectionHandle, classes.highlightOnHover, classes.noHighlightOnNotHover);
    return (
        <div className={`${classes.buildingSellOptionSummary} ${isVisible ? classes.visible : classes.hidden}`}>
            <div className={classes.leftAfterBuildingsSold}>
                <div className={`${classes.sellOption}`} ref={selectionHandle} onClick={
                    () => Commander.sellBuildings({
                        nrOfHotels: variants.nrOfSoldHotels,
                        nrOfHouses: variants.nrOfSoldHouses,
                        locationAfterTransaction: variants.locationsAfterTransaction,
                        playerName: playerName,
                        price: variants.price,
                    })
                }>Select option {index} </div>
                <div className={`${highlightOnHover}`}>
                    <AfterTransactionDetails details={locationsAfterTransaction} index={index}/>
                </div>
            </div>
        </div>
    )
}

const PresentSingleSellBuildingOption = ({description, optionVariants, index, playerName}: tPresentSingleSellBuildingOption) => {
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
                    playerName={playerName}
                />) }
        </div>
    )
}

type tSellSingleBuildingOptionEntry = [string, tSellBuildingOption[]]

const PresentSellBuildingsOptions = ({sellOptions, playerName}: {sellOptions: tObject<any>, playerName: string } ) => {
    const sellOptionsEntries = Object.entries(sellOptions) as never as tSellSingleBuildingOptionEntry[];
    const classes = useStyles();
    return (
        <div className={classes.horizontalContainer}>
            {
                sellOptionsEntries.filter(([, value]) => Array.isArray(value)).map(
                    ([description, option]: tSellSingleBuildingOptionEntry, index) => (
                        <PresentSingleSellBuildingOption
                            playerName={playerName}
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
    const playerName = gameOptions.playerName;
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
    if (!playerName) return (<div className={classes.error}>Cannot find player name</div>)
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
            <div className={classes.actions}>{option && <PresentSellBuildingsOptions sellOptions={option} playerName={playerName}/>}</div>
        </div>
    )
}

// Byłoby ładnie gdyby najazd na tytuł 'select 0' powodował podświetlenie całosic
