export enum Reports {
    Player = 'player',
    Estate = 'estate',
    Bank = 'bank',
    Credits = 'credits',
    None = 'none'
};

export interface iReportProps {
    name: string
}

export type tReportProps = iReportProps | {}
