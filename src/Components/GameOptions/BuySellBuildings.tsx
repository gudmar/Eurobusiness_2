

import { type } from "@testing-library/user-event/dist/type";
import { traceDeprecation } from "process";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { Commander } from "../../Logic/Commander/Commander";
import { tGameLogicState } from "../../Logic/Game/types";
import { REASON } from "../../Logic/Journalist/const";
import { OptionTypes, tJournalistOutputArrayOrRejection, tJournalistState, tOption, tRejection } from "../../Logic/Journalist/types";
import { NrOfHotels, NrOfHouses } from "../../Logic/Journalist/utils/getBuildingPermits";
import { tObject } from "../../Logic/types";
import { Button, ButtonColorScheme } from "../Button/Button";
import { getMessageWhenAllEstatesRejected } from "./getMessageWhenAllEstatesRejected";
import { useStyles } from "./styles";
import { tBuildingsPermit, tBuildingsPermitRecord, tEstate, tEstateProps, tEstatesProps, tTransactionForEachCountry } from "./types";


const getCountriesFromValidActions = (options: tObject<any>) => {
    const countries = options?.actions?.[0]?.payload;
    return countries;
}

const getUseEstatesContent = (ComponentToDislpayIn: FC<tEstateOptionsProps>, options: tObject<any>) => {
    const useEstatesContent = () => {
        const countries = getCountriesFromValidActions(options);
        const [presentedCountryName, setPresentedContryName] = useState<string>('');
        const [presentedEstateName, setPresentedEstatesName] = useState<string>('');
        const estate = countries?.[presentedCountryName]?.[presentedEstateName];
        useEffect(() => console.log('Estate', estate, options, countries), [estate])
        const setUnsetCountryName = (name: string) => {
            if (name === presentedCountryName) {
                setPresentedContryName('');
            } else {
                setPresentedContryName(name)
            }
        }
        const EstateContent = () => (
            <ComponentToDislpayIn estate={estate} />
        )
        return { 
            EstateContent,
            setPresentedContryName: setUnsetCountryName,
            setPresentedEstatesName,
            presentedCountryName,
            presentedEstateName
        };
    }
    return useEstatesContent;
}

type tEstateOptionsProps = {estate: tObject<any>}

type tCountries = { reason: string} | {actions: tObject<any>[], type: OptionTypes}

const isOperationNotAllowedInAnyCountry = (countries: tCountries) => {
    const keys = Object.keys(countries);
    return keys.length === 1 && keys[0] === 'reason';
}

const getPermits = (gameOptions: tJournalistState, dataKey: tDataKey) => {
    console.log('Game optons', gameOptions, dataKey)
    // Is this permits here extracted propelry? Selection of country does not crash app. but no result visible
    return (gameOptions?.[dataKey] as tOption)?.actions?.[0]?.payload
}
const getRejectionReason = (gameOptions: tJournalistState,dataKey: tDataKey) => {
    const nestedReason = (gameOptions?.[dataKey] as tOption)?.actions?.[0]?.payload.reason;
    const flatReason = (gameOptions?.[dataKey] as tRejection)?.reason;
return nestedReason || flatReason;
}

const usePossibleTransactions = (gameOptions: tJournalistState, dataKey: tDataKey) => {
    const [selectedCountryName, setSelectedCountryName] = useState<string>('');
    if (selectedCountryName === '') {}
    const permits = getPermits(gameOptions, dataKey);
    const rejectionReason = getRejectionReason(gameOptions, dataKey);
    return { 
        permits,
        setSelectedCountryName,
        selectedCountryName,
        rejectionReason,
    }
}

type tDataKey = 'buyBuildings' | 'sellBuildings';

export type tBuySellbuildingsProps = { gameOptions: tJournalistState, dataKey: tDataKey };

