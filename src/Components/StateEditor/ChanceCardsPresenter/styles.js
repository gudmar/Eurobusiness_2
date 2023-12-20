import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        overflow: 'auto',
        width: '100%', 
        flexWrap: 'wrap',
    },
    center: {
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    card: {
        color: '#333333',
        borderRadius: '0.5rem',
        width: '15rem',
        height: '8rem',
        padding: '0.5rem',
        margin: '0.5rem'
    },
    oval: {
        borderRadius: '50%',
        backgroundColor: 'white',
        // width: '10rem',
        shapeInside: 'ellipse(50% 50%)',
        height: '7rem',
    },
    redCard: {
        backgroundColor: '#ee3333',
    },
    blueCard: {
        backgroundColor: '#3333ee',
    },
    borrowed: {
        backgroundColor: '#777777',
    }
}));
