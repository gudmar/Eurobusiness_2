import { useClasses } from "./styles";
import { iReportData, iReportProps, tReportDataValue } from "./types";

type tReportDocumentList = string[] | number[]

const ReportList = ({items}: {items: tReportDocumentList}) => {
    return (
        <ul>
            {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
    )
}

const ReportValueCell = ({value}: {value: tReportDataValue}) => {
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
    const {data, title, subtitle, ariaLabel} = props;
    const classes = useClasses();
    return (
        <section aria-label={ariaLabel}>
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
            <ReportDocumentGuts data={data}/>
        </section>
    )
}