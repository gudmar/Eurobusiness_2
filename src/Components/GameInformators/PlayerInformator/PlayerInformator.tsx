import { tColors } from "../../../Data/types";
import { Color } from "../../../Functions/Color/Color";
import { usePlayerInfo } from "../../../hooks/useEditPlayer/useEditPlayer";
import { useGetPlayerEstatesNames } from "../../../hooks/useSubscribePlayerEstates";
import { Players } from "../../../Logic/Players/Players";
import { ReportDocument } from "../ReportDocument/ReportDocument";

export interface Props {
    name: string,
}

export const PlayerInformator = ({name}: Props) => {
    console.log('name', name)
    const color = Players.playerNameToPlayerColor(name) as unknown as tColors
    const colorInstance = new Color(color);
    const contrastColor = colorInstance.contrastColor;
    const {
        money, isGameLost,
        specialCards, fieldNr,
        isInPrison, nrTurnsToWait
    } = usePlayerInfo(color);
    const ownedEstates = useGetPlayerEstatesNames(name)
    const data = [
        {propName: 'Money',         propValue: money, ariaLabel: 'How much money player has'},
        {propName: 'Field name',    propValue: money, ariaLabel: 'What field player is on'},
        {propName: 'Special Cards', propValue: specialCards, ariaLabel: 'What special cards does player hold'},
        {propName: 'Turns to wait', propValue: nrTurnsToWait, ariaLabel: 'How many turns has player to wait if is in prison'},
        {propName: 'Owned estates', propValue: ownedEstates, ariaLabel: 'Estates owned by player'},
        {propName: 'Color', propValue: {color, contrastColor}, ariaRole: 'none'}
    ]
    return (
        <>
        <ReportDocument
            title={'Players data report'}
            subtitle={`For ${name}`}
            ariaLabel={`Data about player ${name}`}
            data={data}
        />
        </>
    )
}
