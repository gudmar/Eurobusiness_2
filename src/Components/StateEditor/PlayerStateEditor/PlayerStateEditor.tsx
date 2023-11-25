import { useEffect } from "react";
import { MONEY_ALLTOGETHER } from "../../../Constants/constants";
import { useEditPlayer } from "../../../hooks/useEditPlayer/useEditPlayer"
import { Checkbox } from "../../Interactors/Checkbox/Checkbox";
import { NumberInput } from "../../Interactors/NumberInput/NumberInput";
import { TextInput } from "../../Interactors/TextInput/TextInput";
import { tTextEventType } from "../../Interactors/types";

export const PlayerStateEditor = ({section}: any) => {
    const {
        name, setName, money, setMoney,
        specialCards, color, fieldNr,
        setFieldNr, isInPrison, nrTurnsToWait,
        setNrTurnsToWait, isGameLost, setIsInPrison,
    } = useEditPlayer(section);
    useEffect(() => console.log(section) , [section])
    console.log(MONEY_ALLTOGETHER)
    return (
        <>
            <div><h1>Edit player with color: {section}</h1></div>
            <div><b>Name</b>: {name}</div>
            <TextInput
                label={'Player name'}
                value={name}
                onChange={(e: tTextEventType) => {
                        console.log(e.target.value)
                        setName(e.target.value)
                    }
                }
            />
            <div><b>Money</b>: {money}</div>
            <NumberInput
                label={'set money'}
                value={money}
                onChange={setMoney}
                min={0}
                max={MONEY_ALLTOGETHER}
                step={1}
            />
            <div><b>Special cards:</b> {specialCards}</div>
            <div><b>fieldNr</b>: {fieldNr}</div>
            <NumberInput
                label={'Field number'}
                value={fieldNr}
                onChange={setFieldNr}
                min={1}
                max={40}
                step={1}
            />
            <div><b>isInPrison</b>: {typeof isInPrison }</div>
            <Checkbox
                label={'Is in prison'}
                checked={isInPrison}
                onChange={setIsInPrison}
            />
            <div><b>nrTurnsToWait</b>: {nrTurnsToWait}</div>
            <NumberInput
                label={'set turns to wait'}
                value={nrTurnsToWait}
                onChange={setNrTurnsToWait}
                min={0}
                max={4}
                step={1}
            />
            <div><b>isGameLost</b>: {isGameLost}</div>
        </>
    )
}