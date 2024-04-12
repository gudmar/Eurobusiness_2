import HelpTip from "../HelpTip/HelpTip";
import { StateEditorForm } from "../StateEditorForm/StateEditorForm";
import { StateEditorEntry } from "../StateEditorForm/StateEditorFormEntry";
import { useStyles } from "./styles";
import { useGameControlInfo } from "./useGameControlInfo";

const Information = () => {
    const {
        currentPlayerName,
        currentPlayerColor,
        turnPhase,
        playersOrder,
        money
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
                currentValue={playersOrder}
            >
                <></>
            </StateEditorEntry>
            <StateEditorEntry
                title='Trun phase'
                currentValue={turnPhase}
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
