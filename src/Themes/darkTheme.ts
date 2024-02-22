import { PAWN_DIAMETER } from "../Constants/constants";
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

        pawnSize: `${PAWN_DIAMETER}px`,

        modalTvBackground: 'rgba(0, 0, 0, 0.5)',
        modalWrapperBackground: '#101010',
        modalWrapperColor: '#dedede',

        selectFromList_selectedItemBg: '#aaa',
        selectedFromList_selectedItemFg: '#333',
        selectFromList_notSelectedItemBg: '#333',
        selectFromList_notSelectedItemFg: '#aaa',
        notSelectFromList_hoveredNotSelectedItemBg: '#656',
        notSelectFromList_hoveredNotSelectedItemFg: '#ccc',
        
        inputBackgroundColor: '#555', 
        inputIconColor:       '#ddd',
        inputForgroundColor: '#ddd',

        reportBackgroundColor: '#333',
        reportForegroundColor: '#ddd',

        tableStripOddRowBackground:  '#222',
        tableStripEvenRowBackground: '#555',
        tableStripEvenRowFgColor:    '#ddd',
        tableStripOddRowFgColor:     '#ddd',

    }
}
