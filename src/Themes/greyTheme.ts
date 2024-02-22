import { PAWN_DIAMETER } from "../Constants/constants";
import { NamedTheme } from "../Types/themes";

const BORDER_COLOR = 'black'

export const GREY_THEME: NamedTheme = {
    name: 'Rainy day',
    theme: {
        canvasColor: '#aaaaaa',
        penColor: '#222222',
        fontStyles:  `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif`,

        boardMiddleSectionColor: 'yellow',
        boardFieldBackgroundColor: 'white',
        boardFieldFontWeight: 'bold',
        boardFieldFont: 'arial',
        boardBorderColor: BORDER_COLOR,
        boardBorderStyle: `${BORDER_COLOR} solid medium`,

        cityNameFontSize: '0.82rem',
        cityNameFontWeight: 'bold',

        cityPriceFontWeight: 'bold',
        priceFontSize: '0.8rem',
        priceFontWeight: 'bold',

        filedNrFontWeight: 'normal',
        fieldNrFontSize: '0.8rem',
        titleEdgeBoardFieldFontSize: '1rem',
        titleFontSize: '0.82rem',
        titleFontWeight: 'bold',

        pawnSize: `${PAWN_DIAMETER}px`,

        modalTvBackground: 'rgba(60, 60, 60, 0.5)',
        modalWrapperBackground: '#dedede',
        modalWrapperColor: '#323232',

        selectFromList_selectedItemBg: '#55d',
        selectedFromList_selectedItemFg: '#ddd',
        selectFromList_notSelectedItemBg: '#eee',
        selectFromList_notSelectedItemFg: '#222',
        notSelectFromList_hoveredNotSelectedItemBg: '#cbc',
        notSelectFromList_hoveredNotSelectedItemFg: '#222',    

        inputBackgroundColor: '#fff', 
        inputIconColor:       '#333',
        inputForgroundColor: '#222',

        reportBackgroundColor: '#ddd',
        reportForegroundColor: '#444',

        tableStripOddRowBackground:  '#eee',
        tableStripEvenRowBackground: '#ccc',
        tableStripEvenRowFgColor:    '#333',
        tableStripOddRowFgColor:     '#333',

    }
}
