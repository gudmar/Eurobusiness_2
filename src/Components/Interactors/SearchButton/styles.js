import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(() => ({
    icon: {
        width: '1.2rem',
        height: '1.2rem',
    },
    disabled: {
        backgroundColor: '#ffffffaa',
        transform: 'translateY(-110%)',
        position: 'absolute',
        display: 'inline-block',
        width: '1.2rem',
        height: '1.5rem'
    },
    enabled: {
        display: 'none',
        
    },
    shutterParent: {
        overflow: 'hidden'
    }
}));
