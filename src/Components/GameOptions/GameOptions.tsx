import { FC, useEffect, useState } from "react"
import { getTestableOptions } from "../../Logic/Journalist/getOptions";
import { tObject } from "../../Logic/types"
import { getGameState } from "../../Functions/PersistRetrieveGameState/utils";
import { Button } from "../Button/Button";
import { tEstateProps, tGameOptions } from "./types";
import { withDisplayOptionsAsCountries } from "./withDisplayOptionsFromCountry";
import { BuyBuildings } from "./BuyBuildings";
import { SellBuildings } from "./SellBuildings";
import { useImportCleaner, useIncludeCleaer } from "../../Contexts/CleaningContext/CleaningContext";
import { CLOSE_ALL_GAME_OPTIONS, REFRESH_GAME_OPTIONS } from "../../Constants/cleaners";
import PlegdeEstatesForm from "./PlegdeEstatesForm";
import UnplegdeEstatesForm from "./UnplegdeEstatesForm";
import SellEstatesForm, { SellEstatesAlternative } from "./SellEstatesFrom";
import SellCards from "./SellCards";
import { Commander } from "../../Logic/Commander/Commander";
import { useStyles } from "./styles";

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
    console.log('Reason', reason, 'actions:', actions)
    const classes = useStyles();
    if (reason) return (<div className={classes.smallReason}>{reason}</div>)
    return (
        <Actions actions={actions} />
    )
}

const EndTurnActions = () => {
    const restartOptionsComponent = useImportCleaner(CLOSE_ALL_GAME_OPTIONS)
    return (
        <div>
            <h3>Sure you want to end turn?</h3>
            <Button disabled={false} action={()=>{Commander.endTurn()}} label={'Yes'} />
            <Button disabled={false} action={restartOptionsComponent} label={'No'} />
        </div>
    )
}

const EndTurnOptions = ({ gameOptions }: tGameOptions) => {
    console.log('args', gameOptions);
    return withPresentReason(EndTurnActions)(gameOptions.endTurn);
} 

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
        component: SellCards,
    }
}

const useSelectOptions = (depsArray: any[]) => {
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
        setPropMapKey,
        clearSelectedOption: () => { setCurrentLabel(''); setPropMapKey('') }
    }
}

export const GameOptions = ({playerName}: any) => {
    const {options, refreshGameState} = useGameOptions(playerName);
    useIncludeCleaer(REFRESH_GAME_OPTIONS, refreshGameState);
    
    const { OptionsComponent, currentLabel, setPropMapKey, clearSelectedOption } = useSelectOptions([playerName])
    useIncludeCleaer(CLOSE_ALL_GAME_OPTIONS, () => clearSelectedOption());
    const optionsEntries = Object.entries(options);
    const getOptionButton = ([key, value]: [string, any]) => {
        const label = (optionKeyToButtonPropsMap as any)?.[key]?.buttonName;
        if (!label) return null;
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
        <>
            { optionsEntries.map(getOptionButton) }
            <OptionsComponent gameOptions={options} />
        </>
    )
}
