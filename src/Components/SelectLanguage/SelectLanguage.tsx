import { useLanguage } from "../../Contexts/CurrentLanguage/CurrentLanguage";
import { SupportedLanguages } from "../../Contexts/CurrentLanguage/types";
import { SingleSelectFromList } from "../Interactors/SingleSelectFromList/SingleSelectFromList";
import { useClasses } from "./styles"

export const SelectLanguage = () => {
    const classes = useClasses();
    const { currentLanguageName, setLanguage, languageKey, supportedLanguageNames, supportedLanguageKeys } = useLanguage();
    return (
        <section className={classes.container}>
            {/* <h5>Select language</h5>
            <span>{languageKey}</span> */}
            <SingleSelectFromList
                items={supportedLanguageNames}
                label={'Select language'}
                defaultValue={currentLanguageName}
                onSelect={(val: string) => setLanguage(val as SupportedLanguages)}
                small
            />
        </section>
    )
}