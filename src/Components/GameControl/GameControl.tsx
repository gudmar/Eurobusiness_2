import { useCallback, useEffect, useState } from "react";
import { Game } from "../../Logic/Game/Game";
import { Messages } from "../../Logic/Game/types";
import { getOptions } from "../../Logic/Journalist/getOptions";
import { Players } from "../../Logic/Players/Players";
import { GameOptions } from "../GameOptions/GameOptions";
import { getMessageWhenAllEstatesRejected } from "../GameOptions/getMessageWhenAllEstatesRejected";
import HelpTip from "../HelpTip/HelpTip";
import { Checkbox } from "../Interactors/Checkbox/Checkbox";
import { SingleSelectFromList } from "../Interactors/SingleSelectFromList/SingleSelectFromList";
import { StateEditorForm } from "../StateEditorForm/StateEditorForm";
import { StateEditorEntry } from "../StateEditorForm/StateEditorFormEntry";
import { useStyles } from "./styles";
import { useGameControlInfo } from "./useGameControlInfo";

const arrayToString = (arr: string[]) => {
    const result = arr.reduce((acc, item: string) => {
        if (acc === '') return item;
        return `${acc}, ${item}`
    }, '')
    return result;
}

const Information = () => {
    const {
        currentPlayerName,
        currentPlayerColor,
        turnPhase,
        playersOrder,
        money,
        currentPlayerField,
    } = useGameControlInfo();
    return (
        <>
            <button
                onClick={() => console.log('Options', getOptions())}
            >Log options</button>

        <StateEditorForm
            headline='Summary'
            formName='summary'
        >
            <StateEditorEntry
                title='Player name'
                currentValue={currentPlayerName}
            >
                <></>
            </StateEditorEntry>
            <StateEditorEntry
                title='Player color'
                currentValue={currentPlayerColor}
            >
                <></>
            </StateEditorEntry>
            <StateEditorEntry
                title='Money'
                currentValue={money}
            >
                <></>
            </StateEditorEntry>
            <StateEditorEntry
                title='Order'
                currentValue={arrayToString(playersOrder)}
            >
                <></>
            </StateEditorEntry>
            <StateEditorEntry
                title='Trun phase'
                currentValue={turnPhase}
            >
                <></>
            </StateEditorEntry>
            <StateEditorEntry
                title='Field name'
                currentValue={currentPlayerField?.name}
            >
                <></>
            </StateEditorEntry>

        </StateEditorForm>
        </>
    )

}

const useCurrentPlayerName = (id: string) => {
    const [currentPlayerName, setCurrentPlayerName] = useState('');
    useEffect(() => {
        const subscribtion = {
            callback: setCurrentPlayerName,
            id,
            messageType: Messages.currentPlayerChanged
        }
        if (Game.instance) {
            Game.instance.subscribe(subscribtion);
            setCurrentPlayerName(Game.instance.state.currentPlayer)
        }
        return () => {
            if (Game.instance) {
                Game.instance.unsubscribe(Messages.currentPlayerChanged, id)
            }
        }
    }, [Game.instance])
    return currentPlayerName;
}

const useSelectPlayerName = (id: string) => {
    const classes: any = null;
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const currentPlayerName = useCurrentPlayerName(id);
    const [selectedPlayerName, setSelectedPlayerName] = useState<string>(currentPlayerName);
    useEffect(() => {
            const names = Players.players.map((player) => player.name)
            setPlayerNames(names);
            if (selectedPlayerName === '') setSelectedPlayerName(currentPlayerName)
        },[Players.players, currentPlayerName]
    )    
    const PlayerSelection = useCallback(() => {
        return (
            <div className={classes?.verticalSelection}>
                <SingleSelectFromList
                    id={`${id}_single_select`}
                    label={'Select player'}
                    items={playerNames}
                    onSelect={setSelectedPlayerName}
                    defaultValue={selectedPlayerName}
                />
            </div>
        )
    }, [playerNames, selectedPlayerName])
    return {selectedPlayerName, PlayerSelection}
}

const useSwitch = (label: string, isInitiallyChecked: boolean) => {
    const [isChecked, setIsChecked] = useState<boolean>(isInitiallyChecked);
    const Switch = useCallback(() => {
        return (
            <Checkbox
                label={label}
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
            />
        )
    }, [isChecked])
    return {isChecked, Switch}
}

const GameControl = () => {
    const classes = useStyles();
    const {selectedPlayerName, PlayerSelection} = useSelectPlayerName('Select player name')
    const {isChecked: shouldDisplayOptions, Switch} = useSwitch('Toggle select player', false);
    return (
        <>
                    <div className={classes.housing}>
                        <div className={classes.horizontal}>
                            {!shouldDisplayOptions && <HelpTip message='Here usefull messages will appear'/>}
                            <Switch />
                        </div>
                        {
                            shouldDisplayOptions ? 
                                <>
                                    <PlayerSelection/>
                                    <GameOptions playerName={selectedPlayerName}/>
                                </>
                            :
                                <Information />
                        }
                    </div>
        </>
        
    )
}

export default GameControl;
