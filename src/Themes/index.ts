import { NamedTheme } from "../Types/themes";
import { DARK_THEME } from "./darkTheme";
import { GREY_THEME } from "./greyTheme";

const THEMES: NamedTheme[] = [
    DARK_THEME,
    GREY_THEME,
]

export const INITIAL_THEME = GREY_THEME;

export default THEMES;
