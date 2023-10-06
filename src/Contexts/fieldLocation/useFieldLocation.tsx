import React, { createContext, useContext, useState } from "react"

interface iLocationData {
    top: number,
    left: number,
    width: number,
    height: number
}

type tLocationGetter = () => iLocationData;

type tOptionalLocationGetter = undefined | tLocationGetter;

type tLocationStorage = tOptionalLocationGetter[]

type tGetLocationGetter = (index:number) => tLocationGetter;

type tRegisterLocationGetter = (index: number, locationGetter: tGetLocationGetter) => void;

interface iFieldLocationGettersStorageAPI {
    getLocationGetter: tGetLocationGetter,
    registerLocationGetter: tRegisterLocationGetter,
}

const NOT_VALID_LOCATION = { top: 0, left: 0, width: 0, height: 0}

const useFieldLocationGettersStorage = ():iFieldLocationGettersStorageAPI => {
    const [locationGetters, setLocationGetters] = useState<tLocationStorage>([])
    const getLocationGetter = (index: number):iLocationData => {
        if (index >= locationGetters.length) {
            console.error(`Attempt to overflow field location index in location getters storage: index ${index} does not exist`)
            return NOT_VALID_LOCATION;
        } else if (!locationGetters[index]) {
            console.error(`Attempt to access field location getter that is still not registered in location getters hash table: index ${index}`)
            return NOT_VALID_LOCATION;
        } else {
            return locationGetters[index] as unknown as iLocationData;
        }
    }
    const registerLocationGetter: tRegisterLocationGetter = (index: number, locationGetter: tGetLocationGetter) => {
        const newLocationGetters = [...locationGetters];
        newLocationGetters[index] = locationGetter;
        setLocationGetters(newLocationGetters);
    }
    return { getLocationGetter, registerLocationGetter }
}

const FieldLocationGettersContext = createContext<null | iFieldLocationGettersStorageAPI>(null);

export const FieldLocationContextProvider = ({children}: {children: React.ReactNode}) => {
    const updaterValues = useFieldLocationGettersStorage();
    return(
        <FieldLocationGettersContext.Provider value={updaterValues}>
                {children}
        </FieldLocationGettersContext.Provider>
    )

}

export const useFieldSize = () => {
    const fieldSizes = useContext(FieldSizeContext);
    if (!FieldSizeContext) throw new Error('useFieldSize should be used within FieldSizeContextProvider');
    return {...fieldSizes}
}
