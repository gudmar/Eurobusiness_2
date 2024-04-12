import { createUseStyles } from "react-jss";
import { useThemesAPI } from "../Contexts/ThemeContext";
import { tClasses } from "../hooks/useAnimationClasses/types";
import { tObject } from "../Logic/types";

const getUseStyles = (getClassesAsObject: (theme: tObject<string>) => tClasses ) => () => {
    const { theme } = useThemesAPI();
    const classes = createUseStyles(getClassesAsObject(theme))();
    return classes;
}

export const makeStyles = (getClassesAsObject: (theme: tObject<string>) => tClasses) => getUseStyles(getClassesAsObject)

