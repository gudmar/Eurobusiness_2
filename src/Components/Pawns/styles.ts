import {createUseStyles} from 'react-jss'
import { px2rem } from '../../Functions/px2rem'

const PAWN_SIZE = '2rem'

export const useStyles = createUseStyles({
    pawn: {
        width: PAWN_SIZE,
        height: PAWN_SIZE,
        borderRadius: '50%',
    }
})
