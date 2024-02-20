import React, { createContext, FC, useContext, useState } from "react"
import { EstatesInformator } from "../../Components/GameInformators/EstateInformator/EstateInformator"
import { PlayerInformator } from "../../Components/GameInformators/PlayerInformator/PlayerInformator"
import { iReportProps, Reports, tReportProps } from "./types"

const EmptyReport = (props: unknown) => {
    return (<>No report selected</>)
}
const getDummyReport = (name: string) => (props: unknown) => {
    return (<>{`Report ${name} selected`}</>)
}

const reports = {
    [Reports.None]: EmptyReport,
    [Reports.Credits]: getDummyReport('credits'),
    [Reports.Bank]: getDummyReport('bank'),
    [Reports.Estate]: EstatesInformator,
    [Reports.Player]: PlayerInformator,
}

const getReport = (type: Reports, props: tReportProps) => {
    const reportTemplate = reports[type];
    if ([Reports.Estate, Reports.Player].includes(type)) {
        const Report = () => reportTemplate(props as iReportProps)
        return Report;
    }
    return () => reportTemplate({} as unknown as any);
}

const useGameInformatorLogic = () => {
    const [reportType, setReportType] = useState<Reports>(Reports.None);
    const [reportProps, setReportProps] = useState<tReportProps>({});
    const displayPlayerInfo = (playerName: string) => {
        setReportProps({...reportProps, name: playerName})
        setReportType(Reports.Player)
    }
    const displayEstateInfo = (estateName: string) => {
        setReportProps({...reportProps, name: estateName});
        setReportType(Reports.Estate)
    }
    const displayBankInfo = () => setReportType(Reports.Bank)
    const displayCredits = () => setReportType(Reports.Credits)
    const displayNone = () => setReportType(Reports.None);
    const Report = getReport(reportType, reportProps);
    return {
        Report,
        displayBankInfo,
        displayCredits,
        displayEstateInfo,
        displayNone,
        displayPlayerInfo,
    }
}

export interface Props {
    children: React.ReactNode
}

const initialContext = {
    Report: (props: tReportProps) => <></>,
    displayBankInfo: () => {},
    displayCredits: () => {},
    displayNone: () => {},
    displayEstateInfo: (name: string) => {},
    displayPlayerInfo: (name: string) => {}
}

type tReport = FC; //(props: tReportProps) => FC;

type tGameInformatorContext = {
    Report: tReport,
    displayBankInfo: () => void,
    displayCredits: () => void,
    displayNone: () => void,
    displayEstateInfo: (name: string) => void,
    displayPlayerInfo: (name: string) => void
} | null

const GameInformatorContext = createContext<tGameInformatorContext>(null)

const useGameInformatorContext = () => {
    // const context = useContext()
}

export const useReport = () => {
    const context = useContext(GameInformatorContext);
    if (!context) {
        throw new Error('useReport should be used within GameInformatorContext')
    }
    return context;
}

export const GameInformator = ({children}: Props) => {
    const guts = useGameInformatorLogic();
    return (
        <GameInformatorContext.Provider value={guts}>
            {children}
        </GameInformatorContext.Provider>
    )
}
