import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    textAreaWrapper: theme => ({
        width: '100%',
        height: '100%',
    }),
    textInput: {
        width: '100%',
        height: '100%',
        resize: 'none',
        border: 'none',
        borderRadius: '0.4rem',
        padding: '0.5rem'
    },
    fieldset: {
        backgroundColor: '#ffffff88',
        width: '100%',
        height: '100%',
        borderRadius: '0.4rem'
    }
})

