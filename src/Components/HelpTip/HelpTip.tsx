import { useState } from "react";
import { useStyles } from "./styles";

export type HelpTipProps = {
    message: string,
}

const HelpTip = ({message}: HelpTipProps) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const onMouseEnter = () => { setIsOpen(true) }
    const onMouseLeave = () => { setIsOpen(false) }

    return (
        <>
            <div 
                className={classes.logo}
                onMouseEnter = {onMouseEnter}
                onMouseLeave = {onMouseLeave}
            >?</div>
            { isOpen && <div className={classes.content}>
                {message}
            </div>}
        </>    
    )
}

export default HelpTip;
