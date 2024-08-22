import { FC, useCallback, useEffect, useState } from "react"
import { getTestableOptions } from "../../Logic/Journalist/getOptions";
import { tObject } from "../../Logic/types"
import { getGameState } from "../../Functions/PersistRetrieveGameState/utils";
import { Button, ButtonColorScheme } from "../Button/Button";
import { tOptionsComponentArgs } from "./types";
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
import { OptionTypes } from "../../Logic/Journalist/types";
import { tHandleBankOwnedEstateActions, tRefreshFunction } from "../../Logic/Commander/types";
import { Players } from "../../Logic/Players/Players";
import { BoardCaretaker } from "../../Logic/BoardCaretaker";
import { tEstate } from "../../Data/types";
import { withPresentReason } from "./withPresentReason";

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

const EndTurnActions = () => {
    const restartOptionsComponent = useImportCleaner(CLOSE_ALL_GAME_OPTIONS)
    return (
        <div>
            <h3>Sure you want to end turn?</h3>
            <Button colorVariant={ButtonColorScheme.light} disabled={false} action={()=>{Commander.endTurn()}} label={'Yes'} />
            <Button colorVariant={ButtonColorScheme.light} disabled={false} action={restartOptionsComponent} label={'No'} />
        </div>
    )
}

const EndTurnOptions = ({ gameOptions, refreshFunction }: tOptionsComponentArgs) => {
    return withPresentReason(EndTurnActions)(gameOptions.endTurn);
} 

const AcceptModneyActions = ({gameOptions, refreshFunction}: tObject<any>) => {
    console.log(gameOptions)
    return (
        <div>
            <h3>You have to accept payment</h3>
            <Button colorVariant={ButtonColorScheme.light} disabled={false} action={() => {}} label={'Accept'}/>
        </div>
    )
}

const getMoveAction = async (refreshFunction: tRefreshFunction) => {
    await Commander.moveCurrentPlayer();
    refreshFunction();
};

const acceptStartPayment = (gameOptions: tObject<any>, refreshFunction: tRefreshFunction) => {
    try {
        const { type, payload } = gameOptions?.getMoney?.passingStart?.actions[0]
        if (type === OptionTypes.GetMoney) {
            Commander.getPassStartMoney(gameOptions.playerName, payload, refreshFunction);
        }
    } catch(e) {}
}

const Move = ({ gameOptions, refreshFunction }: tOptionsComponentArgs) => {
    const { move } = gameOptions;
    const { reason, actions } = move;
    if (reason) return <>{reason}</>
    return (
        <div>
            {
                actions.map(({type}: {type: string}) => 
                    <Button label={type} colorVariant={ButtonColorScheme.light} action={() => getMoveAction(refreshFunction)}/>
                )
            }
        </div>
    )
}

type tBankOwnedEstatesActionsKeys = OptionTypes.AuctionEstate | OptionTypes.BuyEstate;

const bankOwnedEstatesActions = ({
    [OptionTypes.AuctionEstate]: async (args: tHandleBankOwnedEstateActions) => {},
    [OptionTypes.BuyEstate]: (args: tHandleBankOwnedEstateActions) => {
        Commander.buyEstateForStandardPrice(args);
        args.refreshFunction();
    }
})

const HandleBankOwnedEstate = ({ gameOptions, refreshFunction }: tOptionsComponentArgs) => {
    console.log('Game options in HnaldeBankOwnedEstate', gameOptions)
    const { handleStayOnBankOwnedEstate } = gameOptions;
    if (!handleStayOnBankOwnedEstate) return null;
    const { actions, reason } = handleStayOnBankOwnedEstate;
    if (reason) return <>{reason}</>
    return (
        <div>
            {
                actions.map(({type}: {type: tBankOwnedEstatesActionsKeys}) => 
                    <Button
                        colorVariant={ButtonColorScheme.light}
                        label={type}
                        action={
                            () => {
                                const currentPlayerField = Players.instance.currentPlayer.fieldNr;
                                const estateName = BoardCaretaker.getFieldByIndex(currentPlayerField)!.name as unknown as tEstate;
                                if (estateName){
                                    bankOwnedEstatesActions[type]({playerName: gameOptions.playerName, estateName, refreshFunction})
                                }
                            }
                        }/>
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
        // buttonName: 'Get money',
        noButtonAction: acceptStartPayment,
        // component: AcceptMoney,
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
    handleStayOnBankOwnedEstate: {
        buttonName: 'Buy/auction estate',
        component: HandleBankOwnedEstate,
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
    useEffect(() => console.log('Options changed', options), [options])
    const optionsEntries = Object.entries(options);
    const getOptionButton = ([key, value]: [string, any]) => {
        const label = (optionKeyToButtonPropsMap as any)?.[key]?.buttonName;
        const noButtonAction = (optionKeyToButtonPropsMap as any)?.[key]?.noButtonAction;
        if (noButtonAction) {
            noButtonAction(options, refreshGameState);
        }
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
            <hr/>
            <OptionsComponent gameOptions={options} refreshFunction={refreshGameState}/>
        </>
    )
}
