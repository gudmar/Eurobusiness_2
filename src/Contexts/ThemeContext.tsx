import React, { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider } from "react-jss";

const themes = [
    {
        name: 'Green',
        theme: {
            mainScreenBackground: 'green'
        }
    },
    {
        name: 'Red',
        theme: {
            mainScreenBackground: 'red'
        }
    },
    {
        name: 'Gray',
        theme: {
            mainScreenBackground: 'gray'
        }
    }

]

const findTheme = (themes:any, themeName:any) => themes.find(({ name }:any) => {
    if (name === themeName) return true;
    return false;
})

const initialTheme = findTheme(themes, 'Green')

const useThemeFromName = (themes: any[], initialName: string) => {
    const [themeName, setThemeName] = useState(initialName);
    const [theme, setTheme] = useState(initialTheme)
    useEffect(() => {
        const nextTheme = findTheme(themes, themeName);
        setTheme(nextTheme);
    }, [themeName, themes])
    useEffect(() => console.log(theme), [theme])
    return { theme: theme.theme, setThemeName, themeNames: themes.map(({name}) => name) }
}

const ThemesContext = createContext({
    theme: {},
    setThemeName: (val:any) => {console.error('Initial function not changed')},
    themeNames: themes.map(({name})=>name)
});

export const ThemeContextProvider = ({children}: {children: React.ReactNode}) => {
    const {theme, setThemeName, themeNames} = useThemeFromName(themes, 'Green')
    useEffect(() => console.log(theme), [theme])
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
