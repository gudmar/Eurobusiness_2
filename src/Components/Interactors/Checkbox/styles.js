import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        columnGap: '1rem',
        margin: '1rem',
    },
    input: {
        '& input': {
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: 'none'
        }
    },
    label: {
        padding: '0.5rem',
        '& label': {
            // padding: '0.5rem',
        }
    }
}));
