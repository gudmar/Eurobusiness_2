import { FC, useCallback, useEffect } from "react";
import { tJournalistState } from "../../Logic/Journalist/types";
import { Button, ButtonColorScheme } from "../Button/Button";
import { getUseEstatesContent } from "./getUseEstatesContent";
import { useStyles } from "./styles";
import { tCountries, tEstateOptionsProps } from "./types";
import { usePossibleTransactions } from "./usePossibleTransactions";

const dataKey = 'sellBuildings'



const isOperationNotAllowedInAnyCountry = (countries: tCountries) => {
    const keys = Object.keys(countries);
    return keys.length === 1 && keys[0] === 'reason';
}

export const withDisplayOptionsAsCountries = (EstateOptions: FC<tEstateOptionsProps>, countriesKey: string) => {
    // const useEstateContent = getUseEstatesContent(EstateOptions, countries);

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
            useEffect(() => console.log('Countries', presentedCountryName), [presentedCountryName])
            useEffect(() => console.log('sell Permits', permits), [permits])
            if (isOperationNotAllowedInAnyCountry(countries)) {
                return  <>{countries.reason}</>
            }
            const actions = countries.actions;
            if (actions.length !== 1) throw new Error('Countries options may have only one action')
            const countryNames = Object.keys(countries?.actions?.[0].payload);
            const buttons = countryNames.map(
                (countryName: string) => {
                    const estateNames = Object.keys(countries?.actions?.[0].payload?.[countryName]);
                    const isUnfolded = countryName === presentedCountryName;
                    return (
                        <div className={classes?.countryModule}>
                            <Button label={countryName} action={()=> setPresentedContryName(countryName)}/>
                            { isUnfolded && <div className={`${classes?.estatesModule} ${ isUnfolded ? classes?.estatesOpened : classes?.estatesClosed }`}>
                                {
                                    estateNames.map(
                                        (estateName) => {
                                            return (
                                                <Button
                                                    colorVariant={ButtonColorScheme.secondary}
                                                    label={estateName}
                                                    action={() => setPresentedEstatesName(estateName)}
                                                    selected={presentedEstateName === estateName}
                                                />
                                            )
                                        }
                                    )
                                }
                            </div>}
                        </div>
                    )
                }
            )
            const estateContentProps = countries?.[presentedCountryName]?.[presentedEstateName]
            return (

                <div className={classes?.container}>
                <div className={classes?.countriesList}>{buttons}</div>
                <div className={classes?.actions}>
                    { !!permits && JSON.stringify(permits[selectedCountryName]) }
                    {/* { !!permits && <PossibleTransactions permits={permits[selectedCountryName]}/>} */}
                    { !!rejectionReason && <div>{rejectionReason}</div>}
                </div>
            </div>


                // <div className={classes?.container}>
                //     <div className={classes?.countriesList}>{buttons}</div>
                //     <div className={classes?.actions}>
                //         <EstateContent/>
                //     </div>
                // </div>
            )        
    }
}


