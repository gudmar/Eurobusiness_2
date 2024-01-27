import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    tooltip: {
        position: 'absolute',
        display: 'none'
    },
    container: {
        display: 'flex',
        columnGap: '1rem',
        margin: '1rem',
    },
    input: {
        '& input': {
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            '&:disabled': {
                border: 'solid #bbb thin',
            },    
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
    },
}));
