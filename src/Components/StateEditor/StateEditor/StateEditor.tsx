import { FC, useState } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { BLUE, GREEN, RED, YELLOW } from "../../../Data/const";
import { usePlayersColors } from "../../../hooks/usePlayersColors"
import { ChanceCardsPresenter } from "../ChanceCardsPresenter/ChanceCardsPresenter";
import { StateEditorNavigation } from "../EditorSelectinMenu/SectionMenu"
import { EstatesStateEditor } from "../EstatesStateEditor/EstatesStateEditor";
import { GeneralStateEditor } from "../General/GeneralStateEditor";
import { PlayerStateEditor } from "../PlayerStateEditor/PlayerStateEditor";
import { useStyles } from "./style";

const BOARD = 'Board';
const GENERAL = 'General';
const RED_CARDS = 'Red cards';
const BLUE_CARDS = 'Blue cards';

type tSections = typeof YELLOW | typeof GREEN | typeof BLUE | typeof RED | typeof BOARD | typeof GENERAL;

interface iEditorProps {
    section: tSections,
}

interface iEditors {
    [key: string]: FC<iEditorProps>
}

const EDITORS: iEditors = {
    [YELLOW]: PlayerStateEditor,
    [GREEN]: PlayerStateEditor,
    [BLUE]: PlayerStateEditor,
    [RED]: PlayerStateEditor,
    [BOARD]: EstatesStateEditor,
    [GENERAL]: GeneralStateEditor,
    [RED_CARDS]: () => <ChanceCardsPresenter section={RED} />,
    [BLUE_CARDS]: () => <ChanceCardsPresenter section={BLUE} />,
}

export const PlayerEditor = () => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const playersColors = usePlayersColors();
    const sections = [GENERAL, ...playersColors, BOARD, RED_CARDS, BLUE_CARDS]
    const [activeSection, setActiveSection] = useState(sections[0]);
    const Editor = EDITORS[activeSection];
    return (
        <div className={classes.container}>
            <div className={classes.nav}>
                <StateEditorNavigation
                    sections={sections}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
            </div>
            <div className={classes.edit}>
                <Editor section={activeSection}/>
            </div>
        </div>
    )
}
