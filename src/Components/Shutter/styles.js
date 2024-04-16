import { ZIndexes } from "../../Constants/styleConstants";
import { makeStyles } from "../../Functions/makeStyles";

export const useStyles = makeStyles((theme) => ({
    container: {
        boxSizing: 'border-box',
        position: 'absolute',
        zIndex: ZIndexes.shutter,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff88',
        backdropFilter: 'blur(5px)',
        top: '0px',
        left: '0px',
    },
    message: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}))
