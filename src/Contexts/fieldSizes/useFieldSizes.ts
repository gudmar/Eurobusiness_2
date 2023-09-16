import React, { createContext, useContext, useEffect, useState } from "react"
import { getInitialState } from "./reducer";
import { tUseRefOnDiv } from "./types";



const useFieldSizeUpdater = () => {
    return {
        updateFieldSize: (name: string, reference: tUseRefOnDiv): void => {},
        ...getInitialState(),
    }
}

const FieldSizeContext = createContext(getInitialState());

export const FieldSizeContextProvider = ({children}: {children: React.ReactNode}) => {
    // const {...fields, updateFieldSize} = useFieldSizeUpdater();
    const updaterValues = useFieldSizeUpdater();
    return(
        <FieldSizeContext.Provider value={updaterValues}>
                {children}
        </FieldSizeContext.Provider>
    )

}

export const useFieldSize = () => {
    const themesAPI = useContext(FieldSizeContext);
    if (!FieldSizeContext) throw new Error('useFieldSize should be used within FieldSizeContextProvider');
    return {...themesAPI}
}
