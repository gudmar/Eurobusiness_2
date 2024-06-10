

import { type } from "@testing-library/user-event/dist/type";
import { traceDeprecation } from "process";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { tGameLogicState } from "../../Logic/Game/types";
import { OptionTypes, tJournalistOutputArrayOrRejection, tJournalistState, tOption, tRejection } from "../../Logic/Journalist/types";
import { NrOfHotels, NrOfHouses } from "../../Logic/Journalist/utils/getBuildingPermits";
import { tObject } from "../../Logic/types";
import { Button, ButtonColorScheme } from "../Button/Button";
import { getMessageWhenAllEstatesRejected } from "./getMessageWhenAllEstatesRejected";
import { useStyles } from "./styles";
import { tEstate, tEstateProps, tEstatesProps, tTransactionForEachCountry } from "./types";


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
    console.log('Game optons', gameOptions)
    Is this permits here extracted propelry? Selection of country does not crash app. but no result visible
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
                                action={()=> { setSelectedCountryName(countryName); console.log('Permits in button', permits, gameOptions, dataKey)}}
                                selected={countryName === selectedCountryName}
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
    
    const Transaction = (transactionOptions : tTransactionForEachCountry) => {
        const classes = useStyles();

        const content = TransactionContentBuilder(transactionOptions)

        return (
            <div className={classes.possibleTransactions}>
                { content }
            </div>
        )
    }


    // const PossibleTransactions = ({permits}: { permits: any[]}) => {
    const PossibleTransactions = (props:  any) => {
        const collapsedReason = props?.reason;
        const permitsForCountries = props?.actions?.[0]?.payload;
        const classes = useStyles();
        
        return (
            <>
                {collapsedReason && <div>{collapsedReason}</div> }
                {permitsForCountries && <div className={classes.permits}>
                    {
                        Object.values(permitsForCountries).map((permit: any) => {
                            const rejection = permit.reason;
                            if (rejection) return (<div>rejection</div>)
                            return (
                                <div key={JSON.stringify(permit)} className={classes.permit}>
                                    <Transaction permit={permit}/>
                                </div>
                            )
                        }
                        )
                    }
                </div>}
            </>
        )
    }
