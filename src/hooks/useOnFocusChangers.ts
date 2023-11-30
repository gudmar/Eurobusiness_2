import { RefObject, useEffect } from "react";

// const getUseOnEvent = (eventType: string) => <ItemType extends HTMLElement>(reference:RefObject<ItemType>, action: () => void) => {
const getUseOnEvent = (eventType: string) => <ItemType extends HTMLElement>(reference: RefObject<ItemType> | null, action: () => void) => {
    const current = reference?.current;
    // const current = reference;
    useEffect(()=> console.log(reference?.current), [])
    useEffect(()=> {
        if (reference?.current) {
            reference?.current.addEventListener(eventType, action);
        }
        const current = reference?.current
        return () => {
            if (current) {
                current.removeEventListener(eventType, action)
            }
        }
    })
    useEffect(() => {
        if (reference?.current) {
            reference?.current.addEventListener(eventType, action);
        }
        const current = reference?.current
        return () => {
            if (current) {
                current.removeEventListener(eventType, action)
            }
        }
    }, [reference, action]);
}

export const useOnBlur = getUseOnEvent("blur");

export const useOnFocus = getUseOnEvent("focus")
