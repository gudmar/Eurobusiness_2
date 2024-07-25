import { useCallback, useEffect, useState } from "react";
import { tJournalistState } from "../../Logic/Journalist/types";
import { Button, ButtonColorScheme } from "../Button/Button";
import { getUseEstatesContent } from "./getUseEstatesContent";
import { useStyles } from "./styles";
import { tCountries, tWithDisplayOptionsAsCountries } from "./types";
import { usePossibleTransactions } from "./usePossibleTransactions";
import { withAlternativeComponent } from "./withAlternativeComponent";

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
        playerName,
        DisplayAlternative = () => null,
    } = props;
    const getAlternative = useCallback(withAlternativeComponent(DisplayAlternative), []);
    const country = countries?.[selectedCountryName];
    const classes = useStyles();
    const [presentedEstateName, setPresentedEstateName] = useState<string>('')
    if (!country) return <></>
    return (
        <div className={classes?.countryModule}>
                {
                    Object.entries(country).map(
                        ([estateName, estateValue]) => {
                            const alternativeRenderResult = getAlternative({estateName, estateValue})
                            if (alternativeRenderResult) return alternativeRenderResult
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

// when loading game to test unplegding and seleting sell estates and italy there is a 'reason' button, that should not be there

export const withDisplayOptionsAsCountries = ({ EstateOptions, countriesKey, getCountries, DisplayAlternative = () => null }: tWithDisplayOptionsAsCountries) => {

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
            return (

                <div className={classes?.container}>
                    <div className={classes?.countriesList}>{buttons}</div>
                    <div className={classes?.actions}>
                        <ActionsSectionContent
                            countries={getCountries(countries)}
                            selectedCountryName={presentedCountryName}
                            playerName={gameOptions.playerName}
                            PresentComponent={EstateOptions}
                            DisplayAlternative={DisplayAlternative}
                        />
                    </div>
                </div>
            )        
    }
}


