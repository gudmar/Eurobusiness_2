import { createUseStyles } from "react-jss";
import { Severity } from "./types";

export const useStyles = createUseStyles((theme) => ({
    informationStack: {
        display: 'flex',
        flexDirection: 'column',
        position: "absolute",
        zIndex: '10',
        width: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        // height: '100%'
        
    },
    title: {
        display: 'inline'
    },
    dialog: {
        borderRadius: '0.7rem',
        border: 'none',
        left: '50%',
        right: '50%',
        width: '50%',
        transform: 'translate(50%, 50%)',
        padding: '1rem',
        // marginTop: '6rem'
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
        float: 'right',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    closeBar: {
    },
    [Severity.information]: {
        backgroundColor: 'green',
        color: 'white',
    },
    [Severity.error]: {
        backgroundColor: 'red',
        color: 'white',
    },
    [Severity.warning]: {
        backgroundColor: 'orange',
        color: 'black',
    }
}));
