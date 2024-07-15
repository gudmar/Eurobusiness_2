import { useEffect, useState } from "react";
import { tRef } from "../Types/types";

export const useHighlightOnHover = (hoverOverRef: tRef<HTMLDivElement>, classNameOnHover: string, classNameOnNotHover: string) => {
    const [onHoverClass, setOnHoverClass] = useState('');
    useEffect(() => {
        const setHover = () => {
            console.log('Setting class')
            setOnHoverClass(classNameOnHover);
        }
        const removeHover = () => setOnHoverClass(classNameOnNotHover);
        if (hoverOverRef.current) {
            hoverOverRef.current.addEventListener('mouseenter', setHover);
            hoverOverRef.current.addEventListener('mouseleave', removeHover);
            console.log('Adding event listeners')
        }
        return (() => {
            if (hoverOverRef.current) {
                hoverOverRef.current.removeEventListener('mouseenter', setHover);
                hoverOverRef.current.removeEventListener('mouseleave', removeHover);
                console.log('Removing listeners')
            }
        });
    }, [hoverOverRef.current])
    return onHoverClass;
}
