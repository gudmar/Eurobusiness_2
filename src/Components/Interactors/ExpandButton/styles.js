import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(() => ({
    expanded: {
        transform: 'rotateZ(180deg)',
        transitionDuration: '0.3s',
    },
    notExpanded: {
        transform: 'rotateZ(0deg)',
        transitionDuration: '0.3s',
    },
    icon: {
        width: '1.5rem',
        height: '1.5rem'
    }
}));
