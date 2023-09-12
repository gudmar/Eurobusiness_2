import {createUseStyles} from 'react-jss'
import { px2rem } from '../../Functions/px2rem'

const BOARD_HEIGHT_PX = 1000;
const BOARD_HEIGHT = px2rem(BOARD_HEIGHT_PX);
const BORDER_COLOR = 'black';
const BORDER_STYLE = 'solid';
const BORDER_THICKNTSS = px2rem(2);
const BOARD_WIDTH_HEIGHT_FACTOR = 1;
const BOARD_WIDTH = `${px2rem(BOARD_WIDTH_HEIGHT_FACTOR * BOARD_HEIGHT_PX)}`;
const BORDER = `${BORDER_STYLE} ${BORDER_THICKNTSS} ${BORDER_COLOR}`;

export const useStyles = createUseStyles({
    board: {
        position: 'relative',
        border: BORDER,
        width: BOARD_WIDTH,
        height: BOARD_HEIGHT,
        display: 'grid',
        gridTemplate: `
            "f-topLeft f-topLeft f-top f-top f-top f-top f-top f-top f-top f-top f-top f-topRight f-topRight" 1fr
            "f-topLeft f-topLeft f-top f-top f-top f-top f-top f-top f-top f-top f-top f-topRight f-topRight" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-left f-left b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid b-mid f-right f-right" 1fr
            "f-bottomLeft f-bottomLeft f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bottomRight  f-bottomRight  " 1fr
            "f-bottomLeft f-bottomLeft f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bot f-bottomRight  f-bottomRight  " 1fr / 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
        `,
    },
    topLeft: { gridArea: 'f-topLeft' },
    topRight: { gridArea: 'f-topRight' },
    bottomLeft: { gridArea: 'f-bottomLeft' },
    bottomRight: { gridArea: 'f-bottomRight' },        
    
    middleBoard: {
        backgroundColor: (theme) => theme.boardMiddleSectionColor,
        gridArea: 'b-mid',
        border: BORDER,
    }
})

