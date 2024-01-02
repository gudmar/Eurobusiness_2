import { useEffect } from "react";
import { MONEY_ALLTOGETHER } from "../../../Constants/constants";
import { useEditPlayer } from "../../../hooks/useEditPlayer/useEditPlayer"
import { ChanceCardHolder } from "../../../Logic/Chance/ChanceCardHolder";
import { Commander } from "../../../Logic/Commander/Commander";
import { Players } from "../../../Logic/Players/Players";
import { Checkbox } from "../../Interactors/Checkbox/Checkbox";
import { MultiSelectFromList } from "../../Interactors/MultiSelectFromList/MultiSelectFromList";
import { NumberInput } from "../../Interactors/NumberInput/NumberInput";
import { TextInput } from "../../Interactors/TextInput/TextInput";
import { tTextEventType } from "../../Interactors/types";

export const PlayerStateEditor = ({section}: any) => {
    const {
        name, setName, money, setMoney,
        specialCards, color, fieldNr,
        setFieldNr, isInPrison, nrTurnsToWait,
        setNrTurnsToWait, isGameLost, setIsInPrison,
        setIsGameLost,
    } = useEditPlayer(section);
    const getVisibleCards = (cardsBorrowedByPleyer: string[]) => {
        const allNotBorrowed = Object.values(ChanceCardHolder.notBorrowedCards).flat() as string[];
        console.log(allNotBorrowed, cardsBorrowedByPleyer)
        return [...allNotBorrowed, ...cardsBorrowedByPleyer]
    }
    const visibleSpecialCards = getVisibleCards(specialCards)
    useEffect(() => console.log('Color in plyer', color), [])
    useEffect(() => console.log('Color in plyer', color), [color])
    useEffect(() => console.log(visibleSpecialCards), [visibleSpecialCards])
    
    return (
        <>
            <div><h1>Edit player with color: {section}</h1></div>
            <button onClick={() => console.log(Players.players)}>log</button>
            <div><b>Name</b>: {name}</div>
            <TextInput
                label={'Player name'}
                value={name}
                onChange={(e: tTextEventType) => {
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
            <MultiSelectFromList
                items = {visibleSpecialCards}
                key={color}
                label={'Special cards'}
                onClick={() => {}}
                defaultValues={specialCards}
                onSelected={(description: string) => Commander.borrowACard({description, playerColor: color})}
                onUnselected={(description: string) => Commander.returnACard({description, playerColor: color})}
            />
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
            <Checkbox
                label={'set is game lost'}
                checked={isGameLost}
                onChange={setIsGameLost}
            />

        </>
    )
}