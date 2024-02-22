export type CustomTheme = {
    canvasColor: string,
    penColor: string,
    fontStyles: string,

    boardMiddleSectionColor: string,
    boardFieldBackgroundColor: string,
    boardFieldFontWeight: string,
    boardFieldFont: string,
    boardBorderColor: string,
    boardBorderStyle: string,

    titleFontSize: string,
    titleFontWeight: string,
    cityNameFontWeight: string,
    cityNameFontSize: string,

    priceFontSize: string,
    priceFontWeight: string,
    cityPriceFontWeight: string,

    fieldNrFontSize: string,
    filedNrFontWeight: string,
    titleEdgeBoardFieldFontSize: string,

    pawnSize: string,

    modalTvBackground: string, // the car is so big you don't see word besides it, like with TV
    modalWrapperBackground: string,
    modalWrapperColor: string,

    selectFromList_selectedItemBg: string,
    selectedFromList_selectedItemFg: string,
    selectFromList_notSelectedItemBg: string,
    selectFromList_notSelectedItemFg: string,
    notSelectFromList_hoveredNotSelectedItemBg: string,
    notSelectFromList_hoveredNotSelectedItemFg: string,

    inputBackgroundColor: string,
    inputIconColor: string,
    inputForgroundColor: string,

    reportBackgroundColor: string,
    reportForegroundColor: string,

    tableStripOddRowBackground: string,
    tableStripEvenRowBackground: string,
    tableStripEvenRowFgColor: string,
    tableStripOddRowFgColor: string,


}

export type NamedTheme = {
    name: string,
    theme: CustomTheme,
}
