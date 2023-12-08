import { RefObject, useEffect } from "react";

const IN = 'IN';
const OUT = 'OUT';
const CLICK = 'click';
const DBCLICK = 'dbclick';
const MOUSEUP = 'mouseup';
const MOUSEDOWN = 'mousedown';
type tInOut = typeof IN | typeof OUT;
type tMouseEvent = typeof CLICK | typeof DBCLICK | typeof MOUSEDOWN | typeof MOUSEUP

type tUseOnEventLocaionArgs = {
    locationRelationToElement?: tInOut,
    reference: RefObject<HTMLElement>,
    callback: (e:MouseEvent)=>void,
    mouseEventName: tMouseEvent,
}

type tUseOnEventLocaionWithExceptionsArgs = {
    targetReference: RefObject<HTMLElement>,
    exceptionReferences: RefObject<HTMLElement>[],
    callback: (e:MouseEvent)=>void,
    mouseEventName: tMouseEvent,
}


export type tUseWhenInsideOutsideArgs = {
    reference: RefObject<HTMLElement>,
    callback: ((e:MouseEvent)=>void) | ((e?:MouseEvent)=>void),
    mouseEventName: tMouseEvent,
}

const isEventInsideElement = (e: MouseEvent, elementReference: RefObject<HTMLElement>) => {
    const {clientX, clientY} = e;
    try {
        const {left, right, top, bottom} = elementReference?.current?.getBoundingClientRect()!;
        const isInsideX = clientX > left && clientX < right;
        const isInsideY = clientY > top && clientY < bottom;
        const isInside = isInsideX && isInsideY;
        return isInside;    
    } catch (e) {
        return false
    }
}

const useOnEventLocation = ({mouseEventName, locationRelationToElement, reference, callback}: tUseOnEventLocaionArgs) => {
    useEffect(() => {
        const onEvent = (e:MouseEvent) => {
            const isInside = isEventInsideElement(e, reference);            
            const result = locationRelationToElement === IN ? isInside : !isInside
            if (result) callback(e);
        }
        document.addEventListener(mouseEventName, onEvent as EventListenerOrEventListenerObject);
        return () => document.removeEventListener(mouseEventName, onEvent as EventListenerOrEventListenerObject)        
    }, [])
}

export const useOnEventLocationWithExceptions = ({mouseEventName, targetReference, exceptionReferences, callback}: tUseOnEventLocaionWithExceptionsArgs) => {
    useEffect(() => {
        const onEvent = (e:MouseEvent) => {
            
            const isPointerInTargetElement = isEventInsideElement(e, targetReference);
            if (!isPointerInTargetElement) {
                const isPointerInOneOfExecptionalElements = exceptionReferences.some((reference: RefObject<HTMLElement>) => {
                    const result = isEventInsideElement(e, reference)
                    return result;
                })
                if (!isPointerInOneOfExecptionalElements) {
                    callback(e)
                }
            }
        }
        document.addEventListener(mouseEventName, onEvent as EventListenerOrEventListenerObject);
        return () => document.removeEventListener(mouseEventName, onEvent as EventListenerOrEventListenerObject)        
    }, [])
}


export const useInvoceIfEventInElement = (args: tUseWhenInsideOutsideArgs) => {
    useOnEventLocation({...args, locationRelationToElement: IN})
}

export const useInvoceIfEventOutsideElement = (args: tUseWhenInsideOutsideArgs) => {
    useOnEventLocation({...args, locationRelationToElement: OUT})
}
