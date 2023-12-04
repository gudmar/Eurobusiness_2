import { ReactNode } from "react";

export interface iSquareButtonArgs {
    children: ReactNode,
    disabled: boolean,
    onClick: () => void,
    ariaLabel: string,
}
