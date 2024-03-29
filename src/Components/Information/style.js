import { createUseStyles } from "react-jss";
import { ZIndexes } from "../../Constants/styleConstants";
import { Severity } from "./types";

export const useStyles = createUseStyles((theme) => ({
    informationStack: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: "absolute",
        zIndex: ZIndexes.userInformation,
        width: '100%',
        // top: '5%',
        top: '25%'
    },
    title: {
        display: 'inline'
    },
    dialog: {
        borderRadius: '0.7rem',
        position: 'relative',
        border: 'none',
        width: '50%',
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
        opacity: '0',
        transition: '1s',
    },
    shrink: {
        transform: 'scale(0.01)',
        overflow: 'hidden',
        transition: '1s'
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
