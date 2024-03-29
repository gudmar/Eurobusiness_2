import { useEffect } from "react";
import { MAX_PLAYER_NAME_LENGTH, MONEY_ALLTOGETHER } from "../../../Constants/constants";
import { useLanguage } from "../../../Contexts/CurrentLanguage/CurrentLanguage";
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
    const {languageKey} = useLanguage();
    useEffect(() => console.log('Section', section), [section])
    const getVisibleCards = (cardsBorrowedByPleyer: string[]) => {
        // const allNotBorrowed = Object.values(ChanceCardHolder.getNotBorrowedCardsDescriptions(languageKey)).flat() as string[];
        const allNotBorrowed = ChanceCardHolder.getNotBorrowedCardsDescriptions(languageKey);
        console.log(allNotBorrowed)
        console.log(cardsBorrowedByPleyer)
        return [...allNotBorrowed, ...cardsBorrowedByPleyer]
    }
    const visibleSpecialCards = getVisibleCards(specialCards)
    useEffect(() => console.log(specialCards), [specialCards])
    useEffect(() => console.log(visibleSpecialCards), [visibleSpecialCards])
    useEffect(() => console.log(color), [color])
    return (
        <StateEditorForm
            headline={`Player state editor for color : ${color}`}
            logAction={() => console.log(Players.players)}
            formName={`player state editor for color : ${color}`}
        >
                <StateEditorEntry title='Player name' currentValue={name}>
                    <TextInput
                        label={''}
                        value={name}
                        maxLength={MAX_PLAYER_NAME_LENGTH}
                        onChange={(e: tTextEventType) => {
                                setName(e.target.value)
                            }
                        }
                    />
                </StateEditorEntry>
                <StateEditorEntry title='Money' currentValue={money}>
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