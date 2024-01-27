import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    tooltip: {
        position: 'absolute',
        display: 'none',
        cursor: 'default'
    },
    container: {
        display: 'flex',
        columnGap: '1rem',
        margin: '1rem',
        alignItems: 'center'
    },
    input: {
        '& input': {

            width: '1.2rem',
            height: '1.2rem',
            cursor: 'pointer'
        },
        '&:hover>div' : {
            display: 'inline-block'
        }
    },
    label: {
        padding: '0.5rem',
        '& label': {
            // padding: '0.5rem',
        }
    }
}));
