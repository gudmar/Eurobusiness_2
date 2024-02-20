import { useReport } from "../../../Contexts/GameInformator.ts/GameInformator";
import { useClasses } from "./styles";

export const Report = () => {
    const { Report } = useReport();
    const classes = useClasses();
    return (
        <section className={classes.report} aria-label='Game report'>
            <Report/>
        </section>
    )
}
