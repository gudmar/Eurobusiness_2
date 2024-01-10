import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        borderRadius: '5px',
        backgroundColor: 'white',
        width: '400px'
    },
    input: {
        display: 'inline-flex',
        alignItems: 'center',
        alignContent: 'center',
        margin: '0.5rem',
        color: theme.inputForegroundColor,
        backgroundColor: theme.inputBackgroundColor,
        borderRadius: '1rem',
        height: '3rem',
        lineHeight: '2rem',
        padding: '0 0.75rem 0 0.75rem',
        '& input': {
            height: '2rem',
            borderRadius: '1.5rem',
            border: 'none',
            outline: 'none',
            fontSize:'1.5rem',
            padding: '0 0.75rem 0 0.75rem',
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
        backgroundColor: theme.selectFromList_notSelectedItemBg,
        color: theme.selectedFromList_notSelectedItemFg,
        borderBottomLeftRadius: '0.5rem',
        borderBottomRightRadius: '0.5rem',
        // height: 'calc(300px + 24px)',
        // height: '370px'
    },
    scrollable: {
        maxHeight: 'calc(300px - 4rem)',
        marginTop: '0',
        marginBottom: '0',
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
        margin: '-1rem 0 -1rem 0',
        '&:hover': {
            backgroundColor: theme.notSelectFromList_hoveredNotSelectedItemBg,
            color: theme.notSelectedFromList_hoveredNotSelectedItemFg,    
        }
    },

    tags: {
        minHeight: '3rem',
        maxHeight: '7rem',
        overflowX: 'hidden',
        overflowY: 'auto',
        width: '90%',
        // border: 'solid thin blue',
        backgroundColor: '#eee',
        cursor: 'default',
        padding: '0.3rem',
    },
    inlineBlock: {
        display: 'inline-block'
    },
    close: {
        margin: '0.25rem'
    },
    tagWrapper: {
        // position: 'relative',
        // display: 'block',
        // display: 'table-cell',
        display: 'inline-flex',
        margin: '0.1rem',
        justifyContent: 'space-between',
        // color: 'darkgray',
        textAlign: 'center',
        backgroundColor: 'white',
        height: '1.6rem',
        lineHeight: '1.6rem',
        borderRadius: '0.8rem',
        border: 'solid thin darkgray',
        padding: '0.1rem',
        paddingLeft: '0.3rem',
        // display: 'flex',
        whiteSpace: 'nowrap',
        '& div': {
            margin: 'none'
        }
    },
    tagLabel: {
        whiteSpace: 'nowrap',
        // display: 'inline-block',
        display: 'block',
        width: '70%',
        lineHeight: '1.3rem',
        fontSize: '1rem',
    },
    placeholderContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& span':{
            marginLeft:'1rem',
            // color: 'lightgray',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '1.5rem',
            cursor: 'default'
        }
    }
}));
