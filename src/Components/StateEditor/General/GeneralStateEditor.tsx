import { useState } from "react"
import { MultiSelectFromList } from "../../Interactors/MultiSelectFromList/MultiSelectFromList"
import { SingleSelectFromList } from "../../Interactors/SingleSelectFromList/SingleSelectFromList"

export const GeneralStateEditor = () => {
    const [selected, setSelected] = useState('')
    return (
        <div>
            <strong>Selected</strong> 
            {selected}
            <br />
            <SingleSelectFromList
                label={'Test'}
                items={[
                    'option 1',
                    'other 2',
                    'Potop',
                    'Ogniem i Mieczem',
                    'Pan Wołodyjowski',
                    'Sami swoi',
                    'Jak rozpętałem 2 wojnę światową',
                    'Poranek kojota',
                    'Chołopaki nie płaczą',
                    'Nie lubię poniedziałku',
                    'Miś',
                    'Vabank'
                ]}
                onClick = {setSelected}
            />

            <SingleSelectFromList
                label={'Test'}
                items={[
                    'option 1',
                    'other 2',
                    'Potop',
                    'Ogniem i Mieczem',
                    'Pan Wołodyjowski',
                    'Sami swoi',
                    'Jak rozpętałem 2 wojnę światową',
                    'Poranek kojota',
                    'Chołopaki nie płaczą',
                    'Nie lubię poniedziałku',
                    'Miś',
                    'Vabank'
                ]}
                onClick = {setSelected}
            />
            <MultiSelectFromList
                label={'Multi select'}
                items={[
                    'option 1',
                    'other 2',
                    'Potop',
                    'Ogniem i Mieczem',
                    'Pan Wołodyjowski',
                    'Sami swoi',
                    'Jak rozpętałem 2 wojnę światową',
                    'Poranek kojota',
                    'Chołopaki nie płaczą',
                    'Nie lubię poniedziałku',
                    'Miś',
                    'Vabank'
                ]}
                onClick = {setSelected}
            />

        </div>
    )
    
}