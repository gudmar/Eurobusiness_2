import { useEffect } from "react"
import { range } from "../../../Functions/createRange"
import { useGeneralSettingsForTests } from "../../../hooks/useEditGeneralSettingsForTests/useEditGeneralSettingsForTests"
import { DiceTestModeDecorator } from "../../../Logic/Dice/Dice"
import { Checkbox } from "../../Interactors/Checkbox/Checkbox"
import { MultiSelectFromList } from "../../Interactors/MultiSelectFromList/MultiSelectFromList"
import { NumberInput } from "../../Interactors/NumberInput/NumberInput"
import { StateEditorForm } from "../../StateEditorForm/StateEditorForm"
import { StateEditorEntry } from "../../StateEditorForm/StateEditorFormEntry"


export const GeneralStateEditor = () => {
    const dice = new DiceTestModeDecorator();
    const {
        selectedFields,
        addFieldToVisit,
        removeFieldToVisit,
        log,
    } = useGeneralSettingsForTests()
    useEffect(() => console.log(selectedFields), [selectedFields])
    return (
        <StateEditorForm
            headline={'General settings for tests'}
            logAction={log}
            formName={'general settings for manual tests'}
        >
            <StateEditorEntry title='Mock dice' currentValue={'false'}>
                <Checkbox
                    label={''}
                    checked={false}
                    onChange={()=>{}}
                />
            </StateEditorEntry>
            <StateEditorEntry title='List of fields to visit in "One of numbers" mode' currentValue={null}>
                <MultiSelectFromList
                        items = {range(1,40).map(i=>`${i}`)}
                        label={'Visit fields (one of numbers)'}
                        onClick={() => {}}
                        defaultValues={selectedFields}
                        onSelected={addFieldToVisit}
                        onUnselected={removeFieldToVisit}
                    />
            </StateEditorEntry>
            <StateEditorEntry title='Number that will appear on dice in constant mode' currentValue={dice.nrThatDiceWillSelectInTestMode}>
                <NumberInput
                    label={''}
                    value={dice.nrThatDiceWillSelectInTestMode}
                    onChange={(val: number) => {dice.nrThatDiceWillSelectInTestMode = val}}
                    min={1}
                    max={6}
                    step={1}
                />

            </StateEditorEntry>
        </StateEditorForm>
   )
    
}