import { useClasses, useStyles } from "./styles";
import { iReportData, iReportProps, tReportDataInput_color, tReportDataValue } from "./types";

type tReportDocumentList = string[] | number[]

const ReportList = ({items}: {items: tReportDocumentList}) => {
    const classes = useClasses();
    return (
        <ul className={classes.list}>
            {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
    )
}

const ReportColor = ({color, contrastColor, text}: tReportDataInput_color) => {
    const classes = useClasses();
    return (
        <div className={classes.colorBox} style={{backgroundColor: color}}>
            <span style={{color: contrastColor}}>{!!text ? text : 'Color'}</span>
        </div>
    )
}

const ReportValueCell = ({value}: {value: tReportDataValue}) => {
    if (typeof value === 'object' && 'color' in value) {
        return (
            <ReportColor color={value.color} contrastColor={value.contrastColor} text={value.text}/>
        )
    }
    if (typeof value === "object") {
        return (
            <ReportList items={value} />
        )
    }
    return <span>{value}</span>
}

const ReportDocumentGuts = (props: {data: iReportData[]}) => {
    const classes = useClasses()
    const {data} = props;
    return(
        <div className={classes.overflow}>
            <table className={classes.table}>
                <tbody>
                    {
                        data.map(({propName, propValue, ariaLabel, ariaRole, visibility}) => {
                            if (visibility === undefined || visibility === true) {
                                return (
                                    <tr className={classes.tableRow} aria-label={ariaLabel} aria-role={ariaRole}>
                                        
                                        <td className={`${classes.cellLeft} ${classes.cell}`}>{propName}</td>
                                        <td className={`${classes.cellRight} ${classes.cell}`}>
                                            <ReportValueCell value={propValue} />
                                        </td>
                                    </tr>
                                )    
                            }
                            return null;
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export const ReportDocument = (props: iReportProps) => {
    const {data, title, subtitle, ariaLabel } = props;
    const classes = useClasses();
    return (
        <section aria-label={ariaLabel} className={classes.fullWidth}>
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
            <ReportDocumentGuts data={data}/>
        </section>
    )
}