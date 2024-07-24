import { FC, useCallback, useEffect, useState } from "react";
import { tJournalistState } from "../../Logic/Journalist/types";
import { tObject } from "../../Logic/types";
import { Button, ButtonColorScheme } from "../Button/Button";
import { getUseEstatesContent } from "./getUseEstatesContent";
import { useStyles } from "./styles";
import { tCountries, tEstateOptionsProps, tGetCountries, tWithDisplayOptionsAsCountries } from "./types";
import { usePossibleTransactions } from "./usePossibleTransactions";

const dataKey = 'sellBuildings'



const isOperationNotAllowedInAnyCountry = (countries: tCountries) => {
    const keys = Object.keys(countries);
    return keys.length === 1 && keys[0] === 'reason';
}

const ActionsSectionContent = (props: any) => {
    const {
        countries,
        selectedCountryName,
        PresentComponent,
        playerName
    } = props;
    console.log('Selected contry,', selectedCountryName, countries)
    const country = countries?.[selectedCountryName];
    const classes = useStyles();
    const [presentedEstateName, setPresentedEstateName] = useState<string>('')
    useEffect(() => console.log('Selected country', country), [country])
    if (!country) return <></>
    return (
        <div className={classes?.countryModule}>
                {
                    Object.entries(country).map(
                        ([estateName, estateValue]) => {
                            return (
                                <>
                                    <Button
                                        colorVariant={ButtonColorScheme.secondary}
                                        label={estateName}
                                        action={() => {
                                            setPresentedEstateName(estateName);
                                        }}
                                        selected={presentedEstateName === estateName}
                                    />
                                    {
                                        presentedEstateName === estateName && 
                                        <PresentComponent
                                            estateName={estateName}
                                            estate={country?.[presentedEstateName]}
                                            playerName={playerName}
                                        />
                                    }
                                </>
                            )
                        }
                    )
                }
        </div>
    )
}


export const withDisplayOptionsAsCountries = ({ EstateOptions, countriesKey, getCountries }: tWithDisplayOptionsAsCountries) => {

    return ({gameOptions}: {gameOptions: tJournalistState}) => {
        console.log('withDisplayOptions...', gameOptions)
            const countries = (gameOptions as any)[countriesKey];
            const useEstateContent =  useCallback(getUseEstatesContent(EstateOptions, countries), []);
            const classes = useStyles();

            const {
                permits,
                setSelectedCountryName, 
                selectedCountryName, 
                rejectionReason
            } = usePossibleTransactions(gameOptions, dataKey);

            const {
                EstateContent,
                setPresentedContryName,
                setPresentedEstatesName,
                presentedCountryName,
                presentedEstateName
            } = useEstateContent();
            const [optionIndex, setOptionIndex] = useState<number>(-1)

            useEffect(() => console.log('Countries', presentedCountryName), [presentedCountryName])
            useEffect(() => console.log('sell Permits', permits), [permits])
            if (isOperationNotAllowedInAnyCountry(countries)) {
                return  <>{countries.reason}</>
            }
            const actions = countries.actions;
            if (actions.length !== 1) throw new Error('Countries options may have only one action')
            const countryNames = Object.keys(countries?.actions?.[0].payload);
            const buttons = countryNames.map(
                (countryName: string, index) => {
                    return (
                        <div className={classes?.countryModule}>
                            <Button label={countryName} 
                                action={()=> {
                                  setPresentedContryName(countryName)
                                }}
                                selected={presentedCountryName === countryName}
                            />
                        </div>
                    )
                }
            )
            const estateContentProps = countries?.[presentedCountryName]?.[presentedEstateName]
            return (

                <div className={classes?.container}>
                    <div className={classes?.countriesList}>{buttons}</div>
                    <div className={classes?.actions}>
                        <ActionsSectionContent
                            countries={getCountries(countries)}
                            selectedCountryName={presentedCountryName}
                            playerName={gameOptions.playerName}
                            PresentComponent={EstateOptions}
                        />
                    </div>
                </div>
            )        
    }
}


