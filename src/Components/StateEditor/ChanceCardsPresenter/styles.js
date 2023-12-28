import { createUseStyles } from "react-jss";

const CARD_WIDTH = '15rem';
const CARD_HEIGHT ='8rem';
const HALF_WIDTH = '7rem';
const PATH_LEFT = `
polygon(
    0% 0%,
    0% 100%,
    50% 100%,
    50% 95%,
    20% 75%,
    7% 50%,
    20% 25%,
    50% 5%,
    5% 0%
)
`;
const PATH_RIGHT = `
polygon(
    100% 0%,
    100% 100%,
    50% 100%,
    50% 95%,
    80% 75%,
    93% 50%,
    80% 25%,
    50% 5%,
    5% 0%
)
`
export const useStyles = createUseStyles((theme) => ({
    container: {
        // positoin: 'relative',
        display: 'flex',
        overflow: 'auto',
        width: '100%', 
        flexWrap: 'wrap',
        counterReset: 'Cards',
        maxHeight: '100%',
    },
    center: {
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    card: {
        color: '#333333',
        borderRadius: '0.5rem',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        padding: '0.5rem',
        margin: '0.5rem',
        overflow: 'hidden',
        counterIncrement: 'Card',
        position: 'relative',
        '&:before': {
            position: 'absolute',
            color: 'white',
            fontWeight: 'bold',
            content: 'counter(Card)',
            left: '0.7rem'
        }
    },
    'p': {
        textAlign: 'center'
    },
    right: {
        width: HALF_WIDTH,
        height: '9rem',
        // backgroundColor: '#99229988',
        // shapeOutside: PATH_RIGHT,
        clipPath: PATH_RIGHT,
    },
    left: {
        width: HALF_WIDTH,
        height: '9rem',
        // backgroundColor: '#99992288',
        // shapeOutside: PATH_LEFT,
        clipPath: PATH_LEFT,
    },
    oval: {
        borderRadius: '50%',
        backgroundColor: 'white',
        height: `${parseInt(CARD_HEIGHT.split('r')[0] - 1)}rem`,
    },
    redCard: {
        backgroundColor: '#ee3333',
    },
    blueCard: {
        backgroundColor: '#3333ee',
    },
    borrowed: {
        backgroundColor: '#777777',
    }
}));
