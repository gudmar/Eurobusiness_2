import HelpTip from "../HelpTip/HelpTip";
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
    )

}

const GameControl = () => {
    const classes = useStyles();

    return (
        <div className={classes.housing}>
            <HelpTip message='Here usefull messages will appear'/>
            <Information />
        </div>
    )
}

export default GameControl;
