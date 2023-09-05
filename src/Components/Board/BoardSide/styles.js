import { createUseStyles } from "react-jss";

const BORDER_THICKNESS = 'thin';
const BORDER_COLOR = 'black';
const BORDER_STYLE = 'solid';
const BORDER = `${BORDER_THICKNESS} ${BORDER_COLOR} ${BORDER_STYLE}`;

export const useStyles = createUseStyles({
    fieldBar: {
        position: 'relative',
        // display: 'grid',
        display: 'flex'
    },
    fieldBarBottom: {
        gridArea: 'f-bot',
        // gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr',
        borderLeft: "none",
        borderTop: BORDER,
    },
    fieldBarRight: {
        borderBottom: "none",
        gridArea: 'f-right',
        display: 'flex',
        flexDirection: 'column-reverse',
        // transform: 'rotate(-90deg)',
        // gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr',
        gridTemplate: `
                        "1-slot" 2fr 
                        "2-slot" 1fr 
                        "3-slot" 1fr 
                        "4-slot" 1fr
                        "5-slot" 1fr
                        "6-slot" 1fr 
                        "7-slot" 1fr 
                        "8-slot" 1fr 
                        "9-slot" 1fr 
                        "10-slot" 1fr
        `,
    },
    fieldBarLeft: {
        borderTop: 'none',
        bordeRight: BORDER,
        gridArea: 'f-left',
        flexDirection: 'column',
        // transform: 'rotate(90deg)',
        // gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr',
        gridTemplate:`
                         "1-slot" 1fr 
                         "2-slot" 1fr 
                         "3-slot" 1fr 
                         "4-slot" 1fr
                         "5-slot" 1fr
                         "6-slot" 1fr 
                         "7-slot" 1fr 
                         "8-slot" 1fr 
                         "9-slot" 1fr 
                        "10-slot" 2fr / 1fr
                        `
    },
    fieldBarTop: { 
        borderRight: 'none',
        borderBottom: BORDER,
        transform: 'rotate(180deg)',
        gridArea: 'f-top',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    }
})
