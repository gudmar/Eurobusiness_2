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
const HOUSE_NO_ROOF_SIZE = '0.8rem';
const HOUSE_ROOF_SIZE = '1rem';
const HOTEL_SIZE = '1.4rem';

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
    moveUp:{
        transform: 'translateY(-0.2rem)',
        fontWeight: 'bold',
        fontSize: '1.3rem'
    },
    houseNoRoof: {
        // width: HOUSE_NO_ROOF_SIZE,
        width: '100%',
        height: HOUSE_NO_ROOF_SIZE,
        gridArea: 'body',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyItems: 'center',
        justifyContent: 'center'

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
    hotelCeiling:  { gridArea: 'ceiling' , width: '100%', height: '100%'},
    hotelLeftWall: { gridArea: 'leftWall', width: '100%', height: '100%'},
    hotelRightWall: { gridArea: 'rightWall', width: '100%', height: '100%'},
    hotelWindow11: { gridArea: 'window11', width: '100%', height: '100%'},
    hotelWindow12: { gridArea: 'window12', width: '100%', height: '100%'},
    hotelWindow21: { gridArea: 'window21', width: '100%', height: '100%'},
    hotelWindow22: { gridArea: 'window22', width: '100%', height: '100%'},
    hotelFloor1: {gridArea: 'floor1', width: '100%', height: '100%'},
    hotelFloor2: {gridArea: 'floor2', width: '100%', height: '100%'},
    hotelWall: {gridArea: 'wall', width: '100%', height: '100%'},
    ground:    {gridArea: 'ground', width: '100%', height: '100%'},
    hotelLayout: {
        display: 'grid',
        gridTemplateAreas: `
            "ceiling ceiling ceiling ceiling ceiling"
            "leftWall window11 wall window12 rightWall"
            "leftWall floor1   wall floor2   rightWall"
            "leftWall window21 wall window22 rightWall"
            "ground ground ground ground ground"
        `,
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        gridTemplateRows: ' 1fr 1fr 1fr 1fr 1fr',
        width: HOTEL_SIZE,
        height: HOTEL_SIZE,
    },
    playerLayout: {
        display: 'grid',
        gridTemplateAreas: `
            ".    .     ."
            ". head ."
            ". . ."
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