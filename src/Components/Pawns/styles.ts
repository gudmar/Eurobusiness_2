import {createUseStyles} from 'react-jss'
import { useThemesAPI } from '../../Contexts/ThemeContext';
import { CustomTheme } from '../../Types/themes'

export const useStyles = createUseStyles((theme: CustomTheme) => ({
    pawn: {
        width: theme.pawnSize,
        height: theme.pawnSize,
        borderRadius: '50%',
        position: 'absolute',
        border: 'solid thin #aaaaaa',
        boxShadow: 'inset 0px 0px 43px -26px rgba(66, 68, 90, 1)'
    }
})
);

export const useClasses = () => {
    const {theme} = useThemesAPI();
    const classes: {[key:string]: string} = useStyles({theme});
    return classes
}
