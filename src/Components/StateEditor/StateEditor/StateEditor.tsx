import { FC, useState } from "react";
import { BLUE, GREEN, RED, YELLOW } from "../../../Data/const";
import { usePlayersColors } from "../../../hooks/usePlayersColors"
import { StateEditorNavigation } from "../EditorSelectinMenu/SectionMenu"
import { EstatesStateEditor } from "../EstatesStateEditor/EstatesStateEditor";
import { GeneralStateEditor } from "../General/GeneralStateEditor";
import { PlayerStateEditor } from "../PlayerStateEditor/PlayerStateEditor";

const BOARD = 'Board';
const GENERAL = 'General';

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
}

export const PlayerEditor = () => {
    const playersColors = usePlayersColors();
    const sections = [GENERAL, ...playersColors, BOARD]
    const [activeSection, setActiveSection] = useState(sections[0]);
    const Editor = EDITORS[activeSection];
    return (
        <>
            <StateEditorNavigation
                sections={sections}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
            <Editor section={activeSection}/>
        </>
    )
}