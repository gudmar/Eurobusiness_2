import { Ref, RefObject, useEffect } from "react";

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
    callback: ()=>void,
    mouseEventName: tMouseEvent,
}

export type tUseWhenInsideOutsideArgs = {
    reference: RefObject<HTMLElement>,
    callback: ()=>void,
    mouseEventName: tMouseEvent,
}

const useOnEventLocation = ({mouseEventName, locationRelationToElement, reference, callback}: tUseOnEventLocaionArgs) => {
    useEffect(() => {
        const onEvent = (e:MouseEvent) => {
            
            const getCords = reference.current?.getBoundingClientRect;
            
            const {clientX, clientY} = e;
            if (!getCords) { throw new Error('No element under reference')}
            const {left, right, top, bottom} = getCords.call(reference.current);
            const isInsideX = clientX > left && clientX < right;
            const isInsideY = clientY > top && clientY < bottom;
            const isInside = isInsideX && isInsideY;
            // console.log({isInside, isInsideX, isInsideY, left, right, top, bottom, clientX, clientY})
            const result = locationRelationToElement === IN ? isInside : !isInside
            if (result) callback();
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
