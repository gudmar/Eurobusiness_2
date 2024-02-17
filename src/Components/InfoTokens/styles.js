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

const CONTAINER_SIZE = '3.4rem';
const FRAME_THICKNTSS = '0.3rem';
const HEAD_SIZE = '0.9rem';

export const useStyles = createUseStyles((theme) => ({
    container: {
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
        borderRadius: '50%',
        '&:hover div': {
            visibility: 'visible'
        },
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center'

    },
    frame: {
        borderStyle: 'solid',
        borderWidth: FRAME_THICKNTSS,
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,        
        borderRadius: '50%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        overflow: 'hidden'

    },
    corps: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
        gridArea: 'corps'
    },
    head: {
        gridArea: 'head',
        width: HEAD_SIZE,
        height: HEAD_SIZE,
        borderRadius: '50%',
    },
    roof: {

    },
    houseNoRoof: {

    },
    hotel: {

    },
    hotelWindow: {

    },
    tooltip: {
        visibility: 'hidden',
        position: 'absolute',
        background: 'yellow',
        padding: '0.2rem',
        transform: 'translateY(2rem)'
    },
    playerLayout: {
        display: 'grid',
        gridTemplateAreas: `
            "blank blank blank"
            "noLeft head noRight"
            "no no no"
            "corps corps corps";
        `,
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 3fr 1fr 6fr',
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
        color: 'transparent',

        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center'

    }
})
);

export const useClasses = () => {
    const {theme} = useThemesAPI();
    const classes = useStyles({theme});
    return classes
}