import React, { createContext, useContext, useEffect, useReducer, useState } from "react"
import { ATENY, CHANCE_BLUE_BOTTOM, CHANCE_BLUE_LEFT, CHANCE_BLUE_RIGHT, CHANCE_RED_BOTTOM, CHANCE_RED_RIGHT, CHANCE_RED_TOP, GUARDED_PARKING, SALONIKI, START } from "../../Data/const";
import { updateAction } from "./actions";
import { getInitialState, reducer } from "./reducer";
import { tUseRefOnDiv } from "./types";



const useFieldSizeUpdater = () => {
    const [state, dispatch] = useReducer(reducer, getInitialState());
    const update = (name: string, reference: tUseRefOnDiv) => {
        dispatch(updateAction(name, reference))
    }

    return {
        updateFieldSize: update,
        state,
    }
}

const FieldSizeContext = createContext({
    updateFieldSize: (name: string, reference: tUseRefOnDiv):void => {},
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
