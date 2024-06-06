import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { isDefined } from "../../Functions/isDefined";
import { OptionTypes, tJournalistState } from "../../Logic/Journalist/types";
import { tObject } from "../../Logic/types";
import { Button, ButtonColorScheme } from "../Button/Button";
import { getMessageWhenAllEstatesRejected } from "./getMessageWhenAllEstatesRejected";
import { useStyles } from "./styles";
import { tEstate, tEstateProps, tEstatesProps } from "./types";

type iSingleCountryProps = {
    country: tObject<any>,
    countryName: string,
    isOpen: boolean,
}

const getEstatesPropsFromEntries = (country: tObject<any>) => {
    const entreis = Object.entries(country);
    const getSingleEstate = ([key, value]: [key: string, value: tEstate]) => {
        const {actions, reason} = value;
        return ({ name: key, actions, reason, })
    }
    const props = entreis.map(getSingleEstate);
    return props;
}

const Estate = ({estate, isOpen}: tEstateProps) => {
    const {name, reason, actions} = estate;
    return (<div>{estate.name}</div>)
}

const CollapsedRejection = ({children}: {children: ReactNode}) => {
    const classes: any = null;
    return (
        <div className={classes.message}>{children}</div>
    )
}

const Estates = ({ estates }: tEstatesProps) => {
    const NONE_ESTATE = -1;
    const [openedEstateIndex, setOpenedEstateIndex] = useState<number>(NONE_ESTATE)
    return (
        <>
            {
                estates.map(
                    (estate, index) => 
                    <Estate key={index} estate = {estate} isOpen={openedEstateIndex === index}/>
                )
            }
        </>
    )
}

const withRejections = (ActionComponent: FC<tObject<any>>) => ({ country }: tObject<any>) => {
    const collapsedRejectionsMessage = getMessageWhenAllEstatesRejected(country);

}

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

export const withDisplayOptionsAsCountries = (EstateOptions: FC<tEstateOptionsProps>, countriesKey: string) => {
    // const useEstateContent = getUseEstatesContent(EstateOptions, countries);
    return ({gameOptions}: {gameOptions: tJournalistState}) => {
            const countries = (gameOptions as any)[countriesKey];
            const useEstateContent =  useCallback(getUseEstatesContent(EstateOptions, countries), []);
            const classes = useStyles();
            
            
            const {
                EstateContent,
                setPresentedContryName,
                setPresentedEstatesName,
                presentedCountryName,
                presentedEstateName
            } = useEstateContent();
            useEffect(() => console.log('Countries', presentedCountryName), [presentedCountryName])
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
                        <EstateContent/>
                    </div>
                </div>
            )        
    }
}


