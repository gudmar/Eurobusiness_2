import { useState } from "react"
import { SelectFromList } from "../../Interactors/SelectFromList/SelectFromList"

export const GeneralStateEditor = () => {
    const [selected, setSelected] = useState('')
    return (
        <div>
            <strong>Selected</strong> 
            {selected}
            <br />
            <SelectFromList
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

            <SelectFromList
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

        </div>
    )
    
}