import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    screen: theme => ({
    }),
    'headline': {
        textAlign: 'center',
    },
    savedGames: theme => ({
        height: '10rem',
        backgroundColor: theme.inputBackgroundColor,
        color: theme.inputForgroundColor,
        margin: '0 1rem 0 1rem',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    }),
    savedGameEntry: theme => ({
        width: '5rem',
        textOverflow: 'ellipsis'
    }),
    row: {
        display: 'flex',
    },
})

