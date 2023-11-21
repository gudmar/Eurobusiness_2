import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        columnGap: '1rem',
        margin: '1rem',
        width: '100%',
    },
}));
