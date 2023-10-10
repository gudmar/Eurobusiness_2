import {createUseStyles} from 'react-jss'
import { px2rem } from '../../Functions/px2rem'

const PAWN_SIZE = '2rem'

export const useStyles = createUseStyles({
    pawn: {
        width: PAWN_SIZE,
        height: PAWN_SIZE,
        borderRadius: '50%',
        position: 'absolute',
        border: 'solid thin #aaaaaa',
        boxShadow: 'inset 0px 0px 43px -26px rgba(66, 68, 90, 1)'
    }
})
