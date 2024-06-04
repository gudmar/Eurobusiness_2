import { FC, useEffect, useRef, useState } from "react"
import { getTestableOptions } from "../../Logic/Journalist/getOptions";
import { tObject } from "../../Logic/types"
import { getGameState } from "../../Functions/PersistRetrieveGameState/utils";
import { Button } from "../Button/Button";
import { iSingleCountryProps, tEstate, tEstateProps, tEstatesProps } from "./types";
import { withDisplayOptionsAsCountries } from "./withDisplayOptionsFromCountry";
import { tGameState } from "../../Functions/PersistRetrieveGameState/types";
import { tJournalistOutputArrayOrRejection, tJournalistState } from "../../Logic/Journalist/types";

const useGameOptions = (playerName: string) => {
    const [options, setOptions] = useState<tObject<any>>({});
    const refreshGameState = () => {
        const currentGameState = getGameState()
        const options = getTestableOptions(currentGameState, playerName);
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

// const DisplayOptionsAsCountries = (props: tObject<any>) => {
//     const countries = Object.keys(props.options);
//     return (
//         <>
//             {
//                 countries.map((key: string) => (<SingleCountry country={props.options[key]} countryName = {key}/>))
//             }
//         </>
//     )
// }
const BuyBuildingsForm = (estate: tObject<any>) => {
    return <>Buy buildings in ${estate.name}</>
}

const BuyBuildings = withDisplayOptionsAsCountries(BuyBuildingsForm, 'buyBuildings');

const SellBuildingsForm = (estate: tObject<any>) => {
    return <>Sell buildings in ${estate.name}</>
}

const SellBuildings = withDisplayOptionsAsCountries(SellBuildingsForm, 'sellBuildings');

const PlegdeEstatesForm = (estate: tObject<any>) => {
    return <>Plegde estates in ${estate.name}</>
}

const PlegdeEstates = withDisplayOptionsAsCountries(PlegdeEstatesForm, 'plegdeEstates');

const UnplegdeEstatesFrom = (estate: tObject<any>) => {
    return <>Unplegde estates in ${estate.name}</>
}

const UnplegdeEstates = withDisplayOptionsAsCountries(UnplegdeEstatesFrom, 'unplegdeEstates');


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
    },
    plegdeEstates: {
        buttonName: 'Plegde estates',
        component: PlegdeEstates
    },
    unplegdeEstates: {
        buttonName: 'Unplegde estates',
        component: UnplegdeEstates
    },
    sellEstates: {
        buttonName: 'Sell estates',
        component: () => null
    },
    specialCards: {
        buttonName: 'Special cards',
        component: () => null
    }
}

const useSelectOptions = () => {
    const [OptionsComponent, setOptionsComponent] = useState<FC<any>>(() => (props: any) => <></>);
    const [currentLabel, setCurrentLabel] = useState<string>('');
    const [selectedPropMapKey, setSelectedPropMapKey] = useState<string | null>(null);
    useEffect(() => {
        if (!!selectedPropMapKey) {
            const label = (optionKeyToButtonPropsMap as any)?.[selectedPropMapKey]?.buttonName;
            const selectdComponent = (optionKeyToButtonPropsMap as any)?.[selectedPropMapKey]?.component;
            setCurrentLabel(label);
            setSelectedPropMapKey(selectedPropMapKey)
            setOptionsComponent(selectdComponent);
        }
    }, [selectedPropMapKey, currentLabel, OptionsComponent])
    const setPropMapKey = setSelectedPropMapKey
    return {
        OptionsComponent, currentLabel, setPropMapKey
    }
}

export const GameOptions = ({playerName}: any) => {
    const {options, refreshGameState} = useGameOptions(playerName);
    const { OptionsComponent, currentLabel, setPropMapKey } = useSelectOptions()
    const optionsEntries = Object.entries(options);
    // const [OptionsComponent, setOptionsComponent] = useState(() => () => <></>);
    // useEffect(() => console.log('Component', OptionsComponent), [OptionsComponent])
    const getOptionButton = ([key, value]: [string, any]) => {
        const label = (optionKeyToButtonPropsMap as any)?.[key]?.buttonName;
        const action = (optionKeyToButtonPropsMap as any)?.[key]?.component;
        return (
            <Button
                key={label}
                label={label}
                disabled={currentLabel === label}
                action={() => setPropMapKey(key)}
            />
        )
    }
    return (
        <>
            { optionsEntries.map(getOptionButton) }
            <OptionsComponent gameOptions={options} />
        </>
    )
}
