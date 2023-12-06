import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
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
        }
    },
    label: {
        padding: '0.5rem',
        '& label': {
            // padding: '0.5rem',
        }
    }
}));