export const getBuySellBuildings = (dataKey: tDataKey) => ({gameOptions }: {gameOptions: tJournalistState}) => {
            const countries = (gameOptions as any)[dataKey];
            const classes = useStyles();
            const {
                permits,
                setSelectedCountryName,
                selectedCountryName,
                rejectionReason,
            } = usePossibleTransactions(gameOptions, dataKey);
            useEffect(() => {console.log('Permits', permits, !!permits)}, [permits])
            useEffect(() => {console.log('RejectionReason', rejectionReason)}, [rejectionReason])
            useEffect(() => console.log('s4elected new coutry', selectedCountryName), [selectedCountryName])
            if (isOperationNotAllowedInAnyCountry(countries)) {
                return  <>{countries.reason}</>
            }
            const countryNames = Object.keys(countries?.actions?.[0].payload);
            const buttons = countryNames.map(
                (countryName: string) => {
                    const isSelected = countryName === selectedCountryName;
                    return (
                        <div className={classes?.countryModule}>
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

    const getValidHousesTransactionText = ({locationOne, locationTwo, cost}: any) => {
        let result = '';
        if (locationOne) result += `1 house in ${locationOne} `;
        if (locationTwo) result += `2 houses in ${locationTwo} `;
        if (cost) result += `will cost together ${cost}`;
        return result
    }


    const TransactionEntry = (props: {transactionOptions: tTransactionForEachCountry, key: string}) => {
        if (!props.transactionOptions[props.key]) return null
        const value = props.transactionOptions[props.key];
        return (
            <div>
                <div>{props.key}</div><div>{JSON.stringify(value)}</div>
            </div>
        )
    }

    const TransactionContentBuilder = (transactionOptions: tTransactionForEachCountry) => {
        const keys = Object.keys(transactionOptions);
        const result = keys.map((key) => {
            return <TransactionEntry transactionOptions={transactionOptions} key={key}/>
        })
        return result;

    }

    const Quotation = ({quotation, isVisible, isOdd}: {quotation: tBuildingsPermitRecord, isVisible: boolean, isOdd: boolean}) => {
        if (!isVisible || !quotation) return null;
        // console.log('Quotation', quotation)
        const classes = useStyles();
        const {locationOne, locationTwo, locationThree, cost} = quotation;
        return (
            <div 
                className={`${classes.quotation} ${isOdd ? classes.odd : classes.even}`}
                onClick={() => Commander.buyBuildings({
                    playerColor:,
                    oneHouseCities: locationOne,
                    twoHouseCities: locationTwo,
                    oneHotel: // where is the hotel?
                    cost,
                })}
            >
                {locationOne && <div>
                        <b>One house in: </b>
                        {locationOne!.join(', ')},
                    </div>
                }
                {locationTwo && <div>
                        <b>Two houses in: </b>
                        {locationTwo!.join(', ')}
                    </div>
                }
                {locationThree && <div>
                        <b>Two houses in: </b>
                        {locationTwo!.join(', ')}
                    </div>
                }

                <b>price: </b> ${cost}
            </div>
        )
    }
    
    const Transaction = ({name, quotations} : {name: string, quotations: tBuildingsPermitRecord[]}) => {
        const [showQuotation, setShowQuotation] = useState<boolean>(false);
        const toggleQuotationVisibility = () => setShowQuotation(!showQuotation);
        const classes = useStyles();
        return (
            <div className={classes.quotations}>
                <Button
                    label={name}
                    action={toggleQuotationVisibility}
                />
                <div className={classes.spacing}>
                    {
                        quotations.map((quotation, index) => <Quotation isOdd={index%2===0} quotation={quotation} isVisible={showQuotation}/>)
                    }
                </div>                
            </div>
        )
    }

    const AllTransactions = ({permits} : tTransactionForEachCountry) => {
        console.log('Transaction options', permits)
        const classes = useStyles();

        // const content = TransactionContentBuilder(transactionOptions)
        const {reason} = permits;
        if (reason) return (<div>rejection</div>)
        const quotations = Object.entries(permits);
        return (
            <div>
                {
                    quotations.map(([name, quotationParts]) => (<Transaction name={name} quotations={quotationParts as tBuildingsPermitRecord[]} />))
                }
            </div>
        )
    }


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

    // const PossibleTransactions = ({permits}: { permits: any[]}) => {
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
