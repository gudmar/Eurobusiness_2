import React, { ReactNode } from "react"
import { Color } from "../../Functions/Color/Color";
import { useClasses } from "./styles";

export interface Props {
    children: ReactNode,
    mainColor: string,
    alt: string,
    tooltip: string
}

export const InfoToken = ({children, mainColor, alt, tooltip}: Props) => {
    const classes = useClasses();
    const color = new Color(mainColor);
    const bgColor = color.contrastColor;
    const bgColorInstance = new Color(bgColor);
    const outlineColor = bgColorInstance.contrastColor;
    return (
        <div 
            className = {classes.container} 
            aria-label={alt}
            style={{
                backgroundColor: bgColor,
            }}
        >
                <div
                    className={classes.frame}
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: bgColor,
                    }}
                >
                    {children}
                </div>
            <div className={classes.tooltip}>{tooltip}</div>
        </div>
    )
}
