import {createUseStyles} from 'react-jss'
import { useThemesAPI } from '../../../Contexts/ThemeContext';
import { CustomTheme } from '../../../Types/themes';

export const useStyles = createUseStyles((theme: CustomTheme) => ({
        container: {
            
        }
    })
);

export const useClasses = () => {
    const {theme} = useThemesAPI();
    const classes: {[key:string]: any} = useStyles({theme});
    return classes
}
