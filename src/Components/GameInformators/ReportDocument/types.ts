export type tReportDataValue = string | number | boolean | string[] | number []

export interface iReportData {
    propName: string,
    propValue: tReportDataValue,
    ariaLabel: string,
}

export interface iReportProps {
    title: string,
    subtitle: string,
    data: iReportData[],
    ariaLabel: string,
}