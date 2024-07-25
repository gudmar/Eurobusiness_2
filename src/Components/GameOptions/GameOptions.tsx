import { FC, useEffect, useState } from "react"
import { getTestableOptions } from "../../Logic/Journalist/getOptions";
import { tObject } from "../../Logic/types"
import { getGameState } from "../../Functions/PersistRetrieveGameState/utils";
import { Button } from "../Button/Button";
import { iSingleCountryProps, tEstate, tEstateOptions, tEstateProps, tEstatesProps } from "./types";
import { withDisplayOptionsAsCountries } from "./withDisplayOptionsFromCountry";
import { useStyles } from "./styles";
import { BuyBuildings } from "./BuyBuildings";
import { SellBuildings } from "./SellBuildings";
import { useImportCleaner, useIncludeCleaer } from "../../Contexts/CleaningContext/CleaningContext";
import { REFRESH_GAME_OPTIONS } from "../../Constants/cleaners";
import { Commander } from "../../Logic/Commander/Commander";
import PlegdeEstatesForm from "./PlegdeEstatesForm";
import UnplegdeEstatesForm from "./UnplegdeEstatesForm";
import { SellEstatesReasons } from "../../Logic/Journalist/utils/getSellEstatesOptions";
import SellEstatesForm, { SellEstatesAlternative } from "./SellEstatesFrom";
import { withAlternativeComponent } from "./withAlternativeComponent";

const useGameOptions = (playerName: string) => {
    const [options, setOptions] = useState<tObject<any>>({});
    const refreshGameState = () => {
        const currentGameState = getGameState()
        const options = { ...getTestableOptions(currentGameState, playerName), playerName};
        setOptions(options);
    }
    useEffect(refreshGameState, []);
    return {
        options, refreshGameState,
    }
}

const Estate = ({estate, isOpen}: tEstateProps) => {
    return (<div>{estate.name}</div>)
}

