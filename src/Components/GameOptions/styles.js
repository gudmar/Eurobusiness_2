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
            border: 'solid thin transparent',
            '&:hover': {
                backgroundColor: '#aaaaaa50',
                border: 'solid thin gray'
            }
        },
        even: {
            backgroundColor: '#cccccc30',
            border: 'solid thin transparent',
            '&:hover': {
                backgroundColor: '#eeeeee30',
                border: 'solid thin gray'
            }
        },
        spacing: {
            margin: '0.25rem 0 0.25rem',

        },
        variantsContainer: {
            '&:nth-child(2n)': {
                backgroundColor: '#cccccc30',
                border: 'solid thin #eeeeee',
            },
            '&:nth-child(2n+1)': {
                backgroundColor: '#88888850',
            },
        },
        title: {
            boxSizing: 'border-box',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            marginBottom: '0.5rem',
            padding: '0.24rem'
        },
        oddElement: {
            backgroundColor: '#eeeeee',
            border: 'solid thin transparent',
            // '&:hover': {
            //     backgroundColor: '#aaaaaa',
            //     border: 'solid thin gray',
            //     cursor: 'pointer'
            // }
        },
        evenElement: {
            backgroundColor: '#aaaaaa',
            border: 'solid thin transparent',
            // '&:hover': {
            //     backgroundColor: '#999999',
            //     border: 'solid thin gray',
            //     cursor: 'pointer'
            // }
        },
        hidden: {
            display: 'none'
        },
        buildingSellOptionSummary: {
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
        },
        centerTable: {
            textAlign: 'center',
        },
        fullWidthTable: {
            width: '100%',
        },
        sellOption: {
            fontStyle: 'italic',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'black',
                color: 'white'
            }
        }
    })
})