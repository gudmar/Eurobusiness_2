import {createUseStyles} from 'react-jss'
import { useThemesAPI } from '../../../Contexts/ThemeContext';
import { CustomTheme } from '../../../Types/themes';

export const useStyles = createUseStyles((theme: CustomTheme) => ({
    report: {
        minWidth: '20rem',
        backgroundColor: theme.reportBackgroundColor,
        color: theme.reportForegroundColor,
        display: 'flex',
    }
})
);

export const useClasses = () => {
    const {theme} = useThemesAPI();
    const classes: {[key:string]: any} = useStyles({theme});
    return classes
}
