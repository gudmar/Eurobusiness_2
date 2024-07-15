import { useEffect, useState } from "react";
import { tRef } from "../Types/types";

export const useHighlightOnHover = (hoverOverRef: tRef<HTMLDivElement>, classNameOnHover: string, classNameOnNotHover: string) => {
    const [onHoverClass, setOnHoverClass] = useState('');
    useEffect(() => {
        const setHover = () => {
            setOnHoverClass(classNameOnHover);
        }
        const removeHover = () => setOnHoverClass(classNameOnNotHover);
        if (hoverOverRef.current) {
            hoverOverRef.current.addEventListener('mouseenter', setHover);
            hoverOverRef.current.addEventListener('mouseleave', removeHover);
        }
        return (() => {
            if (hoverOverRef.current) {
                hoverOverRef.current.removeEventListener('mouseenter', setHover);
                hoverOverRef.current.removeEventListener('mouseleave', removeHover);
            }
        });
    }, [hoverOverRef.current])
    return onHoverClass;
}
