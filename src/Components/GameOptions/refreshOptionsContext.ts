import React, { createContext, useContext } from "react";

export const RefreshOptions: React.Context<() => void> = createContext(() => {}) as React.Context<() => void>

export const useRefreshOptions = () => {
    const refreshOptions = useContext(RefreshOptions);
    if (!refreshOptions) throw new Error('Use useRefreshOptions inside its state provider');
    return refreshOptions;
}
