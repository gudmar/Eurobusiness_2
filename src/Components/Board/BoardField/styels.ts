import { createUseStyles } from "react-jss";
import { transform } from "typescript";
import { CustomTheme } from "../../../Types/themes";
import { BOTTOM, LEFT, RIGHT, TOP } from "../types";

export const useStyles = createUseStyles({
    singleWidth: {
        flexGrow: '1',
        flexShrink: '1',
        flexBasis: '0',
        overflow: 'auto',
    },
    doubleWidth: {
        flexGrow: '2',
        flexShrink: '2',
        flexBasis: '0',
    },
    empty: { gridArea: 'empty'},
    title: { gridArea: 'titleBar' },
    price: { gridArea: 'price' },
    titleUpsideDown: { gridArea: 'titleUpsideDown', transform: 'rotate(-180deg' },
    priceUpsideDown: { gridArea: 'priceUpsideDown', transform: 'rotate(-180deg' },
    colorBar: {
        backgroundColor: 'gray',
        borderBottom: 'solid black medium',
        gridArea: 'colorBar',
    },
    fieldNumber: {
        gridArea: 'fieldNumber'
    },
    font: (theme: CustomTheme) => ({
        fontWeight: theme.boardFieldFontWeight,
        font: theme.boardFieldFont,
        alignText: 'center'
    }),

    enterpriseFieldWrapper: {
        display: "grid",
        position: 'relative',
        gridTemplate: `
            "titleBar" 2fr
            "price" 1fr
            "icon" 3fr
            "priceUpsideDown" 1fr
            "titleUpsideDown" 2fr
            "fieldNumber" 1fr
        `,
        border: 'solid medium black',
        margin: '0',
        padding: '0'
    },
    icon: {
        gridArea: 'icon',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        '& svg': {
            height: '100%',
            marginTop: 0,
            marginBottom: 0,
            // width: '100%'
        }
    },
    colorBarRight: {
        gridArea: 'colorBar',
        height: '100%'
    },
    colorBarLeft: {
        gridArea: 'colorBar',
        height: '100%'
    },
    colorBarTop: {
        gridArea: 'colorBar',
    },
    colorBarBottom: {
        gridArea: 'colorBar',
    },
    titleRight: {
        writingMode: 'vertical-lr',
        textAlign: 'center',
        gridArea: 'titleBar',
        transform: 'rotate(180deg)'
    },
    titleLeft: {
        gridArea: 'titleBar',
        writingMode: 'vertical-rl',
        textAlign: 'center'

    },
    titleBottom: {
        gridArea: 'titleBar',
        textAlign: 'center'
    },
    titleTop: {
        gridArea: 'titleBar',
        textAlign: 'center',
        transform: 'rotate(180deg)'
    },
    priceRight: {
        writingMode: 'vertical-lr',
        textAlign: 'center',
        gridArea: 'price',
        transform: 'rotate(180deg)'
    },
    priceLeft: {
        gridArea: 'price',
        writingMode: 'vertical-rl',
        textAlign: 'center',
    },
    priceTop: {
        gridArea: 'price',
        textAlign: 'center',
        transform: 'rotate(180deg)'
    },
    priceBottom: {
        gridArea: 'price',
        textAlign: 'center',
    },
    priceUpsideDownRight: {
        greidArea: 'priceUpsideDown',
        writingMode: 'vertical-lr',
        textAlign: 'center'
    },
    priceUpsideDownLeft: {
        gridArea: 'priceUpsideDown',
        writingMode: 'vertical-rl',
        textAlign: 'center',
        transform: 'rotate(180deg)'

    },
    priceUpsideDownTop: {
        gridArea: 'priceUpsideDown',
        textAlign: 'center',
    },
    priceUpsideDownBottom: {
        gridArea: 'priceUpsideDown',
        textAlign: 'center',
        transform: 'rotate(180deg)'
    },
    emptyLeft: {
        gridArea: 'empty',
        writingMode: 'vertical-rl',
        textAlign: 'center'

    },
    emptyRight: {
        gridArea: 'empty',
        writingMode: 'vertical-lr',
        textAlign: 'center'
    },
    emptyTop: {
        gridArea: 'empty',
    },
    emptyBottom: {
        gridArea: 'empty',
    },
    titleUpsideDownLeft: {
        gridArea: 'titleUpsideDown',
        writingMode: 'vertical-rl',
        textAlign: 'center',
        transform: 'rotate(180deg)'
    },
    titleUpsideDownRight: {
        gridArea: 'titleUpsideDown',
        writingMode: 'vertical-lr',
        textAlign: 'center'
    },
    titleUpsideDownTop: {
        gridArea: 'titleUpsideDown',
        textAlign: 'center'
    },
    titleUpsideDownBottom: {
        gridArea: 'titleUpsideDown',
        textAlign: 'center'
    },
    fieldNumberLeft: {
        gridArea: 'fieldNumber',
        writingMode: 'vertical-rl',
        textAlign: 'center'
    },
    fieldNumberRight: {
        gridArea: 'fieldNumber',
        writingMode: 'vertical-lr',
        textAlign: 'center'
    },
    fieldNumberTop: {
        gridArea: 'fieldNumber',
        textAlign: 'center'
    },
    fieldNumberBottom: {
        gridArea: 'fieldNumber',
        textAlign: 'center'
    },
    cityFieldWrapperRight: {
        gridTemplateColumns: '2fr 1fr 1fr 3fr 1fr 1fr 1fr',
        gridTemplate: `
            "colorBar titleBar price empty priceUpsideDown titleUpsideDown fieldNumber" 1fr
        `,
        borderTop: 'solid medium black',
    },
    cityFieldWrapperLeft: {
        borderTop: 'solid medium black',
        gridTemplateColumns: '1fr 1fr 1fr 3fr 1fr 1fr 2fr',
        gridTemplate: `
            "fieldNumber titleUpsideDown priceUpsideDown empty price titleBar colorBar" 1fr
        `,
    },
    fieldWrapper: (theme) => ({
        display: "grid",
        borderLeft: 'none',
        margin: '0',
        padding: '0',
        backgroundColor: theme.boardFieldBackgroundColor,
        font: theme.boardFieldFont,
        fontWeight: theme.boardFieldFontWeight
    }),
    cityFieldWrapperBottom: {
        textAlign: 'center',
        borderRight: 'solid medium black',
        gridTemplate: `
            "colorBar" 2fr
            "titleBar" 1fr
            "price" 1fr
            "empty" 3fr
            "priceUpsideDown" 1fr
            "titleUpsideDown" 1fr
            "fieldNumber" 1fr
        `,
    },
    cityFieldWrapperTop: {
        borderRight: 'solid medium black',
        textAlign: 'center',
        // display: "grid",
        gridTemplate: `
            "fieldNumber" 1fr    
            "titleUpsideDown" 1fr
            "priceUpsideDown" 1fr
            "empty" 3fr
            "price" 1fr
            "titleBar" 1fr
            "colorBar" 2fr
        `,
    },
    enterpriseFieldWrapperTop: {
        borderRight: 'solid medium black',
        textAlign: 'center',
        // display: "grid",
        gridTemplate: `
            "fieldNumber" 1fr    
            "titleUpsideDown" 1fr
            "priceUpsideDown" 1fr
            "icon" 3fr
            "price" 1fr
            "titleBar" 1fr
        `,
    },
    enterpriseFieldWrapperBottom: {
        textAlign: 'center',
        borderRight: 'solid medium black',
        gridTemplate: `
            "titleBar" 1fr
            "price" 1fr
            "icon" 3fr
            "priceUpsideDown" 1fr
            "titleUpsideDown" 1fr
            "fieldNumber" 1fr
        `,
    },
    enterpriseFieldWrapperRight: {
        gridTemplateColumns: '1fr 1fr 3fr 1fr 1fr 1fr',
        gridTemplate: `
            "titleBar price icon priceUpsideDown titleUpsideDown fieldNumber" 1fr
        `,
        borderTop: 'solid medium black',
    },
    enterpriseFieldWrapperLeft: {
        borderTop: 'solid medium black',
        gridTemplateColumns: '1fr 1fr 1fr 3fr 1fr 1fr',
        gridTemplate: `
            "fieldNumber titleUpsideDown priceUpsideDown icon price titleBar" 1fr
        `,
    },
    [RIGHT]:{ transform: 'rotate(-90deg)' },
    [LEFT]:{ transform: 'rotate(90deg)' },
    [TOP]:{ transform: 'rotate(180deg)' },
    [BOTTOM]:{},

    questionMarkWrapperBottom: {
        gridTemplate: `
            "empty" 2fr
            "icon" 5fr
            "fieldNumber" 1fr
        `,
        borderRight: 'solid medium black',
        // border: 'solid medium black',
    },
    questionMarkWrapperTop: {
        gridTemplate: `
            "fieldNumber" 1fr            
            "icon" 5fr
            "empty" 2fr
        `,
        borderRight: 'solid medium black',
        // border: 'solid medium black',
    },
    questionMarkWrapperLeft: {
        borderTop: 'solid medium black',
        gridTemplateColumns: '1fr 6fr 2fr',
        gridTemplate: `
            "fieldNumber icon empty" 1fr
        `,
    },
    questionMarkWrapperRight: {
        borderTop: 'solid medium black',
        gridTemplateColumns: '2fr 6fr 1fr',
        gridTemplate: `
            "empty icon fieldNumber" 1fr
        `,
    }

});
