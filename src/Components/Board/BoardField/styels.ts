import { createUseStyles } from "react-jss";
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
    doubleWidthVertical: {
        flexGrow: '2',
        flexShrink: '2',
        flexBasis: '0',
    },
    empty: { gridArea: 'empty'},
    title: { gridArea: 'titleBar' },
    price: { gridArea: 'price' },
    titleUpsideDown: { gridArea: 'titleUpsideDown', transform: 'rotate(-180deg' },
    priceUpsideDown: { gridArea: 'priceUpsideDown', transform: 'rotate(-180deg' },
    colorBar: (theme) => ({
        gridArea: 'colorBar',
        display: 'flex',
    }),
    fieldNumber: (theme) => ({
        gridArea: 'fieldNumber',
        fontSize: theme.fieldNrFontSize,
        fontWeight: theme.filedNrFontWeight,
    }),
    fontCityPrice: (theme: CustomTheme) => ({
        fontSize: theme.boardFieldFont,
        fontWeight: theme.cityPriceFontWeight,
        font: theme.boardFieldFont,
        fontColor: theme.penColor,
    }),
    fontCityName: (theme: CustomTheme) => ({
        fontSize: theme.cityNameFontSize,
        fontWeight: theme.cityNameFontWeight,
        font: theme.boardFieldFont,
        fontColor: theme.penColor,
        alignText: 'center'
    }),
    fontCityNumber: (theme: CustomTheme) => ({
        fontSize: theme.fieldNrFontSize,
        fontWeight: theme.filedNrFontWeight,
        font: theme.boardFieldFont,
        fontCoolor: theme.penColor,
        alignText: 'center',
    }),
    enterpriseFieldWrapper: (theme) => ({
        display: "grid",
        position: 'relative',
        gridTemplate: `
            "titleBar" 2fr
            "price" 1fr
            "icon" 3fr
            "priceUpsideDown" 1fr
            "titleUpsideDown" 2fr
            "fieldNumber" 1fr / 1fr
        `,
        border: theme.boardBorderStyle,
        margin: '0',
        padding: '0',
    }),

    titleBarBottomLeft: (theme) => ({
        gridArea: 'titleBarBottomLeft',
        transform: 'rotateZ(45deg)',
        fontSize: theme.titleEdgeBoardFieldFontSize,
    }),
    titleBarBottomLeftUpside: (theme) => ({
        gridArea: 'titleBarBottomLeftUpside',
        transform: 'rotateZ(225deg)',
        fontSize: theme.titleEdgeBoardFieldFontSize,
    }),
    fieldNumberBottomLeft: (theme) => ({
        gridArea: 'fieldNumberBottomLeft',
        transform: 'rotateZ(45deg)',
        textAlign: 'center',
        transformOrigin: 'center',
        fontSize: theme.fieldNrFontSize,
        fontWeight: theme.filedNrFontWeight,
    }),
    iconBottomLeft: {
        gridArea: 'iconBottomLeft',
        transform: 'rotateZ(45deg)'
    },

    leftTopField: (theme) => ({
        display: "grid",
        position: 'relative',
        gridTemplate: `
            " fieldNumberTopLeft . . . ." 1fr
            ". titleBarTopLeft . . ." 1fr
            ". . iconTopLeft . ." 1fr
            ". . . titleBarTopLeftUpside ." 1fr
            " . . . . ." 1fr/1fr 1fr 1fr 1fr 1fr
        `,
        borderRight: theme.boardBorderStyle,
        margin: '0',
        padding: '0',
        height: '100%'
    }),
    titleBarTopLeft: (theme) => ({
        gridArea: 'titleBarTopLeft',
        transform: 'rotateZ(135deg)',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    titleBarTopLeftUpside: {
        gridArea: 'titleBarTopLeftUpside',
        transform: 'rotateZ(315deg)'
    },
    fieldNumberTopLeft: (theme) => ({
        gridArea: 'fieldNumberTopLeft',
        transform: 'rotateZ(135deg)',
        textAlign: 'center',
        transformOrigin: 'center',
        fontSize: theme.fieldNrFontSize,
        fontWeight: theme.filedNrFontWeight,
    }),
    iconTopLeft: {
        gridArea: 'iconTopLeft',
        transform: 'rotateZ(135deg)'
    },
    rightBottomField: (theme) => ({
        display: "grid",
        position: 'relative',
        gridTemplate: `
            ". . . . . ." 1fr
            ". titleBarBottomRight . . . ." 1fr
            " . . . . . ." 1fr
            " . . . . . ." 1fr
            ". . . . titleBarBottomRightUpside ." 1fr
            ". iconBottomRight iconBottomRight iconBottomRight iconBottomRight fieldNumberBottomRight" 1fr/1fr 1fr 1fr 1fr 1fr 1fr
        `,
        margin: '0',
        padding: '0',
        height: '100%',
        borderTop: theme.boardBorderStyle,
    }),
    titleBarBottomRight: (theme) => ({
        gridArea: 'titleBarBottomRight',
        transform: 'rotateZ(-45deg)',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    titleBarBottomRightUpside: (theme) => ({
        gridArea: 'titleBarBottomRightUpside',
        transform: 'rotateZ(135deg)',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    fieldNumberBottomRight: (theme) => ({
        gridArea: 'fieldNumberBottomRight',
        transform: 'rotateZ(-45deg)',
        textAlign: 'center',
        transformOrigin: 'center',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    iconBottomRight: {
        gridArea: 'iconBottomRight',
        marginLeft: '0',
        marginRight: '0',
        display: 'flex',
        width: '100%',
        '& svg': {
            height: '1.5rem',
            marginRight: '-1rem',
            marginLeft: '-1rem'
        }
    },

    rightTopField: {
        display: "grid",
        position: 'relative',
        gridTemplate: `
            " . . . . fieldNumberTopRight" 1fr
            " . .  titleBarTopRight . .  " 1fr
            " . . iconTopRight . ." 1fr
            " . titleBarTopRightUpside . . . " 1fr
            "  . . . . . " 1fr
        `,
        margin: '0',
        padding: '0'
    },

    titleBarTopRight: (theme) => ({
        gridArea: 'titleBarTopRight',
        transform: 'rotateZ(-315deg)',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    titleBarTopRightUpside: (theme) => ({
        gridArea: 'titleBarTopRightUpside',
        transform: 'rotateZ(-135deg)',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    fieldNumberTopRight: (theme) => ({
        gridArea: 'fieldNumberTopRight',
        transform: 'rotateZ(-135deg)',
        textAlign: 'center',
        transformOrigin: 'center',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    iconTopRight: {
        gridArea: 'iconTopRight',
        marginLeft: '0',
        marginRight: '0',
        display: 'flex',
        width: '100%',
        '& svg': {
            height: '2rem',
            marginRight: '-1rem',
            marginLeft: '-1rem'
        }
    },


    icon: {
        gridArea: 'icon',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        '& svg': {
            // height: '100%',
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            // width: '100%'
        }
    },
    colorBarRight: {
        gridArea: 'colorBar',
        height: '100%',
        flexDirection: 'column'
    },
    colorBarLeft: {
        gridArea: 'colorBar',
        height: '100%',
        flexDirection: 'column'
    },
    colorBarTop: {
        gridArea: 'colorBar',
    },
    colorBarBottom: {
        gridArea: 'colorBar',
    },
    ownerBottom: {
        position: 'absolute',
        top: '-3rem',
        display: 'flex',
    },
    ownerTop: {
        position: 'absolute',
        bottom: '-3rem',
        display: 'flex',
    },
    ownerLeft:{
        position: 'absolute',
        right: '-3rem'
    },
    ownerRight: {
        position: 'absolute',
        left: '-3rem'
    },
    titleRight: (theme) => ({
        writingMode: 'vertical-lr',
        textAlign: 'center',
        gridArea: 'titleBar',
        transform: 'rotate(180deg)',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    titleLeft: (theme) => ({
        gridArea: 'titleBar',
        writingMode: 'vertical-rl',
        textAlign: 'center',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),

    titleBottom: (theme) => ({
        gridArea: 'titleBar',
        textAlign: 'center',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    titleTop: (theme) => ({
        gridArea: 'titleBar',
        textAlign: 'center',
        transform: 'rotate(180deg)',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    priceRight: (theme) => ({
        writingMode: 'vertical-lr',
        textAlign: 'center',
        gridArea: 'price',
        transform: 'rotate(180deg)',
        fontSize: theme.priceFontSize,
        fontWeight: theme.priceFontWeight,
    }),
    priceLeft: (theme) => ({
        gridArea: 'price',
        writingMode: 'vertical-rl',
        textAlign: 'center',
        fontSize: theme.priceFontSize,
        fontWeight: theme.priceFontWeight,
    }),
    priceTop: (theme) => ({
        gridArea: 'price',
        textAlign: 'center',
        transform: 'rotate(180deg)',
        fontSize: theme.priceFontSize,
        fontWeight: theme.priceFontWeight,
    }),
    priceBottom: (theme) => ({
        gridArea: 'price',
        textAlign: 'center',
        fontSize: theme.priceFontSize,
        fontWeight: theme.priceFontWeight,
    }),
    priceUpsideDownRight: (theme) => ({
        greidArea: 'priceUpsideDown',
        writingMode: 'vertical-lr',
        textAlign: 'center',
        fontSize: theme.priceFontSize,
        fontWeight: theme.priceFontWeight,
    }),
    priceUpsideDownLeft: (theme) => ({
        gridArea: 'priceUpsideDown',
        writingMode: 'vertical-rl',
        textAlign: 'center',
        transform: 'rotate(180deg)',
        fontSize: theme.priceFontSize,
        fontWeight: theme.priceFontWeight,
    }),
    priceUpsideDownTop: (theme) => ({
        gridArea: 'priceUpsideDown',
        textAlign: 'center',
        fontSize: theme.priceFontSize,
        fontWeight: theme.priceFontWeight,
    }),
    priceUpsideDownBottom: (theme) => ({
        gridArea: 'priceUpsideDown',
        textAlign: 'center',
        transform: 'rotate(180deg)',
        fontSize: theme.priceFontSize,
        fontWeight: theme.priceFontWeight,
    }),
    emptyLeft: {
        gridArea: 'empty',
        writingMode: 'vertical-rl',
        textAlign: 'center',
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
    titleUpsideDownLeft: (theme) => ({
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
        gridArea: 'titleUpsideDown',
        writingMode: 'vertical-rl',
        textAlign: 'center',
        transform: 'rotate(180deg)',
    }),
    titleUpsideDownRight: (theme) => ({
        gridArea: 'titleUpsideDown',
        writingMode: 'vertical-lr',
        textAlign: 'center',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    titleUpsideDownTop: (theme) => ({
        gridArea: 'titleUpsideDown',
        textAlign: 'center',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    titleUpsideDownBottom: (theme) => ({
        gridArea: 'titleUpsideDown',
        textAlign: 'center',
        fontSize: theme.titleFontSize,
        fontWeight: theme.titleFontWeight,
    }),
    fieldNumberLeft: (theme) => ({
        gridArea: 'fieldNumber',
        writingMode: 'vertical-rl',
        textAlign: 'center',
        fontSize: theme.fieldNrFontSize,
        fontWeight: theme.filedNrFontWeight,
    }),
    fieldNumberRight: (theme) => ({
        gridArea: 'fieldNumber',
        writingMode: 'vertical-lr',
        textAlign: 'center',
        fontSize: theme.fieldNrFontSize,
        fontWeight: theme.filedNrFontWeight,
    }),
    fieldNumberTop: (theme) => ({
        gridArea: 'fieldNumber',
        textAlign: 'center',
        fontSize: theme.fieldNrFontSize,
        fontWeight: theme.filedNrFontWeight,
    }),
    fieldNumberBottom: (theme) => ({
        gridArea: 'fieldNumber',
        textAlign: 'center',
        fontSize: theme.fieldNrFontSize,
        fontWeight: theme.filedNrFontWeight,
    }),
    cityFieldWrapperRight: (theme) => ({
        gridTemplateColumns: '2fr 1fr 1fr 3fr 1fr 1fr 1fr',
        gridTemplate: `
            "colorBar titleBar price empty priceUpsideDown titleUpsideDown fieldNumber" 1fr
        `,
        borderTop: theme.boardBorderStyle,
    }),
    cityFieldWrapperLeft: (theme) => ({
        borderTop: theme.boardBorderStyle,
        gridTemplateColumns: '1fr 1fr 1fr 3fr 1fr 1fr 2fr',
        gridTemplate: `
            "fieldNumber titleUpsideDown priceUpsideDown empty price titleBar colorBar" 1fr
        `,
    }),
    fieldWrapper: (theme) => ({
        display: "grid",
        margin: '0',
        padding: '0',
        backgroundColor: theme.boardFieldBackgroundColor,
        font: theme.boardFieldFont,
        fontWeight: theme.boardFieldFontWeight,
    }),
    cityFieldWrapperBottom: (theme) => ({
        textAlign: 'center',
        borderRight: theme.boardBorderStyle,
        gridTemplate: `
            "colorBar" 2fr
            "titleBar" 1fr
            "price" 1fr
            "empty" 3fr
            "priceUpsideDown" 1fr
            "titleUpsideDown" 1fr
            "fieldNumber" 1fr
        `,
    }),
    cityFieldWrapperTop: (theme) => ({
        borderRight: theme.boardBorderStyle,
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
    }),
    enterpriseFieldWrapperTop: (theme) => ({
        borderRight: theme.boardBorderStyle,
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
    }),
    enterpriseFieldWrapperBottom: (theme) => ({
        textAlign: 'center',
        borderRight: theme.boardBorderStyle,
        gridTemplate: `
            "titleBar" 1fr
            "price" 1fr
            "icon" 3fr
            "priceUpsideDown" 1fr
            "titleUpsideDown" 1fr
            "fieldNumber" 1fr
        `,
    }),
    enterpriseFieldWrapperRight: (theme) => ({
        gridTemplateColumns: '1fr 1fr 3fr 1fr 1fr 1fr',
        gridTemplate: `
            "titleBar price icon priceUpsideDown titleUpsideDown fieldNumber" 1fr
        `,
        borderTop: theme.boardBorderStyle,
    }),
    enterpriseFieldWrapperLeft: (theme) => ({
        borderTop: theme.boardBorderStyle,
        gridTemplateColumns: '1fr 1fr 1fr 3fr 1fr 1fr',
        gridTemplate: `
            "fieldNumber titleUpsideDown priceUpsideDown icon price titleBar" 1fr
        `,
    }),
    [RIGHT]:{ 
        transform: 'rotate(-90deg)',
    },
    [LEFT]:{ transform: 'rotate(90deg)' },
    [TOP]:{ transform: 'rotate(180deg)' },
    [BOTTOM]:{},

    questionMarkWrapperBottom: (theme) => ({
        gridTemplate: `
            "empty" 2fr
            "icon" 5fr
            "fieldNumber" 1fr
        `,
        borderRight: theme.boardBorderStyle,
    }),
    questionMarkWrapperTop: (theme) => ({
        gridTemplate: `
            "fieldNumber" 1fr            
            "icon" 5fr
            "empty" 2fr
        `,
        borderRight: theme.boardBorderStyle,
    }),
    questionMarkWrapperLeft: (theme) => ({
        borderTop: theme.boardBorderStyle,
        gridTemplateColumns: '1fr 6fr 2fr',
        alignContent: 'center',
        overflow: 'hidden',
        gridTemplate: `
            "fieldNumber icon empty" 1fr
        `,
    }),
    questionMarkWrapperRight: (theme) => ({
        borderTop: theme.boardBorderStyle,
        gridTemplateColumns: '1fr 6fr 1fr',
        alignContent: 'center',
        overflow: 'hidden',
        gridTemplate: `
            "empty icon fieldNumber" 1fr
        `,
    }),
    leftBottomField: (theme) => ({
        display: "grid",
        position: 'relative',
        gridTemplate: `
            " . . . . ." 1fr
            ". . . titleBarBottomLeft ." 1fr
            ". . iconBottomLeft . ." 1fr
            ". titleBarBottomLeftUpside . . ." 1fr
            " fieldNumberBottomLeft . . . ." 1fr / 1fr 1fr 1fr 1fr 1fr
        `,
        margin: '0',
        padding: '0',
        borderTop: theme.boardBorderStyle,
        borderRight: theme.boardBorderStyle,
        height: '100%'
    }),
    help: {
        cursor: 'help',
    }

});
