import { useThemesAPI } from "../../Contexts/ThemeContext";
import { useStyles } from "./styles";

export const LoadGameWindow = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);

    return (
        <></>
    )
}