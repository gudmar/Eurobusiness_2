

import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { tGameLogicState } from "../../Logic/Game/types";
import { OptionTypes, tJournalistOutputArrayOrRejection, tJournalistState, tOption, tRejection } from "../../Logic/Journalist/types";
import { tObject } from "../../Logic/types";
import { Button, ButtonColorScheme } from "../Button/Button";
import { getMessageWhenAllEstatesRejected } from "./getMessageWhenAllEstatesRejected";
import { useStyles } from "./styles";
import { tEstate, tEstateProps, tEstatesProps } from "./types";


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
    return (gameOptions?.[dataKey] as tOption)?.actions?.[0]?.payload?.permits;
}
const getRejectionReason = (gameOptions: tJournalistState,dataKey: tDataKey) => {
return (gameOptions?.[dataKey] as tRejection)?.reason;
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
            useEffect(() => {console.log('Permits', permits)}, [permits])
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
                                action={()=> setSelectedCountryName(countryName)}
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
                        { !!permits ?? <PossibleTransactions permits={permits}/>}
                        { !!rejectionReason ?? <div>{rejectionReason}</div>}
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

    const Transaction = ({permit} : tObject<any>) => {
        const classes = useStyles();
        const [nrOfPurcahsedBuildingsKey, options] = permit;
        if (nrOfPurcahsedBuildingsKey === 'hotelReason') {
            return <div className={classes.hotelReason}>{options}</div>
        }
        return (
            <div className={classes.possibleTransactions}>
                {
                    options.map((option: any) => {
                        const {locationOne, locationTwo, cost} = option;
                        const key = `${locationOne}_${locationTwo}_${cost}`;
                        const message = getValidHousesTransactionText(option);
                        return (
                            <div className={classes.transaction} key={key}>{message}</div>
                        )
                    })
                }
            </div>
        )
    }

    const PossibleTransactions = ({permits}: { permits: any[]}) => {
        const classes = useStyles();
        return (
            <div className={classes.permits}>
                {
                    permits.map((permit: any) => (
                        <div key={JSON.stringify(permit)} className={classes.permit}>
                            <Transaction permit={permit}/>
                        </div>
                    ))
                }
            </div>
        )
    }

    // type tGetTrasaceion
