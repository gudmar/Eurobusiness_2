import { makeStyles } from "../../Functions/makeStyles";
import { tClasses } from "../../hooks/useAnimationClasses/types";

export const useStyles = makeStyles(() => {
    return ({
        container: {
            height: '65%',
            overflow: 'hidden',
            display: 'flex'
        },

        verticalContainer: {
            // height: '65%',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'
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
        permits: {
            // display: 'flex',
            flexDirection: 'column',
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
            // display: 'flex',
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
        },
        quotation: {
            cursor: 'pointer',
            padding: '0.3rem',
            border: 'solid thin #00000000'
        },
        quotations: {
            boxSizing: 'border-box'
        },
        odd: {
            backgroundColor: '#88888850',
            '&:hover': {
                backgroundColor: '#aaaaaa50',
                border: 'solid thin gray'
            }
        },
        even: {
            backgroundColor: '#cccccc30',
            '&:hover': {
                backgroundColor: '#eeeeee30',
                border: 'solid thin gray'
            }
        },
        spacing: {
            margin: '0.25rem 0 0.25rem',
        }
    })
})