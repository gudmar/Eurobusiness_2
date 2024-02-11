import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    screen: theme => ({
    }),
    'headline': {
        textAlign: 'center',
    },
    content: {
        display: 'flex',
    },
    savedGames: theme => ({
        height: '10rem',
        backgroundColor: theme.inputBackgroundColor,
        color: theme.inputForgroundColor,
        margin: '0 1rem 0 1rem',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '30%'
    }),
    savedGameEntry: theme => ({
        // display: 'inline-block',
        width: '10rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        listStyle: 'none',
        padding: '0.3rem',
        cursor: 'pointer',
        transitionDelay: '0.1s',
        transitionTimingFunction: 'ease-in',
        '&:hover': {
            transitionDelay: '0.1s',
            transitionTimingFunction: 'ease-in',
            backgroundColor: theme.notSelectFromList_hoveredNotSelectedItemBg,
            color: theme.notSelectFromList_hoveredNotSelectedItemFg,
            
        }
    }),
    chosenOne: theme => ({
        transitionDelay: '0.1s',
        transitionTimingFunction: 'ease-in',
        backgroundColor: theme.selectFromList_selectedItemBg,
        color: theme.selectedFromList_selectedItemFg,
        cursor: 'default',
    }),
    row: {
        display: 'flex',
    },
    description: {
        width: '65%',
        borderRadius: '0.5rem'
    },
    descriptionText: {
        backgroundColor: '#ffffff88',
        width: '100%',
        height: '100%',
        
    }
})

