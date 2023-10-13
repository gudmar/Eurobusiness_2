import {createUseStyles} from 'react-jss'
import { useThemesAPI } from '../../Contexts/ThemeContext';
import { CustomTheme } from '../../Types/themes'

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
        borderRadius: '5px',
        margin: '0.2rem',
        overflow: 'hidden'
    },
    center: {
        ...CENTER,
        padding: '0.5rem',
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
        backgroundColor: '#55ff55',
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

    disabled: {
        backgroundColor: '#555555',
        color: '#777777'
    }




})
);

export const useClasses = () => {
    const {theme} = useThemesAPI();
    const classes: {[key:string]: string} = useStyles({theme});
    return classes
}