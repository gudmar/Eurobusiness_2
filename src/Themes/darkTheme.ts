import { NamedTheme } from "../Types/themes";

export const DARK_THEME: NamedTheme = {
    name: 'Black hole',
    theme: {
        canvasColor: '#333333',
        penColor: '#dfdfdf',
        fontStyles:  `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif`,    

        boardMiddleSectionColor: 'orange',
        boardFieldBackgroundColor: '#afafaf',
        boardFieldFontWeight: 'bold',
        boardFieldFont: 'arial',

        cityNameFontSize: '1rem',
        cityNameFontWeight: 'bold',

        cityPriceFontWeight: 'bold',
        fieldNrFontSize: '0.8rem'
    }
}
