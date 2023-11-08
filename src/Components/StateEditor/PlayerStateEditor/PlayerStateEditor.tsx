import { usePlayersColors } from "../../../hooks/usePlayersColors"
import { StateEditorNavigation } from "../EditorSelectinMenu/SectionMenu"

export const PlayerStateEditor = () => {
    const playersColors = usePlayersColors();
    return (
        <>
            <StateEditorNavigation playersColors={playersColors}/>
        </>
    )
}