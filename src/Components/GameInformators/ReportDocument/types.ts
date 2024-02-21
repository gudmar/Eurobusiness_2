export type tReportDataInput_color = {color: string, contrastColor: string}

export type tReportDataValue = string | number | boolean | string[] | number [] | tReportDataInput_color

export interface iReportData {
    propName: string,
    propValue: tReportDataValue,
    ariaLabel?: string,
    ariaRole?: string,
}

export interface iReportProps {
    title: string,
    subtitle: string,
    data: iReportData[],
    ariaLabel: string,
}