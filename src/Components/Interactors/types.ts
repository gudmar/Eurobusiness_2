import { ChangeEventHandler, FormEvent } from "react"

export type tInputChangeFunction<EventSource> = (e: FormEvent<EventSource>) => void;

export type tGenericInputTypes = "number" | "text"
export type tProbableInputTypes = number | string
export type tInputElementTypes = HTMLInputElement

export interface iInputProps<InputType extends tProbableInputTypes> {
    value: InputType,
    label: string,
    // onChange: ChangeEventHandler<ChangeEventSource>,
    onChange: ChangeEventHandler<tInputElementTypes>,
    id?: string,
    isRequired?: boolean,
}

export interface iTextInputProps {
    minLength?: number,
    maxLength?: number,
    size?: number,
}

export interface iTextInput extends iInputProps<'text'>, iTextInputProps {}
export interface iNumberInput extends iInputProps<'number'>, iNumberInputProps {}

export interface iNumberInputProps {    
    min?: number,
    max?: number,
    step?: number
}

export type tInputHOFProps = iTextInputProps | iNumberInputProps
