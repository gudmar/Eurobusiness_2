import {createUseStyles} from 'react-jss'
import { px2rem } from '../../Functions/px2rem'

const BORDER_HEIGHT = px2rem(800);
const BORDER_COLOR = 'black';
const BORDER_STYLE = 'solid';
const BORDER_THICKNTSS = px2rem(2);
const BORDER_WIDTH_HEIGHT_FACTOR = 1.3;
const BORDER_WIDTH = BORDER_WIDTH_HEIGHT_FACTOR * BORDER_HEIGHT;
const BOARD_STYLE = `${BORDER_STYLE} ${BORDER_THICKNTSS} ${BORDER_COLOR}`;
const MIDDLE_BOARD_COLOR = 'yellow';

export const useStyles = createUseStyles({
    board: {
        position: 'relative',
        width: BORDER_HEIGHT * BORDER_WIDTH_HEIGHT_FACTOR,
        height: BORDER_HEIGHT,
        display: 'grid',
        gridTemplate: `
            f-top f-top f-top f-top f-top f-top f-top f-top f-top f-top f-top f-right f-right" 1fr
            "f-top f-top f-top f-top f-top f-top f-top f-top f-top f-top f-top f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bot   f-bot  " 1fr
            "f-left f-left f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bot   f-bot  " 1fr / 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
        `,
        border: BOARD_STYLE,
        
    },
    middleBoard: {
        backgroundColor: MIDDLE_BOARD_COLOR,
        gridArea: 'b-mid',
        border: BOARD_STYLE,
    }
    // screen: theme => ({
    //     backgroundColor:theme.canvasColor,
    //     color: theme.penColor,
    //     fontFamily: theme.fontStyles,
    //     width: '100vw',
    //     height: '100vh'
    // })
})

