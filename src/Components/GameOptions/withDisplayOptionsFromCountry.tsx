import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { isDefined } from "../../Functions/isDefined";
import { tJournalistState } from "../../Logic/Journalist/types";
import { tObject } from "../../Logic/types";
import { Button } from "../Button/Button";
import { getMessageWhenAllEstatesRejected } from "./getMessageWhenAllEstatesRejected";
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

// const withSingleCountry = (EstateOptions: FC<tObject<any>>) => ({country, isOpen, countryName}: iSingleCountryProps) => {
//     const classes: any = null
//     const collapsedRejectionsMessage = getMessageWhenAllEstatesRejected(country);
//     const estatesProps = getEstatesPropsFromEntries(country)
//     return (
//         <div className={classes.country}>
//             <div className={classes.countryName}>{countryName}</div>
//             <div className={`${isOpen ? classes.oppened : classes.folded}`}>
//                 {
//                     collapsedRejectionsMessage === '' ? <Estates /> : <CollapsedRejection>{collapsedRejectionsMessage}</CollapsedRejection>
//                 }
//             </div>
//             <Estates estates={estatesProps}/>
//         </div>
//     )
// }

const withRejections = (ActionComponent: FC<tObject<any>>) => ({ country }: tObject<any>) => {
    const collapsedRejectionsMessage = getMessageWhenAllEstatesRejected(country);

}

const getUseEstatesContent = (ComponentToDislpayIn: FC<tEstateOptionsProps>, countries: tObject<any>) => {
    const useEstatesContent = () => {
        const [presentedCountryName, setPresentedContryName] = useState<string>('');
        const [presentedEstateName, setPresentedEstatesName] = useState<string>('');
        const estate = countries?.[presentedCountryName]?.[presentedEstateName];
        if (!isDefined(estate)) throw new Error(`getUseEstatesContent: Estate ${estate} is not defined`)
        const EstateContent = () => (
            <ComponentToDislpayIn estate={estate} />
        )
        return { EstateContent, setPresentedContryName, setPresentedEstatesName, presentedCountryName, presentedEstateName };
    }
    return useEstatesContent;
}

type tEstateOptionsProps = {estate: tObject<any>}

// export const withDisplayOptionsAsCountries = (EstateOptions: FC<tEstateOptionsProps>, countries: tObject<any>) => {
//     const useEstateContent = getUseEstatesContent(EstateOptions, countries);
//     return (props: tObject<any>) => {
//             const classes: any = null;
//             const countryNames = Object.keys(props.options);
//             useEffect(() => console.log('Countries', countries), [countries])
//             const {EstateContent, setPresentedContryName, setPresentedEstatesName, presentedCountryName, presentedEstateName} = useEstateContent();
//             const buttons = countryNames.map(
//                 (countryName: string) => {
//                     const estateNames = Object.keys(countries[countryName]);
//                     const isUnfolded = countryName === presentedCountryName;
//                     return (
//                         <div className={classes.countryModule}>
//                             <Button label={countryName} action={()=> setPresentedContryName(countryName)}/>
//                             <div className={`${classes.estatesModule} ${ isUnfolded ? classes.estatesOpened : classes.estatesClosed }`}>
//                                 {
//                                     estateNames.map(
//                                         (estateName) => {
//                                             return (
//                                                 <Button label={estateName} action={() => setPresentedEstatesName(estateName)} />
//                                             )
//                                         }
//                                     )
//                                 }
//                             </div>
//                         </div>

//                     )
//                 }
//             )
//             const estateContentProps = countries[presentedCountryName][presentedEstateName]
//             return (
//                 <div className={classes.container}>
//                     <div className={classes.countriesList}>{buttons}</div>
//                     <div className={classes.actions}>
//                         <EstateContent/>
//                     </div>
//                 </div>
//             )        
//     }
// }


export const withDisplayOptionsAsCountries = (EstateOptions: FC<tEstateOptionsProps>, countriesKey: string) => {
    // const useEstateContent = getUseEstatesContent(EstateOptions, countries);
    return (gameOptions: tJournalistState) => {
            const countries = (gameOptions as any)[countriesKey];
            const useEstateContent =  useCallback(getUseEstatesContent(EstateOptions, countries), []);
            const classes: any = null;
            const countryNames = Object.keys(countries);
            useEffect(() => console.log('Countries', countries), [countries])
            const {EstateContent, setPresentedContryName, setPresentedEstatesName, presentedCountryName, presentedEstateName} = useEstateContent();
            const buttons = countryNames.map(
                (countryName: string) => {
                    const estateNames = Object.keys(countries[countryName]);
                    const isUnfolded = countryName === presentedCountryName;
                    return (
                        <div className={classes.countryModule}>
                            <Button label={countryName} action={()=> setPresentedContryName(countryName)}/>
                            <div className={`${classes.estatesModule} ${ isUnfolded ? classes.estatesOpened : classes.estatesClosed }`}>
                                {
                                    estateNames.map(
                                        (estateName) => {
                                            return (
                                                <Button label={estateName} action={() => setPresentedEstatesName(estateName)} />
                                            )
                                        }
                                    )
                                }
                            </div>
                        </div>

                    )
                }
            )
            const estateContentProps = countries[presentedCountryName][presentedEstateName]
            return (
                <div className={classes.container}>
                    <div className={classes.countriesList}>{buttons}</div>
                    <div className={classes.actions}>
                        <EstateContent/>
                    </div>
                </div>
            )        
    }
}


