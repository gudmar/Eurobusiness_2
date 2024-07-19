import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState } from "react"
import { getRemovedKey } from "../../Functions/getRemovedKey";
import { isKeyIncluded } from "../../Functions/isKeyIncluded";
import { useStableUuid } from "../../hooks/useStableUuid";
import { tObject } from "../../Logic/types";

type tCleaningFunction = () => void;

type tCleaniners = tObject<tCleaningFunction> | null;

type tCleaningContext = {
    cleaners: tCleaniners,
    addCleaner: (cleanerName: string, cleaner: tCleaningFunction) => void,
    removeCleaner: (cleanerName: string) => void,
    hasCleaner: (cleanerName: string) => boolean,
} | null;

const CleaningContext = createContext<tCleaningContext>(null)

const CleaningProvider = ({children}: PropsWithChildren) => {
    const [cleaners, setCleaners] = useState<tCleaniners>({})
    const addCleaner = (cleanerName: string, cleaner: tCleaningFunction) => setCleaners(
        (cleaners) => ({...cleaners, [cleanerName]: cleaner })
    )
    const removeCleaner = (cleanerName: string) => {
        if (!cleaners) return;
        const nextCleaners = getRemovedKey(cleaners, cleanerName);
        return nextCleaners;
    }

    const hasCleaner = (cleanerName: string) => {
        if (!cleaners) return false;
        const answer = isKeyIncluded(cleaners, cleanerName);
        return answer;
    }

    return (
        <CleaningContext.Provider value={{ addCleaner, removeCleaner, hasCleaner, cleaners }}>
            {children}
        </CleaningContext.Provider>
    )
}

export const useCleaningContext = () => {
    const context = useContext(CleaningContext);
    if (!context) throw new Error('useCleaningContext has to be used inside CleaningProvider');
    return context;
}

export const useIncludeCleaer = (cleanerName: string, cleaningFunction: tCleaningFunction) => {
    const {addCleaner, removeCleaner} = useCleaningContext();
    useEffect(() => {
        addCleaner(cleanerName, cleaningFunction);
        return () => removeCleaner(cleanerName);
    }, [])
}

export const useImportCleaner = (cleanerName: string) => {
    const {hasCleaner, cleaners} = useCleaningContext();
    const cleaner = hasCleaner(cleanerName) ? cleaners![cleanerName]: () => {}
    return cleaner;
}

export default CleaningProvider;
