import { useEditPlayer } from "../../../hooks/useEditPlayer/useEditPlayer"

export const PlayerStateEditor = ({section}: any) => {
    const {name, money, specialCards, color, fieldNr, isInPrison, nrTurnsToWait, isGameLost} = useEditPlayer(section);
    return (
        <>
            <div><h1>Edit player with color: {section}</h1></div>
            <div><b>Name</b>: {name}</div>
            <div><b>Money</b>: {money}</div>
            <div><b>Special cards:</b> {specialCards}</div>
            <div><b>fieldNr</b>: {fieldNr}</div>
            <div><b>isInPrison</b>: {isInPrison}</div>
            <div><b>nrTurnsToWait</b>: {nrTurnsToWait}</div>
            <div><b>isGameLost</b>: {isGameLost}</div>
        </>
    )
}