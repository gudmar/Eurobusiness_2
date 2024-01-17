import {createUseStyles} from 'react-jss'
import { ZIndexes } from '../../Constants/styleConstants';
import { useThemesAPI } from '../../Contexts/ThemeContext';
import { CustomTheme } from '../../Types/themes'

const CENTER = {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
}

export const useStyles = createUseStyles((theme: CustomTheme) => ({
    tv: {
        ...CENTER,
        width: '100vw',
        height: '100vh',
        zIndex: ZIndexes.modal,
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: theme.modalTvBackground,
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
    },
    contentWrapper: {
        backgroundColor: theme.modalWrapperBackground,
        color: theme.modalWrapperColor,
        borderRadius: '5px',
        width: '90vw',
        height: '90vh',
        overflow: 'auto'
    },
    closeButton: {
        ...CENTER,
        position: 'absolute',
        right: '1rem',
        top: '1rem',
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        display: 'flex',
        fontSize: '1.5rem',
        backgroundColor: '#555',
        color: 'white',
        fontStyle: 'bolder',
        transition: '0.3s',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#333',
            transition: '0.3s',
        },
        '&:active': {
            backgroundColor: '#ccc',
            color: '#333',
            transition: '0.3s',
        }
    }

})
);

export const useClasses = () => {
    const {theme} = useThemesAPI();
    const classes: {[key:string]: string} = useStyles({theme});
    return classes
}