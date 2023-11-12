import { useEffect } from "react";
import { useEditPlayer } from "../../../hooks/useEditPlayer/useEditPlayer"
import { TextInput } from "../../Interactors/TextInput/TextInput";

export const PlayerStateEditor = ({section}: any) => {
    const {name, setName, money, specialCards, color, fieldNr, isInPrison, nrTurnsToWait, isGameLost} = useEditPlayer(section);
    useEffect(() => console.log(name) , [name])
    return (
        <>
            <div><h1>Edit player with color: {section}</h1></div>
            <div><b>Name</b>: {name}</div>
            <TextInput
                label={'Player name'}
                value={name}
                onChange={(e) => {
                        console.log(e.target.value)
                        setName(e.target.value)
                    }
                }
            />
            <div><b>Money</b>: {money}</div>
            <div><b>Special cards:</b> {specialCards}</div>
            <div><b>fieldNr</b>: {fieldNr}</div>
            <div><b>isInPrison</b>: {isInPrison}</div>
            <div><b>nrTurnsToWait</b>: {nrTurnsToWait}</div>
            <div><b>isGameLost</b>: {isGameLost}</div>
        </>
    )
}