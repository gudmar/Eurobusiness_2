import { makeStyles } from '../../Functions/makeStyles'

export const useStyles = makeStyles((theme) => {
    return ({
        logo: {
            width: '2.2rem',
            height: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            borderRadius: '50%',
            border: 'thick white solid',
            color: 'white',
            backgroundColor: 'blue',
            cursor: 'help',
        },
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: theme.helpTipBackground,
            color: theme.helpTipForeground,
            width: '95%',
            height: '70%',
            borderRadius: '0.3rem',
            padding: '0.3rem'
        }
    })
})
