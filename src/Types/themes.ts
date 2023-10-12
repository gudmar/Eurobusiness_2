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
}

export type NamedTheme = {
    name: string,
    theme: CustomTheme,
}
