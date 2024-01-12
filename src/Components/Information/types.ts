export const INFORMATION_MESSAGE = 'display information';
export type tInformationMessage = typeof INFORMATION_MESSAGE;
export enum Severity {
    information = 'information',
    error = 'error',
    warning = 'warning',
}
export interface iInformationData {
    severity: Severity,
    title: string,
    message: string,
}

export interface iInformationArgs {
    title: string,
    message: string,
}

export interface iInformationWithCloseArgs extends iInformationData {close: () => void, id: string}
