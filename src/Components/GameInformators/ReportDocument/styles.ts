import {createUseStyles} from 'react-jss'
import { useThemesAPI } from '../../../Contexts/ThemeContext';
import { CustomTheme } from '../../../Types/themes';

export const useStyles = createUseStyles((theme: CustomTheme) => ({
    overflow: {
        width: '100%',
        overflowY: 'auto',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        tableLayout: 'fixed'
    },
    fullWidth: {
        width: '100%',
    },
    list: {
        listStyle: 'none',
        margin: '0',
        paddingLeft: '0.5rem',
        '&>li': {
            marginBottom: '0.3rem',
            padding: '0'
        }
    },
    tableRow: {
        '&:nth-child(odd)': {
            backgroundColor: theme.tableStripOddRowBackground,
            color: theme.tableStripOddRowFgColor
        },
        '&:nth-child(even)': {
            backgroundColor: theme.tableStripEvenRowBackground,
            color: theme.tableStripEvenRowFgColor
        },
        
    },
    cellRight: {
        textAlign: 'left',
        width: '50%'
    },
    cellLeft: {
        textAlign: 'right',
        fontWeight: 'bold',
    },
    cell: {
        padding: '0.5rem',
        cursor: 'default'
    },
    colorBox: {
        padding: '0.3rem',
        textAlign: 'center',
        borderRadius: '55% 45% 70% 30% / 37% 66% 34% 63% '
    }
})
);

export const useClasses = () => {
    const {theme} = useThemesAPI();
    const classes: {[key:string]: any} = useStyles({theme});
    return classes
}
