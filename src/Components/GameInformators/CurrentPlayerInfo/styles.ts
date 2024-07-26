import {createUseStyles} from 'react-jss'
import { useThemesAPI } from '../../../Contexts/ThemeContext';
import { CustomTheme } from '../../../Types/themes';

export const useStyles = createUseStyles((theme: CustomTheme) => ({
        container: {
            display: 'flex',
        },
        title: {
            marginRight: '0.5rem'
        },
        color: {
            width: '1rem',
            height: '1rem',
            border: 'gray solid thin',
            borderRadius: '50%',
            marginRight: '0.5rem'
        }
    })
);

export const useClasses = () => {
    const {theme} = useThemesAPI();
    const classes: {[key:string]: any} = useStyles({theme});
    return classes
}
