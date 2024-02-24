import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { tColors } from "../../Data/types"
import { getPawnLocation } from "./getPawnLocation"
import { iFieldLocationGettersStorageAPI, iPoint, tLocationGetter, tLocationStorage, tNode, tRegisterLocationGetter, tUseFieldLocationGettersStorage } from "./types"

const NOT_VALID_LOCATION = { top: 0, left: 0, width: 0, height: 0}

const useFieldLocationGettersStorage: tUseFieldLocationGettersStorage = () => {
    const locationGettersRef = useRef<tLocationStorage>([]);
    const getLocationGetters = () => locationGettersRef.current;
    const setLocationGetters = (val: tLocationStorage) => locationGettersRef.current = val;
    const notValidGetter: tLocationGetter = () => NOT_VALID_LOCATION
    const getLocationGetter = (index: number):tLocationGetter => {
        const locationGetters = getLocationGetters();
        if (index >= locationGetters.length) {
            console.error(`Attempt to overflow field location index in location getters storage: index ${index} does not exist`)
            return notValidGetter;
        } else if (!locationGetters[index]) {
            console.error(`Attempt to access field location getter that is still not registered in location getters hash table: index ${index}`)
            return notValidGetter;
        } else {
            return locationGetters[index] as unknown as tLocationGetter;
        }
    }
    const registerCurrentReference = <tNode extends HTMLElement>(node: tNode, index: number) => {
        const getter: tLocationGetter = () => {
            const { left, top, width, height } = node.getBoundingClientRect();
            return {left, top, width, height}
        }
        registerLocationGetter(index, getter);
    };

    //WORKS OK
    const registerLocationGetter: tRegisterLocationGetter = (index: number, locationGetter: tLocationGetter) => {
        const locationGetters = getLocationGetters();
        const newLocationGetters = [...locationGetters];
        newLocationGetters[index] = locationGetter;
        setLocationGetters(newLocationGetters);
    }

    const calculatePawnLocation = (index: number, pawnDiameter: number, color: tColors): iPoint => {
        const locationGetter = getLocationGetter(index);
        const {top, left, width, height} = locationGetter();
        const {x, y} = getPawnLocation({top, left, width, height}, pawnDiameter, color);
        return {x, y};
    }
    return { getLocationGetter, calculatePawnLocation, registerCurrentReference }
}


// WORKS OK
export const useSubscribeToFieldLocation = (index: number) => {
    const ref = useRef<tNode>(null);
    const {registerCurrentReference} = useFieldSizeGetters();
    useEffect(() => {
        if (ref && ref.current && registerCurrentReference){
            registerCurrentReference(ref.current, index)
        }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ref.current, index, registerCurrentReference])
    
    return ref;
}

type tCondextType = (null | iFieldLocationGettersStorageAPI)

const FieldLocationGettersContext = createContext<tCondextType>(null);

export const FieldLocationContextProvider = ({children}: {children: React.ReactNode}) => {
    const updaterValues = useFieldLocationGettersStorage();
    return(
        <FieldLocationGettersContext.Provider value={updaterValues}>
                {children}
        </FieldLocationGettersContext.Provider>
    )
}

export function useFieldSizeGetters() {
    const fieldSizes = useContext(FieldLocationGettersContext);
    // throw new Error('FieldLocationCintextProvider should thro')
    if (!FieldLocationGettersContext) throw new Error('useFieldSize should be used within FieldSizeContextProvider');
    return {...fieldSizes}
}
