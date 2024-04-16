import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useStyles } from './styles';

export interface ShutterProps {
    isVisible: boolean,
    message: ReactNode,
}

const Shutter = ({isVisible, message}: ShutterProps) => {
    const classes = useStyles();
    if (!isVisible) return null;
    return (
        <>
            {
                createPortal(
                    <div className={classes.container}>
                        <div className={classes.message}>{message}</div>
                    </div>,
                    document.body
                )
            }
        </>
    )
}

export default Shutter;
