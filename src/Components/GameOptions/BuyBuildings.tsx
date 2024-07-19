import { useState } from "react";
import { REFRESH_GAME_OPTIONS } from "../../Constants/cleaners";
import { useImportCleaner } from "../../Contexts/CleaningContext/CleaningContext";
import { Commander } from "../../Logic/Commander/Commander";
import { tJournalistState } from "../../Logic/Journalist/types";
import { NrOfHotels, NrOfHouses } from "../../Logic/Journalist/utils/getBuildingPermits";
import { Players } from "../../Logic/Players/Players";
import { tObject } from "../../Logic/types";
import { Button } from "../Button/Button";
import { useStyles } from "./styles";
import { tBuildingsPermitRecord, tDataKey, tTransactionForEachCountry } from "./types";
import { usePossibleTransactions } from "./usePossibleTransactions";
import { getBuildingType, isOperationNotAllowedInAnyCountry, setIfRegardsHotels, setIfRegardsHouses } from "./utils";

export type tBuySellbuildingsProps = { gameOptions: tJournalistState, dataKey: tDataKey };

const dataKey = 'buyBuildings';

export const BuyBuildings = ({gameOptions }: {gameOptions: tJournalistState}) => {
        const countries = (gameOptions as any)[dataKey];
        const classes = useStyles();
        const {
            permits,
            setSelectedCountryName,
            selectedCountryName,
            rejectionReason,
        } = usePossibleTransactions(gameOptions, dataKey);
        if (isOperationNotAllowedInAnyCountry(countries)) {
            return  <>{countries.reason}</>
        }
        const countryNames = Object.keys(countries?.actions?.[0].payload);
        const buttons = countryNames.map(
            (countryName: string) => {
                const isSelected = countryName === selectedCountryName;
                return (
                    <div className={classes?.countryModule} key={countryName}>
                        <Button
                            label={countryName}
                            action={()=> {
                                setSelectedCountryName(countryName);
                            }}
                            selected={isSelected}
                        />
                    </div>
                )
            }
        )
        return (
            <div className={classes?.container}>
                <div className={classes?.countriesList}>{buttons}</div>
                <div className={classes?.actions}>
                    { !!permits && <PossibleTransactions permits={permits[selectedCountryName]}/>}
                    { !!rejectionReason && <div>{rejectionReason}</div>}
                </div>
            </div>
        )        
}

const Quotation = ({quotation, isVisible, isOdd, whatIsQuoted}: {whatIsQuoted: NrOfHotels | NrOfHouses, quotation: tBuildingsPermitRecord, isVisible: boolean, isOdd: boolean}) => {
    if (!isVisible || !quotation) return null;
    const classes = useStyles();
    const {locationOne, locationTwo, locationThree, cost} = quotation;
    const buildingType = getBuildingType(whatIsQuoted);
    const refreshGameState = useImportCleaner(REFRESH_GAME_OPTIONS);
    return (
        <div 
            className={`${classes.quotation} ${isOdd ? classes.odd : classes.even}`}
            onClick={() => {
                Commander.buyBuildings({
                    playerColor: Players.instance.currentPlayer.color,
                    oneHouseCities: setIfRegardsHouses(whatIsQuoted, locationOne),
                    twoHouseCities: setIfRegardsHouses(whatIsQuoted, locationTwo),
                    oneHotelCity: setIfRegardsHotels(whatIsQuoted, locationOne),
                    cost,
                });
                refreshGameState();
            }}
        >
            {locationOne && <div>
                    <b>{`One ${buildingType} in: `}</b>
                    {locationOne!.join(', ')},
                </div>
            }
            {locationTwo && <div>
                    <b>{`Two ${buildingType}s in: `}</b>
                    {locationTwo!.join(', ')}
                </div>
            }
            <b>price: </b> ${cost}
        </div>
    )
}

const Transaction = ({whatIsQuoted, quotations} : {whatIsQuoted: NrOfHotels | NrOfHouses, quotations: tBuildingsPermitRecord[]}) => {
    const [showQuotation, setShowQuotation] = useState<boolean>(false);
    const toggleQuotationVisibility = () => setShowQuotation(!showQuotation);
    const classes = useStyles();
    return (
        <div className={classes.quotations} key={whatIsQuoted}>
            <Button
                label={whatIsQuoted}
                action={toggleQuotationVisibility}
            />
            <div className={classes.spacing}>
                {
                    quotations.map((quotation, index) => <Quotation key={JSON.stringify(quotation)} isOdd={index%2===0} whatIsQuoted={whatIsQuoted} quotation={quotation} isVisible={showQuotation}/>)
                }
            </div>                
        </div>
    )
}

const AllTransactions = ({permits} : tTransactionForEachCountry) => {
    const {reason} = permits;
    if (reason) return (<div>rejection</div>)
    const quotations = Object.entries(permits);
    return (
        <div>
            {
                quotations.map(([whatIsQuoted, quotationParts]) => (<Transaction key={JSON.stringify(quotationParts)} whatIsQuoted={whatIsQuoted as NrOfHotels | NrOfHouses} quotations={quotationParts as tBuildingsPermitRecord[]} />))
            }
        </div>
    )
}

// Problem z nazwaniem ofert: 1house zamiast 1hotel, poza tym pisze bzdury o tym ,ze nie moze postawic hotelu
// a moze, no i 'Each city should have at least 4 houses or 1 hotel'. Co to ma znaczyc?

const getPermitsFromPossibleTransactionsProps = (possibleTransactionsProps: tObject<any>) => {
    console.log(possibleTransactionsProps)
    const entries = Object.entries(possibleTransactionsProps?.permits?.permits || {});
    const possibiliteisAsObject = entries.reduce((acc: tObject<any>, [key, value]) => {
        if (key !== 'houseReason' && key !== 'hotelReason') {
            acc[key] = value;
        }
        return acc;
    }, {})
    return possibiliteisAsObject;
}

const PossibleTransactions = (props:  any) => {
    console.log('Possible Transactions', props)
    const buildingsCollapsedReason = props?.permits?.reason;
    const hotelsReason = props?.permits?.permits?.hotelReason;
    const houseReason = props?.permits?.permits?.houseReason;
    const permitsForCountries = getPermitsFromPossibleTransactionsProps(props);
    console.log(permitsForCountries)
    const classes = useStyles();
    
    return (
        <div className={classes.permits}>
            {buildingsCollapsedReason && <div>{buildingsCollapsedReason}</div> }
            {hotelsReason && <div>{hotelsReason}</div> }
            {houseReason && <div>{houseReason}</div> }
            {permitsForCountries && 
                <div>
                    <AllTransactions permits={permitsForCountries} />
                </div>
            }
        </div>
    )
}
