export type CustomTheme = {
    canvasColor: string,
    penColor: string,
    fontStyles: string,

    boardMiddleSectionColor: string,
    boardFieldBackgroundColor: string,
    boardFieldFontWeight: string,
    boardFieldFont: string,
}

export type NamedTheme = {
    name: string,
    theme: CustomTheme,
}
