import { makeStyles } from "../../Functions/makeStyles";
import { tClasses } from "../../hooks/useAnimationClasses/types";

export const useStyles = makeStyles(() => {
    return ({
        container: {
            height: '65%',
            overflow: 'hidden',
            display: 'flex'
        },
        countriesList: {
            overflow: 'auto',
            boxSizing: 'border-box'
        },
        countryModule: {
            display: 'flex',
            flexDirection: 'column',
            width: '10rem',
        },
        estatesModule: {
            display: 'flex',
            flexDirection: 'column',
            width: '9rem',
            marginLeft: '1rem',
        },
        actions: {
            width: 'calc(100% - 10rem)',
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        reason: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            padding: '1rem',
            fontWeight: 'bold'
            // alignContent: 'center',
            // justifyItems: 'center',
            // justifyContent: 'center',
        }
    })
})