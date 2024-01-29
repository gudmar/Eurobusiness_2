import { ReactElement, ReactNode } from "react";

export type tStateEditorEntryArgs = {
    children: ReactElement,
    title: string,
    currentValue: string | number | null | undefined
}

export type tStateEditorArgs = {
    children: ReactElement[],
    headline: string,
    logAction?: () => void,
    formName?: string,
}
