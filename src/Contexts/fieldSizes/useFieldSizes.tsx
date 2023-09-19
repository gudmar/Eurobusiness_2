import React, { createContext, useContext, useReducer } from "react"
import { updateAction } from "./actions";
import { getInitialState, reducer } from "./reducer";
import { tFieldSizesUpdatePayload } from "./types";


const useFieldSizeUpdater = () => {
    const [state, dispatch] = useReducer(reducer, getInitialState());
    const update = ({fieldNameForDebugging, reference, fieldIndex}: tFieldSizesUpdatePayload) => {
        dispatch(
            updateAction({
                fieldNameForDebugging,
                reference,
                fieldIndex,
            })
        )
    }

    return {
        updateFieldSize: update,
        state,
    }
}

const FieldSizeContext = createContext({
    updateFieldSize: (arg0: any) => {},
    state: getInitialState()
});

export const FieldSizeContextProvider = ({children}: {children: React.ReactNode}) => {
    const updaterValues = useFieldSizeUpdater();
    return(
        <FieldSizeContext.Provider value={updaterValues}>
                {children}
        </FieldSizeContext.Provider>
    )

}

export const useFieldSize = () => {
    const fieldSizes = useContext(FieldSizeContext);
    if (!FieldSizeContext) throw new Error('useFieldSize should be used within FieldSizeContextProvider');
    return {...fieldSizes}
}
