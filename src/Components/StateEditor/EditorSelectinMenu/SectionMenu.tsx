import { useEffect, useState } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { useStyles } from "./styles";

const BOARD = 'Board';
const GENERAL = 'General';

const NavigationSection = ({name, setActive, currentActiveSection}: any) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const isActive = name === currentActiveSection;
    return (
        <span 
            className={`${classes.tab} ${isActive ? classes.frontTab: classes.backTab}`}
            
        >
            <div className={`${classes.trapezoid} ${isActive ? classes.activeTab: classes.bluredTab}`} onClick={() => setActive(name)}>
                {name}
            </div>
        </span>
    )
}

export const StateEditorNavigation = ({playersColors}: any) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const sections = [GENERAL, ...playersColors, BOARD]
    const [activeSection, setActiveSection] = useState(sections[0])
    useEffect(() => console.log(activeSection), [activeSection])
    
    return (
        <div className={classes.navigationWrapper}>
            {sections.map(
                (sectionName) => <NavigationSection 
                                name = {sectionName}
                                setActive = {(val: string) => setActiveSection(val)}
                                currentActiveSection = {activeSection}
                            />)
            }
        </div>
    )
}