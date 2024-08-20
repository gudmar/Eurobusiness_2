import { FC, useCallback, useEffect, useState } from "react"
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
import { Game } from "../../Logic/Game/Game";
import { Messages as GameMessages } from "../../Logic/Game/types";

const ID = 'use game options';

const useGameOptions = (playerName: string) => {
    const [options, setOptions] = useState<tObject<any>>({});
    const refreshGameState = useCallback(() => {
        console.log('%cREFRESING GAME STATE', 'background-color: black; color: yellow; padding: 3px' )
        const currentGameState = getGameState()
        const options = { ...getTestableOptions(currentGameState, playerName), playerName};
        setOptions(options);
    }, [playerName]);
    useEffect(
        () => {
            const refreshGameState = () => {
                console.log('%cREFRESING GAME STATE', 'background-color: black; color: yellow; padding: 3px' )
                const currentGameState = getGameState()
                const options = { ...getTestableOptions(currentGameState, playerName), playerName};
                setOptions(options);
            }

            const gameSubscribtion = {
                callback: refreshGameState,
                id: ID,
                messageType: GameMessages.stateChanged,
            }
            Game.instance.subscribeWithInformation(gameSubscribtion)
            return () => {
                Game.instance.unsubscribe(GameMessages.stateChanged, ID)
            }
        },
    [playerName]);
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

const getMoveAction = (type: string) => {Commander.moveCurrentPlayer()};

const Move = ({ gameOptions }: tObject<any>) => {
    const { move } = gameOptions;
    const { reason, actions } = move;
    if (reason) return <>{reason}</>
    return (
        <div>
            {
                actions.map(({type}: {type: string}) => 
                    <Button label={type} action={() => getMoveAction(type)}/>
                )
            }
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
    move: {
        buttonName: 'Move',
        component: Move,
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

// Implementing Game motorics
// Last done: implementation of playerThatInterrupts => when auction ongoing, there will be one players turn, but other player will have possibility to do some actions,
// Because of this, and the fact that playersSnapshot was changed from array having players to object having currentPlayer, playerThatInterrupts and playersList, 
// there are types mismatch that need to be taken care of.
// Probably there is some initial state, that is undefined (has players instance undefined), and because of this shit happens

export const GameOptions = ({playerName}: any) => {
    const {options, refreshGameState} = useGameOptions(playerName);
    useIncludeCleaer(REFRESH_GAME_OPTIONS, refreshGameState);
    useEffect(() => console.log('In GameOptions, playerName', playerName), [playerName])
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
            <button onClick={() => console.log('player name', playerName)}>Log playerName</button>
            { optionsEntries.map(getOptionButton) }
            <OptionsComponent gameOptions={options} />
        </>
    )
}
