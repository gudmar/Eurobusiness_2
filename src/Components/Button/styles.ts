import {createUseStyles} from 'react-jss'
import { useThemesAPI } from '../../Contexts/ThemeContext';
import { CustomTheme } from '../../Types/themes';
import { ZIndexes } from "../../Constants/styleConstants";

const CENTER = {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
}

export const useStyles = createUseStyles((theme: CustomTheme) => ({
    housing: {
        ...CENTER,
        display: 'inline-block',
        height: '2rem',
        position: 'relative',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        // borderRadius: '5px',
        margin: '0.2rem',
        // overflow: 'hidden',
        '&:hover > div': {
            visibility: 'visible'
        }
    },
    button: {
        borderRadius: '0.4rem'
    },
    center: {
        ...CENTER,
        padding: '0.5rem',
    },
    light: {
        cursor: 'pointer',
        color: '#333333',
        transition: '0.3s',
        border: 'solid thin',
        borderColor: '#dddddd',
        '&:hover':{
            backgroundColor: '#eeeeee',
            color: '#222222',
            transition: '0.3s',
        },
        '&:active':{
            backgroundColor: '#cccccc',
            color: 'black',
            transition: '0.3s',
        }
    },
    alert: {
        cursor: 'pointer',
        backgroundColor: '#ff5555',
        color: 'white',
        transition: '0.3s',
        '&:hover':{
            backgroundColor: '#aa0000',
            transition: '0.3s',
        },
        '&:active':{
            backgroundColor: '#ffaaaa',
            color: 'black',
            transition: '0.3s',
        }
    },

    success: {
        cursor: 'pointer',
        backgroundColor: '#33aa33',
        color: 'white',
        transition: '0.3s',
        '&:hover':{
            backgroundColor: '#00aa00',
            transition: '0.3s',
        },
        '&:active':{
            backgroundColor: '#aaffaa',
            color: 'black',
            transition: '0.3s',
        }
    },

    info: {
        cursor: 'pointer',
        backgroundColor: '#5555ff',
        color: 'white',
        transition: '0.3s',
        '&:hover':{
            backgroundColor: '#0000aa',
            transition: '0.3s',
        },
        '&:active':{
            backgroundColor: '#aaaaff',
            color: 'black',
            transition: '0.3s',
        }
    },

    primary: {
        cursor: 'pointer',
        backgroundColor: '#2222ff',
        color: 'white',
        transition: '0.3s',
        '&:hover':{
            backgroundColor: '#0000bb',
            transition: '0.3s',
        },
        '&:active':{
            backgroundColor: '#9999ff',
            color: 'black',
            transition: '0.3s',
        }
    },

    secondary: {
        cursor: 'pointer',
        backgroundColor: '#7777ff',
        color: 'white',
        transition: '0.3s',
        '&:hover':{
            backgroundColor: '#4444bb',
            transition: '0.3s',
        },
        '&:active':{
            backgroundColor: '#aaaaff',
            color: 'black',
            transition: '0.3s',
        }
    },

    disabled: {
        backgroundColor: '#555555',
        color: '#777777',
        cursor: 'default'
    },
    disabledLight: {
        color: '#777777',
        cursor: 'default'
    },
    tooltip: {
        position: 'absolute',
        visibility: 'hidden',
        overflow: 'visible',
        fontWeight: 'normal',
        left: '3rem',
        backgroundColor: 'yellow',
        padding: '0.3rem',
        borderRadius: '0.2rem',
        zIndex: ZIndexes.tooltip,
        cursor: 'default'
    }



})
);

export const useClasses = () => {
    const {theme} = useThemesAPI();
    const classes: {[key:string]: string} = useStyles({theme});
    return classes
}