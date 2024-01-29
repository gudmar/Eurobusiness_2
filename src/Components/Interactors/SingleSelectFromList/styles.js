import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    selectFromList: {
        display: 'inline-block',
        
    },
    tooltip: {
        position: 'absolute',
        visibility: 'hidden',
        transform: 'translateY(2rem)',
        backgroundColor: '#eeee44',
        padding: '2px'
    },
    container: {
        display: 'flex',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        margin: '0',
    },
    smallContainer: {
        padding: '0',
        maxWidth: '200px'
    },
    squareButton: {
        width: '1rem',
        height: '1rem',
        cursor: 'pointer'
    },
    squareButtonDisabled: {
        color: 'transparent',
        cursor: 'default'
    },
    input: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        '& input': {
            padding: '0.15rem',
            borderRadius: '0.5rem',
            border: 'none',
            outline: 'none',
            fontSize:'1.5rem',
            width: '100%',
            color: theme.inputForegroundColor,
            backgroundColor: theme.inputBackgroundColor,
            '&:disabled': {
                // border: 'solid #bbb thin',
            },    
        },
        border: 'none',
        // padding: '0.5rem',
        // borderRadius: '0.5rem',
        // // border: 'none',
        // border: 'solid thin black',
        // outline: 'none',
        // width: '240px'
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
        position :'absolute',
    },
    disabledFieldset: {
        backgroundColor: '#ccc'
    },
    disabledInput: {
        backgroundColor: '#eee',
        '& input':{
            backgroundColor: '#eee',
        }
    },
    hidden: {
        // height: '300px',
        height: '0',
        transition: '0.3s',
        overflow: 'hidden',
        position: 'absolute'
        // transform: 'scaleY(0)'
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
    listWrapper: {
        overflow: 'hidden',
        zIndex: '100',
        width: '21rem',
        maxHeight: '300px'
    },
    listWrapperSmall: {
        maxHeight: '200px'
    }
}));
