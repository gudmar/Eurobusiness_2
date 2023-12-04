import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    squareButton: {
        width: '1rem',
        height: '1rem',
        cursor: 'pointer',
        backgroundColor: theme.inputBackgroundColor,
        color: theme.inputIconColor,
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        margin: '0.4rem'
    },
    squareButtonDisabled: {
        color: 'transparent',
        cursor: 'default'
    },
}));
