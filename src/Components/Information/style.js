import { createUseStyles } from "react-jss";
import { Severity } from "./types";

export const useStyles = createUseStyles((theme) => ({
    informationStack: {
        display: 'flex',
        flexDirection: 'column',
        position: "absolute",
        zIndex: '100',
        width: '100%',
        top: '5%',
        // transform: 'translateY(-50%)',
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
        transform: 'translate(50%, 0%)',
        padding: '1rem',
        marginTop: '1rem'
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
    fadeToBlack: {
        opacity: '100%',
        transition: '0.5s',
    },
    shrink: {
        width: 0,
        transition: '0.5s',
    },
    [Severity.information]: {
        backgroundColor: '#009933',
        color: 'white',
    },
    [Severity.error]: {
        backgroundColor: '#ff3333',
        color: 'white',
    },
    [Severity.warning]: {
        backgroundColor: 'orange',
        color: 'black',
    },
}));
