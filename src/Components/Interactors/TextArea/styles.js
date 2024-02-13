import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    textAreaWrapper: theme => ({
        width: '100%',
        height: '100%',
        padding: '0',
        
    }),
    textInput: {
        margin: '0',
        width: '100%',
        height: '100%',
        resize: 'none',
        border: 'none',
        borderRadius: '0.4rem',
        padding: '0.5rem',
        outline: 'none'
    },
    fieldset: {
        backgroundColor: '#ffffff88',
        width: '100%',
        height: '100%',
        borderRadius: '0.4rem',
        padding: '0',
        backgroundColor: 'white'
    }
})

