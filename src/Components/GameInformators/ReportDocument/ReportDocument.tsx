import { useClasses } from "./styles";
import { iReportData, iReportProps, tReportDataInput_color, tReportDataValue } from "./types";

type tReportDocumentList = string[] | number[]

const ReportList = ({items}: {items: tReportDocumentList}) => {
    return (
        <ul>
            {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
    )
}

const ReportColor = ({color, contrastColor}: tReportDataInput_color) => {
    const classes = useClasses();
    return (
        <div className={classes.colorBox} style={{backgroundColor: color}}>
            <span style={{color: contrastColor}}>Color</span>
        </div>
    )
}

const ReportValueCell = ({value}: {value: tReportDataValue}) => {
    if (typeof value === 'object' && 'color' in value) {
        return (
            <ReportColor color={value.color} contrastColor={value.contrastColor} aria-role="none"/>
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
    const {data} = props;
    return(
        <table>
            <tbody>
                {
                    data.map(({propName, propValue, ariaLabel}) => {
                        return (
                            <tr aria-label={ariaLabel}>
                                <td>{propName}</td>
                                <td>
                                    <ReportValueCell value={propValue} />
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export const ReportDocument = (props: iReportProps) => {
    const {data, title, subtitle, ariaLabel } = props;
    const classes = useClasses();
    return (
        <section aria-label={ariaLabel}>
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
            <ReportDocumentGuts data={data}/>
        </section>
    )
}