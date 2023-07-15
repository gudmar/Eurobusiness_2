import React, { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider } from "react-jss";
import themes, { INITIAL_THEME } from "../Themes";
import { NamedTheme } from "../Types/themes";


const findTheme = (themes:NamedTheme[], themeName:string):NamedTheme|undefined => themes.find(({ name }:any) => {
    if (name === themeName) return true;
    return false;
})

const initialTheme: NamedTheme = INITIAL_THEME

const throwThemeNotFoundIfNoTheme = (nextTheme: NamedTheme | undefined) => {
    if (!nextTheme) throw new Error('Theme not found')
}

const useThemeFromName = (themes: NamedTheme[], initialName: string) => {
    const [themeName, setThemeName] = useState(initialName);
    const [theme, setTheme]: [NamedTheme, (arg0: NamedTheme)=>void] = useState(initialTheme)
    useEffect(() => {
        const nextTheme = findTheme(themes, themeName);
        throwThemeNotFoundIfNoTheme(nextTheme);
        setTheme(nextTheme as NamedTheme);
    }, [themeName, themes])
    return { theme: theme.theme, setThemeName, themeNames: themes.map(({name}) => name) }
}

const ThemesContext = createContext({
    theme: {},
    setThemeName: (val:any) => {console.error('setThemeName is not overrided')},
    themeNames: themes.map(({name})=>name)
});

export const ThemeContextProvider = ({children}: {children: React.ReactNode}) => {
    const {theme, setThemeName, themeNames} = useThemeFromName(themes, initialTheme.name)
    return(
        <ThemesContext.Provider value={{theme, setThemeName, themeNames}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemesContext.Provider>
    )

}

export const useThemesAPI = () => {
    const themesAPI = useContext(ThemesContext);
    if (!ThemesContext) throw new Error('useThemesAPI should be used within ThemeContextProvider');
    return {...themesAPI}
}
