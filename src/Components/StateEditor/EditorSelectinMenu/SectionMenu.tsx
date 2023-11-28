import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { useStyles } from "./styles";

const NavigationSection = ({name, setActive, currentActiveSection}: any) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const isActive = name === currentActiveSection;
    return (
        <span 
            className={`${classes.tab} ${isActive ? classes.frontTab: classes.bluredTab}`}
            
        >
            <div className={`${classes.trapezoid} ${isActive ? classes.activeTab: classes.bluredTab}`} onClick={() => setActive(name)}>
                {name}
            </div>
        </span>
    )
}

export const StateEditorNavigation = ({sections, activeSection, setActiveSection}: any) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);    
    return (
        <div className={classes.navigationWrapper}>
            {sections.map(
                (sectionName:string) => <NavigationSection 
                                name = {sectionName}
                                key = {sectionName}
                                setActive = {(val: string) => setActiveSection(val)}
                                currentActiveSection = {activeSection}
                            />)
            }
        </div>
    )
}
