import {createUseStyles} from 'react-jss'
import { px2rem } from '../../Functions/px2rem'

const BOARD_HEIGHT_PX = 800;
const BOARD_HEIGHT = px2rem(BOARD_HEIGHT_PX);
const BORDER_COLOR = 'black';
const BORDER_STYLE = 'solid';
const BORDER_THICKNTSS = px2rem(2);
const BOARD_WIDTH_HEIGHT_FACTOR = 1.3;
const BOARD_WIDTH = `${px2rem(BOARD_WIDTH_HEIGHT_FACTOR * BOARD_HEIGHT_PX)}`;
const BORDER = `${BORDER_STYLE} ${BORDER_THICKNTSS} ${BORDER_COLOR}`;
const MIDDLE_BOARD_COLOR = 'yellow';

export const useStyles = createUseStyles({
    board: {
        position: 'relative',
        border: BORDER,
        width: BOARD_WIDTH,
        height: BOARD_HEIGHT,
        display: 'grid',
        gridTemplate: `
            "f-top f-top f-top f-top f-top f-top f-top f-top f-top f-top f-top f-right f-right" 1fr
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
    },
    middleBoard: {
        backgroundColor: (theme) => theme.boardMiddleSectionColor,
        gridArea: 'b-mid',
        border: BORDER,
    }
    // screen: theme => ({
    //     backgroundColor:theme.canvasColor,
    //     color: theme.penColor,
    //     fontFamily: theme.fontStyles,
    //     width: '100vw',
    //     height: '100vh'
    // })
})

