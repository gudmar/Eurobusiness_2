import { createUseStyles } from "react-jss";
import { CustomTheme } from "../../../Types/themes";

export const useStyles = createUseStyles({
    cityFieldWrapper: {
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
    }


});
