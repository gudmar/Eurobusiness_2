import { createUseStyles } from "react-jss";
import { CustomTheme } from "../../../Types/themes";

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
    cityFieldWrapper: {
        textAlign: 'center',
        display: "grid",
        position: 'relative',
        gridTemplate: `
            "colorBar" 2fr
            "titleBar" 2fr
            "price" 1fr
            "empty" 4fr
            "priceUpsideDown" 1fr
            "titleUpsideDown" 2fr
            "fieldNumber" 1fr
        `,
        border: 'solid medium balck',
        margin: '0',
        padding: '0'
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
        border: 'solid medium balck',
        margin: '0',
        padding: '0'
    },
    icon: { gridArea: 'icon' },
    questionMarkWrapper: {
        display: "grid",
        position: 'relative',
        gridTemplate: `
            "empty" 2fr
            "icon" 5fr
            "fieldNumber" 1fr
        `,
        border: 'solid medium balck',
        margin: '0',
        padding: '0'
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
    },
    titleLeft: {
        gridArea: 'titleBar',
        writingMode: 'vertical-rl',
        textAlign: 'center'

    },
    titleBottom: {
        gridArea: 'titleBar',
    },
    titleTop: {
        gridArea: 'titleBar',
    },
    priceRight: {
        writingMode: 'vertical-lr',
        textAlign: 'center',
        gridArea: 'price',
    },
    priceLeft: {
        gridArea: 'price',
        writingMode: 'vertical-rl',
        textAlign: 'center'

    },
    priceTop: {
        gridArea: 'price',
    },
    priceBottom: {
        gridArea: 'price',
    },
    priceUpsideDownRight: {
        greidArea: 'priceUpsideDown',
        writingMode: 'vertical-lr',
        textAlign: 'center'
    },
    priceUpsideDownLeft: {
        gridArea: 'priceUpsideDown',
        writingMode: 'vertical-rl',
        textAlign: 'center'

    },
    priceUpsideDownTop: {
        gridArea: 'priceUpsideDown',
    },
    priceUpsideDownBottom: {
        gridArea: 'priceUpsideDown',
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
        textAlign: 'center'

    },
    titleUpsideDownRight: {
        gridArea: 'titleUpsideDown',
        writingMode: 'vertical-lr',
        textAlign: 'center'
    },
    titleUpsideDownTop: {
        gridArea: 'titleUpsideDown',
    },
    titleUpsideDownBottom: {
        gridArea: 'titleUpsideDown',
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
    },
    fieldNumberBottom: {
        gridArea: 'fieldNumber',
    },
    cityFieldWrapperRight: {
        gridTemplateColumns: '2fr 1fr 1fr 3fr 1fr 1fr 1fr',
        gridTemplate: `
            "colorBar titleBar price empty priceUpsideDown titleUpsideDown fieldNumber" 1fr
        `,
        display: "grid",
        border: 'solid medium balck',
        margin: '0',
        padding: '0',        
    },
    cityFieldWrapperLeft: {
        gridTemplateColumns: '1fr 1fr 1fr 3fr 1fr 1fr 2fr',
        gridTemplate: `
            "fieldNumber titleUpsideDown priceUpsideDown empty price titleBar colorBar" 1fr
        `,
        display: "grid",
        border: 'solid medium balck',
        margin: '0',
        padding: '0',
    },
    cityFieldWrapperBottom: {
        textAlign: 'center',
        display: "grid",
        position: 'relative',
        border: 'solid medium balck',
        margin: '0',
        padding: '0',
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
        textAlign: 'center',
        display: "grid",
        position: 'relative',
        border: 'solid medium balck',
        margin: '0',
        padding: '0',
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
});
