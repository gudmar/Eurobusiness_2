import { createUseStyles } from "react-jss";


export const useStyles = createUseStyles((theme) => ({
    nav: {
        position: 'fixed',
        zIndex: '3',
        width: '90%',
        backgroundColor: '#ddd',
        top: '3rem',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        // height: '2.5rem'
    },
    container: {
        paddingTop: '2rem',
        position : 'relative',
        height: '100%',
    },
    edit: {
        // height: 'calc( 100% - 3rem )'
        height: '100%'
    }
}));