const Estates = ({estates}: tEstatesProps) => {
    return (
        <>
            {
                estates.map((estate) => <Estate estate = {estate} isOpen={true}/>)
            }
        </>
    )
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

const SingleCountry = ({country, countryName}: iSingleCountryProps) => {
    const classes: any = null
    const estatesProps = getEstatesPropsFromEntries(country)
    return (
        <div className={classes.country}>
            <div className={classes.countryName}>{countryName}</div>
            <Estates estates={estatesProps}/>
        </div>
    )
}

const getPlegdeCountries = (options: tObject<any>) => {
    const countries = options?.actions?.[0]?.payload;
    return countries;
}

const getUnplegdeCountries = getPlegdeCountries;

const getSellEstates = (options: tObject<any>) => {
    console.log('getSellEstates', options)
    const countries = options?.actions?.[0]?.payload;
    return countries;
}

const SellEstates = withDisplayOptionsAsCountries({
    EstateOptions: SellEstatesForm, countriesKey: 'sellEstates', getCountries: getSellEstates, DisplayAlternative: SellEstatesAlternative
});

const PlegdeEstates = withDisplayOptionsAsCountries({
    EstateOptions: PlegdeEstatesForm, countriesKey: 'plegdeEstates', getCountries: getPlegdeCountries
});

const UnplegdeEstates = withDisplayOptionsAsCountries({
        EstateOptions: UnplegdeEstatesForm, countriesKey: 'unplegdeEstates', getCountries: getUnplegdeCountries
    });


const withPresentReason = (Actions: FC<tObject<any>>) => ({reason, actions}: tObject<any>) => {
    if (reason) return (<>{reason}</>)
    return (
        <Actions actions={actions} />
    )
}

const EndTurnActions = ({actions}: tObject<any>) => {
    return (
        <div>
            <h3>Sure you want to end turn?</h3>
            <Button disabled={false} action={()=>{}} label={'Yes'} />
            <Button disabled={false} action={()=>{}} label={'No'} />
        </div>
    )
}

const EndTurnOptions = withPresentReason(EndTurnActions);

const AcceptModneyActions = ({actions}: tObject<any>) => {
    return (
        <div>
            <h3>You have to accept payment</h3>
            <Button disabled={false} action={() => {}} label={'Accept'}/>
        </div>
    )
}

const AcceptMoney = withPresentReason(AcceptModneyActions);

// const SellBuildings = withDisplayOptionsAsCountries(SellBuildingsForm, 'sellBuildings');

const optionKeyToButtonPropsMap = {
    buyBuildings: {
        buttonName: 'Buy buildings',
        component: BuyBuildings,
    },
    endTurn: {
        buttonName: 'End turn',
        component: EndTurnOptions,
    },
    getMoney: {
        buttonName: 'Get money',
        component: AcceptMoney,
    },
    sellBuildings: {
        buttonName: 'Sell buildings',
        component: SellBuildings,
        // getCountries: (a: tObject<any>)=> a,
    },
    plegdeEstates: {
        buttonName: 'Plegde estates',
        component: PlegdeEstates,
        getCountries: (options: tObject<any>) => {
            const countries = options?.actions?.[0]?.payload;
            return countries;
        }        
    },
    unplegdeEstates: {
        buttonName: 'Unplegde estates',
        component: UnplegdeEstates,
        getCountries: (options: tObject<any>) => {
            const countries = options?.actions?.[0]?.payload;
            return countries;
        }
    },
    sellEstates: {
        buttonName: 'Sell estates',
        component: SellEstates,
        getCountries: (options: tObject<any>) => {
            const countries = options?.actions?.[0]?.payload;
            return countries;
        }
    },
    specialCards: {
        buttonName: 'Special cards',
        component: () => null,
        getCountries: (a: tObject<any>)=> a,
    }
}

const useSelectOptions = (depsArray: any[]) => {
    // const [OptionsComponent, setOptionsComponent] = useState<FC<any>>(() => (props: any) => <></>);
    const [currentLabel, setCurrentLabel] = useState<string>('');
    const [selectedPropMapKey, setSelectedPropMapKey] = useState<string | null>(null);
    useEffect(() => {
        if (depsArray) {
            setSelectedPropMapKey(null);
            setCurrentLabel('')
        }
    }, depsArray ?? [])
    useEffect(() => {
        if (!!selectedPropMapKey) {
            const label = (optionKeyToButtonPropsMap as any)?.[selectedPropMapKey]?.buttonName;
            setCurrentLabel(label);
            setSelectedPropMapKey(selectedPropMapKey)
        }
}, [selectedPropMapKey ])
    const setPropMapKey = setSelectedPropMapKey
    const getOptionsComponent = () => {
        if (!selectedPropMapKey) return () => <></>;
        return (optionKeyToButtonPropsMap as any)?.[selectedPropMapKey]?.component;
    }
    return {
        OptionsComponent: getOptionsComponent(),
        currentLabel,
        setPropMapKey
    }
}

export const GameOptions = ({playerName}: any) => {
    const {options, refreshGameState} = useGameOptions(playerName);
    useIncludeCleaer(REFRESH_GAME_OPTIONS, refreshGameState);
    const { OptionsComponent, currentLabel, setPropMapKey } = useSelectOptions([playerName])
    const optionsEntries = Object.entries(options);
    const getOptionButton = ([key, value]: [string, any]) => {
        const label = (optionKeyToButtonPropsMap as any)?.[key]?.buttonName;
        const action = (optionKeyToButtonPropsMap as any)?.[key]?.component;
        return (
            <Button
                key={label}
                label={label}
                selected={currentLabel === label}
                action={() => setPropMapKey(key)}
            />
        )
    }
    return (
        // <RefreshOptions.Provider value = {refreshGameState}>
        <>
            { optionsEntries.map(getOptionButton) }
            <OptionsComponent gameOptions={options} />
        </>
        // </RefreshOptions.Provider>
    )
}
