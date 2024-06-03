import { makeStyles } from '../../Functions/makeStyles'

export const useStyles = makeStyles((theme) => {
    return ({
        housing: {
            width: '85%',
            height: '85%',
            border: 'black thin solid',
            borderRadius: '0.25rem',
            position: 'relative',
            backgroundColor: theme.gameControlBackgroundColor,
            color: theme.gameControlForegroundColor,
            opacity: '0.7',
            padding: '0.5rem'
        },
        horizontal: {
            display: 'flex'
        }
    })
})
