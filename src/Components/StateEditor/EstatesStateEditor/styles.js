import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    rows: {
        height: '90%',
    },
    headline: {
        textAlign: 'center',
        marginTop: '0rem',
        marginBottom: '0rem'
    },
    columns: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        padding: '0.5rem',
        height: '100%',
        // maxHeight: '100%',
        marginBottom: '1rem'
    },
    limitWidth: {
        width: '60%',
    },
    scrollContainer: {
        width: '40%',
        maxHeight: '90%',
        overflow: 'auto',
        borderRadius: '0.5rem',
        // margin: '1rem',
    },
    list: {
        background: 'white',
        width: '100%',
        margin: '0rem',
        padding: '1rem',
        
    },
    listItem: {
        padding: '0.4rem',
        margin: '0.1rem',
        width: '90%',
        height: '100%',
    },
    selected: {
        background: '#333388',
        color: 'white',
        transition: '0.2s',
    },
    notSelected: {
        background: 'transparent',
        color: 'black',
        transition: '0.2s',
        '&:hover': {
            cursor: 'pointer',
            background: '#5555AA',
            color: 'white',
            transition: '0.2s',    
        },
        '&:active': {
            background: '#AAAA55',
            color: 'white',
            transition: '0.1s',    
        }
    },
    // listCity: { listStyleType: '\&#127750;' },
    // listRailway: {listStyleType: '\&#128646;'},
    // listPlant: {listStyleType: '\&#x1F3ED;'}
    listCity: { listStyleType:   'none' },
    listRailway: {listStyleType: 'none'},
    listPlant: {listStyleType:   'none'},
    estatesFiltering: {
        display: 'flex',
        justifyContent: 'space-around',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        '& ul': {
            paddingInlineStart: '0px',
            margin:'0.2rem'
        },
        '& fieldset': {
            borderRadius: '0.5rem',
            borderColor: '#eee'
        },
        '& li':{
            listStyleType: 'none',
            display: 'inline-block',
            marginRight: '1rem',
        }
    },
    searchBox: {
        borderRadius: '0.5rem',
        border: 'none',
        lineHeight: '1.8rem',
        fontSize: '1.1rem',
        outline: 'none'
    }
}));
