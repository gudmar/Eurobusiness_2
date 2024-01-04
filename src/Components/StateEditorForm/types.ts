import { ReactNode } from "react";

export type tStateEditorEntryArgs = {
    children: ReactNode,
    title: string,
    currentValue: string | number | null | undefined
}

export type tStateEditorArgs = {
    children: ReactNode[],
    headline: string,
    logAction?: () => void,
    formName?: string,
}
