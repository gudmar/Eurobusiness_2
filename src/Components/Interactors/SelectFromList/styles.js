import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        columnGap: '1rem',
        margin: '1rem',
    },
    input: {
        '& input': {
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: 'none'
        }
    },
    label: {
        padding: '0.5rem',
        '& label': {
            // padding: '0.5rem',
        }
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
    }

}));
