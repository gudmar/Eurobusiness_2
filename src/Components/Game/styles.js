import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    screen: theme => ({
        backgroundColor:theme.canvasColor,
        color: theme.penColor,
        fontFamily: theme.fontStyles,
        width: '100vw',
        height: '100vh', 
        display: 'flex'
    }),
    navigations: {
        display: 'flex',
        flexDirection: 'column'
    },
})

