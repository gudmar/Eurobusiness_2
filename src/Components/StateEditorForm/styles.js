import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    title:{
        fontFamily: 'courier',
        fontSize: '2.2rem',
        margin: '0rem'
    },
    center: {
        display: 'flex',
        justifyItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        padding: '2rem'
    },
    scrollArea: {
        // overflow: 'auto',
        // height: '100%',
        width: '100%'
    },
    entriesContainer: {
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
        borderSpacing: '0px',
        '& > tbody > tr:nth-child(odd)':{
            backgroundColor: '#ffffff88'
        }
    },
    contentRight: {
        textAlign: 'right',
        paddingRight: '1rem',
        borderRight: 'solid thin black',
        borderBottom: 'none',
        paddingLeft: '2rem'
    },
    bold: {
        fontWeight: 'bold',
    },
    currentValue: {
        fontStyle: 'italic',
        paddingRight: '1rem',
        paddingLeft: '1rem',
        // minWidth: '10rem',
        width: '12rem'
    },
    editor: {
        padding: '0.5rem',
        // paddingLeft: '3rem',
        paddingRight: '2rem'
    },
    logPanel: {
        display: 'flex',
    },
    logButton: {
        display: 'inline-block',
        padding: '0.3rem',
        borderRadius: '0.5rem',
        border: 'thin solid #554',
        fontSize: '1.1rem',
        margin: '0.3rem',
        marginBottom: '1rem',
        cursor: 'pointer',

        // transitionDuration: '0.1s',
        '&:hover': {
            backgroundColor: '#ffffff88',
            transitionDuration: '0.1s',
        },
        '&:active': {
            backgroundColor: '#33334488',
            color: '#aaa',
            border: 'thin solid #aa4',
            // transitionDuration: '0.1s'
        }
    }

    // screen: theme => ({
    //     backgroundColor:theme.canvasColor,
    //     color: theme.penColor,
    //     fontFamily: theme.fontStyles,
    //     width: '100vw',
    //     height: '100vh'
    // })
})

