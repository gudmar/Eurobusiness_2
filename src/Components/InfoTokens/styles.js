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

const CONTAINER_SIZE = '2.4rem';
const FRAME_THICKNTSS = '0.3rem';
const HEAD_SIZE = '0.9rem';
const HOUSE_NO_ROOF_SIZE = '0.7rem';
const HOUSE_ROOF_SIZE = '1rem'

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
        borderStyle: 'solid',
        borderWidth: '0px',
        width: 0,
        height: 0,
        borderBottomWidth: HOUSE_NO_ROOF_SIZE,
        borderLeftWidth: HOUSE_ROOF_SIZE,
        borderRightWidth: HOUSE_ROOF_SIZE,
        borderColor: 'transparent',
        gridArea: 'roof'
    },
    houseNoRoof: {
        // width: HOUSE_NO_ROOF_SIZE,
        width: '100%',
        height: HOUSE_NO_ROOF_SIZE,
        gridArea: 'body',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center'

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
    houseLayout: {
        display: 'grid',
        gridTemplateAreas: `
            "roof roof roof"
            "left body right";
        `,
        gridTemplateColumns: '1fr 7fr 1fr',
        gridTemplateRows: '2fr 3fr',
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