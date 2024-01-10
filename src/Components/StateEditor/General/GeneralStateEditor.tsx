import { useEffect } from "react"
import { FIRST_FIELD_INDEX, LAST_FIELD_INDEX } from "../../../Constants/constants"
import { range } from "../../../Functions/createRange"
import { useGeneralSettingsForTests } from "../../../hooks/useEditGeneralSettingsForTests/useEditGeneralSettingsForTests"
import { DiceTestModeDecorator } from "../../../Logic/Dice/Dice"
import { TestModes } from "../../../Logic/Dice/types"
import { Checkbox } from "../../Interactors/Checkbox/Checkbox"
import { MultiSelectFromList } from "../../Interactors/MultiSelectFromList/MultiSelectFromList"
import { NumberInput } from "../../Interactors/NumberInput/NumberInput"
import { SingleSelectFromList } from "../../Interactors/SingleSelectFromList/SingleSelectFromList"
import { StateEditorForm } from "../../StateEditorForm/StateEditorForm"
import { StateEditorEntry } from "../../StateEditorForm/StateEditorFormEntry"


export const GeneralStateEditor = () => {
    const dice = new DiceTestModeDecorator();
    const {
        selectedFields,
        addFieldToVisit,
        removeFieldToVisit,
        log,
        testMode,
        setTestMode,
    } = useGeneralSettingsForTests()
    useEffect(() => console.log(selectedFields), [selectedFields])
    return (
        <StateEditorForm
            headline={'General settings for tests'}
            logAction={log}
            formName={'general settings for manual tests'}
        >
            <StateEditorEntry title='Test mode' currentValue={testMode}>
                <SingleSelectFromList 
                    id = {'test-mode-selection'}
                    label={'Test mode'}
                    items={Object.values(TestModes)}
                    onSelect={setTestMode as (val: string) => void}
                    defaultValue = {testMode}
                />
                {/* <Checkbox
                    label={''}
                    checked={false}
                    onChange={()=>{}}
                /> */}
            </StateEditorEntry>
            <StateEditorEntry title='List of fields to visit in "One of numbers" mode' currentValue={null}>
                <MultiSelectFromList
                        items = {range(FIRST_FIELD_INDEX, LAST_FIELD_INDEX).map(i=>`${i}`)}
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