import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    selectFromList: {
        display: 'inline-block',
    },
    container: {
        display: 'flex',
        borderRadius: '5px',
        backgroundColor: 'white',
    },
    input: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        '& input': {
            padding: '0.5rem',
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
        // transform: 'scaleY(1)'
    },
    hidden: {
        // height: '300px',
        height: '0',
        transition: '0.3s',
        overflow: 'hidden',
        // transform: 'scaleY(0)'
    },
    listWrapper: {
        overflow: 'hidden',
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

}));
