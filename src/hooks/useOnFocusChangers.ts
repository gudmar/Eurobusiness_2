import { RefObject, useEffect } from "react";

// const getUseOnEvent = (eventType: string) => <ItemType extends HTMLElement>(reference:RefObject<ItemType>, action: () => void) => {
const getUseOnEvent = (eventType: string, stopPropagation = false) => <ItemType extends HTMLElement>(reference: RefObject<ItemType> | null, action: () => void) => {
    const logAction = (e:any) => { action()}
    const onEvent = stopPropagation ? (e:any) => {e.stopPropagation(); action()}:logAction
    useEffect(()=> {
        if (reference?.current) {
            reference?.current.addEventListener(eventType, onEvent);
        }
        const current = reference?.current
        return () => {
            if (current) {
                current.removeEventListener(eventType, onEvent)
            }
        }
    }, [])
}

export const useOnBlur = getUseOnEvent("blur");
export const useOnBlurNotPropagate = getUseOnEvent('blur', true)

export const useOnFocus = getUseOnEvent("focus")

export const useOnFocusout = getUseOnEvent("focusout")

export const useOnFocusin = getUseOnEvent("focusin")
