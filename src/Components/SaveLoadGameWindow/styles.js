import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    screen: theme => ({
    }),
    'headline': {
        textAlign: 'center',
    },
    content: {
        display: 'flex',
        height: '70%'
    },
    savedGames: theme => ({
        height: '100%',
        backgroundColor: theme.inputBackgroundColor,
        color: theme.inputForgroundColor,
        margin: '0 1rem 0 1rem',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '30%',
        overflow: 'auto'
    }),
    savedGameEntry: theme => ({
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        width: '65%',
        borderRadius: '0.5rem',
        outline: 'none',
        border: 'none'
    },
    descriptionText: {
        backgroundColor: '#ffffff88',
        width: '100%',
        height: '100%',
        
    },
    savedGamesList: {
        width: '100%',
        paddingLeft: '0',
        marginTop: '0',
    },
    buttonGroup: {
        margin: '1rem',
        '& *': {
            margin: '0.2rem'
        }
    }
})

