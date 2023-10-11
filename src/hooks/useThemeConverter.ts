import { useThemesAPI } from "../Contexts/ThemeContext";

export const useThemeConverter = () => {
    const {theme} = useThemesAPI();
    const result = {
        pawnSize: parseInt(theme?.pawnSize || '')
    }
    return result;
}