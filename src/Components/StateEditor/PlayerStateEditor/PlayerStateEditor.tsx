import React, { ReactNode } from "react";
import { FC, useEffect } from "react";
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
import { StateEditorForm } from "../../StateEditorForm/StateEditorForm";
import { StateEditorEntry } from "../../StateEditorForm/StateEditorFormEntry";

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
        return [...allNotBorrowed, ...cardsBorrowedByPleyer]
    }
    const visibleSpecialCards = getVisibleCards(specialCards)
    
    return (
        <StateEditorForm
            headline={`player state editor for color : ${color}`}
            logAction={() => console.log(Players.players)}
            formName={`player state editor for color : ${color}`}
        >
                <StateEditorEntry title='Player name' currentValue={name}>
                    <TextInput
                        label={''}
                        value={name}
                        onChange={(e: tTextEventType) => {
                                setName(e.target.value)
                            }
                        }
                    />
                </StateEditorEntry>
                <StateEditorEntry title='Money' currentValue={name}>
                    <NumberInput
                        label={''}
                        value={money}
                        onChange={setMoney}
                        min={0}
                        max={MONEY_ALLTOGETHER}
                        step={1}
                    />
                </StateEditorEntry>
                <StateEditorEntry title='Special cards' currentValue={null}>
                    <MultiSelectFromList
                        items = {visibleSpecialCards}
                        key={color}
                        label={'Special cards'}
                        onClick={() => {}}
                        defaultValues={specialCards}
                        onSelected={(description: string) => Commander.borrowACard({description, playerColor: color})}
                        onUnselected={(description: string) => Commander.returnACard({description, playerColor: color})}
                    />
                </StateEditorEntry>
                <StateEditorEntry title='Field number' currentValue={fieldNr + 1}>
                    <NumberInput
                        label={''}
                        value={fieldNr + 1}
                        onChange={(nr:number) => setFieldNr(`${nr - 1}`)}
                        min={1}
                        max={40}
                        step={1}
                    />
                </StateEditorEntry>
                <StateEditorEntry title='Is in prison' currentValue={`${isInPrison}`}>
                    <Checkbox
                        label={''}
                        checked={isInPrison}
                        onChange={setIsInPrison}
                    />
                </StateEditorEntry>
                <StateEditorEntry title='Turns to wait' currentValue={nrTurnsToWait}>
                    <NumberInput
                        label={''}
                        value={nrTurnsToWait}
                        onChange={setNrTurnsToWait}
                        min={0}
                        max={4}
                        step={1}
                    />
                </StateEditorEntry>
                <StateEditorEntry title='Is game lost' currentValue={`${isGameLost}`}>
                    <Checkbox
                        label={''}
                        checked={isGameLost}
                        onChange={setIsGameLost}
                    />
                </StateEditorEntry>
       </StateEditorForm>
    )
}