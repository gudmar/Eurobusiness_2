import { NamedTheme } from "../Types/themes";

const BORDER_COLOR = 'lightGray'

export const DARK_THEME: NamedTheme = {
    name: 'Black hole',
    theme: {
        canvasColor: '#333333',
        penColor: '#dfdfdf',
        fontStyles:  `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif`,    

        boardMiddleSectionColor: 'orange',
        boardFieldBackgroundColor: '#676767',
        boardFieldFontWeight: 'bold',
        boardFieldFont: 'arial',
        boardBorderColor: BORDER_COLOR,
        boardBorderStyle: `${BORDER_COLOR} solid medium`,


        cityNameFontSize: '1rem',
        cityNameFontWeight: 'bold',

        cityPriceFontWeight: 'bold',
        priceFontWeight: 'bold',
        priceFontSize: 'bold',

        filedNrFontWeight: 'normal',
        fieldNrFontSize: '0.8rem',
        titleEdgeBoardFieldFontSize: '1rem',
        titleFontSize: '0.82rem',
        titleFontWeight: 'bold',

    }
}
