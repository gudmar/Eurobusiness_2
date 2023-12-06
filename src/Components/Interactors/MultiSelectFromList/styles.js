import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    selectFromList: {
        display: 'inline-block',
    },
    container: {
        display: 'flex',
        borderRadius: '5px',
        backgroundColor: 'white',
        width: '300px'
    },
    input: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        '& input': {
            borderRadius: '0.5rem',
            border: 'none',
            outline: 'none',
            fontSize:'1.5rem',
            padding: '0',
            width: '100%'
        },
        border: 'none',
    },
    label: {
        padding: '0.5rem',
        '& label': {
            // padding: '0.5rem',
        }
    },

    visible: {
        maxHeight: '300px',
        transition: '0.3s',
        overflow: 'hidden',
    },
    hidden: {
        height: '0',
        transition: '0.3s',
        overflow: 'hidden',
    },
    listWrapper: {
        overflow: 'hidden',
        position: 'absolute',
    },
    scrollable: {
        maxHeight: '300px',
        overflow: 'auto'
    },
    itemWrapper: {
        
        padding: '0.3rem',
        transitionDelay: '0.1s',
        '&:hover': {
            cursor: 'pointer',
            transitionDelay: '0.1s',
        }
    },
    selected: {
        backgroundColor: theme.selectFromList_selectedItemBg,
        color: theme.selectedFromList_selectedItemFg,
        '&:hover': {
            cursor: 'defeult'
        }
    },
    notSelected: {
        backgroundColor: theme.selectFromList_notSelectedItemBg,
        color: theme.selectedFromList_notSelectedItemFg,
        '&:hover': {
            backgroundColor: theme.notSelectFromList_hoveredNotSelectedItemBg,
            color: theme.notSelectedFromList_hoveredNotSelectedItemFg,    
        }
    },

    tags: {
        minHeight: '3rem',
        maxHeight: '7rem',
        overflow: 'auto',
        width: '90%',
        border: 'solid thin blue',
        cursor: 'default'
    },
    tagWrapper: {
        position: 'relative',
        color: 'darkgray',
        backgroundColor: 'white',
        height: '1rem',
        borderRadius: '0.5rem',
        border: 'solid thin darkgray',
        padding: '0.2rem',
        display: 'flex'
    },
    tagLabel: {
        whiteSpace: 'nowrap',
        display: 'inline-block',
        width: '70%',
    },
    placeholderContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& span':{
            marginLeft:'1rem',
            color: 'lightgray',
            fontWeight: 'bolder',
            fontSize: '1.5rem',
            cursor: 'default'
        }
    }
}));
