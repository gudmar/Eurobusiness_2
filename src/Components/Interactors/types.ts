import { ChangeEvent, ChangeEventHandler, FormEvent } from "react"
import { iCheckboxSpecificProps } from "./Checkbox/types";

export type tInputChangeFunction<EventSource> = (e: FormEvent<EventSource>) => void;

export type tGenericInputTypes = "number" | "text" | "checkbox"
export type tProbableInputTypes = number | string
export type tInputElementTypes = HTMLInputElement

export type tTextEventType = ChangeEvent<tInputElementTypes>;
export type tCheckEventType = ChangeEvent<tInputElementTypes>;

export interface iInputProps<InputType extends tProbableInputTypes> {
    value: InputType,
    label: string,
    // onChange: ChangeEventHandler<ChangeEventSource>,
    // onChange: ChangeEventHandler<tInputElementTypes> | ((val: any) => void) | ((e: tTextEventType) => void),
    onChange: (val: any) => void,
    id?: string,
    isRequired?: boolean,
    enableConditionFunction?: () => boolean,
    disabledTooltip?: string,
}

export interface iTextInputProps {
    minLength?: number,
    maxLength?: number,
    size?: number,
}

export interface iCheckboxInputProps {
    checked: boolean,
}

export interface iTextInput extends iInputProps<'text'>, iTextInputProps {}
export interface iNumberInput extends iInputProps<number>, iNumberInputProps {}

export interface iNumberInputProps {    
    min?: number,
    max?: number,
    step?: number, 
}

export type tInputHOFProps = iTextInputProps | iNumberInputProps | iCheckboxInputProps
