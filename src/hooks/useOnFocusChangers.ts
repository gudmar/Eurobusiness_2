import { RefObject, useEffect } from "react";

const getUseOnEvent = (eventType: string) => <ItemType extends HTMLElement>(reference:RefObject<ItemType>, action: () => void) => {
    const current = reference.current;
    useEffect(() => {
        if (current) {
            current.addEventListener(eventType, action);
        }
        return () => {
            if (current) {
                current.removeEventListener(eventType, action)
            }
        }
    }, [current, action]);
}

export const useOnBlur = getUseOnEvent("blur");

export const useOnFocus = getUseOnEvent("focus")
