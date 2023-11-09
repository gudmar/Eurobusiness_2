import { createUseStyles } from "react-jss";

const PADDING_VERTICAL_TAB = '0.5rem';
const PADDING_HORIZONTAL_TAB = '1rem';
const TRAPEZE_HEIGHT = '1.5rem';

export const useStyles = createUseStyles((theme) => ({
    navigationWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        
    },
    
    tab: {
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '0',
        marginLeft: `-${parseInt(TRAPEZE_HEIGHT) * 0.75}rem`,
        marginRight: `-${parseInt(TRAPEZE_HEIGHT) * 0.75}rem`,
        '&:first-of-type': {
            marginLeft: '0rem',
        }
    },
    trapezoid: {
        // position: 'relative',
        width: '100%',
        borderStyle: 'solid',
        borderLeftWidth: TRAPEZE_HEIGHT,
        borderRightWidth: TRAPEZE_HEIGHT,
        borderBottomWidth: TRAPEZE_HEIGHT,
        borderColor: 'transparent',
        borderTopWidth: '0',
        height: '0',
        cursor: 'pointer'
    },
    activeTab: {
        borderBottomColor: 'white',
        color: 'black',
        cursor: 'default',
        zIndex: '5',
    },
    frontTab: {
        zIndex: '5',
    },
    bluredTab: {
        borderBottomColor: '#777',
        color: '#bbb'
    }  
}))
