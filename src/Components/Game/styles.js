import {createUseStyles} from 'react-jss'

export const useStyles = (theme) => {
    console.log(theme)
    return createUseStyles({
    screen: {
        backgroundColor: theme.mainScreenBackground,
        width: '100vw',
        height: '100vh'
    }
    })({theme})
}
